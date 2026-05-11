/**
 * server.js
 * ─────────────────────────────────────────────────────────────
 * Punktuate backend:
 *  - Static file serving + SPA fallback
 *  - REST CRUD for all content (backed by Firebase Realtime DB)
 *  - Razorpay order creation + signature verification
 * ─────────────────────────────────────────────────────────────
 */

// Load .env for local dev (silently ignored on Vercel — env vars come from dashboard)
try { require('dotenv').config(); } catch (_) {}


const express   = require('express');
const path      = require('path');
const crypto    = require('crypto');
const Razorpay  = require('razorpay');
const admin     = require('firebase-admin');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── Razorpay client ─────────────────────────────────────────── */
const razorpay = new Razorpay({
    key_id:     process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ── Firebase Realtime Database ──────────────────────────────── */
// Uses application default credentials when deployed, or falls
// back to unauthenticated REST if no service-account JSON is set.
let db;
try {
    let credential = admin.credential.applicationDefault();
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        try {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
            credential = admin.credential.cert(serviceAccount);
        } catch (e) {
            console.warn('  ⚠ Failed to parse FIREBASE_SERVICE_ACCOUNT JSON:', e.message);
        }
    }

    if (!admin.apps.length) {
        admin.initializeApp({
            databaseURL: process.env.FIREBASE_DATABASE_URL,
            credential: credential,
        });
    }
    db = admin.database();
    console.log('  ✓ Firebase Admin connected');
} catch (err) {
    console.warn('  ⚠ Firebase Admin unavailable, falling back to REST:', err.message);
    db = null;
}

/* ── Firebase helpers (REST fallback when Admin SDK unavailable) */
const FB_URL = (process.env.FIREBASE_DATABASE_URL || '').replace(/\/$/, '');

async function fbRead(collection) {
    if (db) {
        const snap = await db.ref(collection).once('value');
        const val  = snap.val();
        if (!val) return [];
        // Firebase stores objects keyed by push-ID; convert to array
        return Object.entries(val).map(([key, v]) => ({ _fbKey: key, ...v }));
    }
    // Unauthenticated REST (works when Firebase rules allow read)
    const res  = await fetch(`${FB_URL}/${collection}.json`);
    const val  = await res.json();
    if (!val) return [];
    if (val.error) throw new Error(`Firebase REST error: ${val.error}`);
    return Object.entries(val).map(([key, v]) => ({ _fbKey: key, ...v }));
}

async function fbPush(collection, data) {
    if (db) {
        const ref = await db.ref(collection).push(data);
        return { _fbKey: ref.key, ...data };
    }
    const res  = await fetch(`${FB_URL}/${collection}.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.error) throw new Error(`Firebase REST error: ${json.error}`);
    return { _fbKey: json.name, ...data };
}

async function fbSet(collection, fbKey, data) {
    if (db) {
        await db.ref(`${collection}/${fbKey}`).set(data);
        return data;
    }
    const res = await fetch(`${FB_URL}/${collection}/${fbKey}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.error) throw new Error(`Firebase REST error: ${json.error}`);
    return data;
}

async function fbDelete(collection, fbKey) {
    if (db) {
        await db.ref(`${collection}/${fbKey}`).remove();
        return;
    }
    const res = await fetch(`${FB_URL}/${collection}/${fbKey}.json`, { method: 'DELETE' });
    const json = await res.json();
    if (json && json.error) throw new Error(`Firebase REST error: ${json.error}`);
    return;
}

/* ── Middleware ─────────────────────────────────────────────── */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

// Static files
app.use(express.static(path.join(__dirname)));

/* ── Content CRUD routes ─────────────────────────────────────── */
const COLLECTIONS = ['influencers', 'events', 'founders', 'faces', 'careers', 'announcements', 'journals'];

COLLECTIONS.forEach(name => {

    // GET /api/:collection  — list all
    app.get(`/api/${name}`, async (req, res) => {
        try {
            const items = await fbRead(name);
            res.json(items);
        } catch (err) {
            console.error(`GET /api/${name}:`, err.message);
            res.status(500).json({ error: 'Failed to read data', detail: err.message });
        }
    });

    // POST /api/:collection  — create
    app.post(`/api/${name}`, async (req, res) => {
        try {
            const data    = { id: Date.now().toString(36) + Math.random().toString(36).slice(2), ...req.body };
            const created = await fbPush(name, data);
            res.status(201).json(created);
        } catch (err) {
            console.error(`POST /api/${name}:`, err.message);
            res.status(500).json({ error: 'Failed to save data', detail: err.message });
        }
    });

    // PUT /api/:collection/:id  — update by logical id field
    app.put(`/api/${name}/:id`, async (req, res) => {
        try {
            const items  = await fbRead(name);
            const item   = items.find(i => i.id === req.params.id || i._fbKey === req.params.id);
            if (!item) return res.status(404).json({ error: 'Item not found' });
            const updated = { ...item, ...req.body };
            await fbSet(name, item._fbKey, updated);
            res.json(updated);
        } catch (err) {
            console.error(`PUT /api/${name}/${req.params.id}:`, err.message);
            res.status(500).json({ error: 'Failed to update data', detail: err.message });
        }
    });

    // DELETE /api/:collection/:id
    app.delete(`/api/${name}/:id`, async (req, res) => {
        try {
            const items = await fbRead(name);
            const item  = items.find(i => i.id === req.params.id || i._fbKey === req.params.id);
            if (!item) return res.status(404).json({ error: 'Item not found' });
            await fbDelete(name, item._fbKey);
            res.json({ success: true });
        } catch (err) {
            console.error(`DELETE /api/${name}/${req.params.id}:`, err.message);
            res.status(500).json({ error: 'Failed to delete data', detail: err.message });
        }
    });

    // PUT /api/:collection  — replace entire collection (bulk save from admin)
    app.put(`/api/${name}`, async (req, res) => {
        try {
            const items = Array.isArray(req.body) ? req.body : [];
            // Wipe then repopulate
            if (db) {
                await db.ref(name).set(null);
                for (const item of items) {
                    await db.ref(name).push(item);
                }
            } else {
                await fetch(`${FB_URL}/${name}.json`, { method: 'DELETE' });
                for (const item of items) {
                    await fetch(`${FB_URL}/${name}.json`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(item),
                    });
                }
            }
            res.json({ success: true, count: items.length });
        } catch (err) {
            console.error(`PUT /api/${name} (bulk):`, err.message);
            res.status(500).json({ error: 'Failed to save collection', detail: err.message });
        }
    });
});

/* ── Razorpay: Create Order ──────────────────────────────────── */
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount, currency = 'INR', receipt } = req.body;

        if (!amount || isNaN(amount)) {
            return res.status(400).json({ error: 'amount (paise) is required' });
        }
        if (Number(amount) < 100) {
            return res.status(400).json({ error: 'Minimum amount is 100 paise (₹1)' });
        }

        const order = await razorpay.orders.create({
            amount:   Number(amount),
            currency,
            receipt:  receipt || `rcpt_${Date.now()}`,
        });

        res.json({
            order_id: order.id,
            amount:   order.amount,
            currency: order.currency,
        });
    } catch (err) {
        console.error('Razorpay create-order error:', err);
        if (err.statusCode === 401) {
            return res.status(401).json({ error: 'Razorpay auth failed — check KEY_ID / KEY_SECRET' });
        }
        res.status(500).json({ error: 'Could not create order', detail: err.error?.description || err.message });
    }
});

/* ── Razorpay: Verify Signature ──────────────────────────────── */
app.post('/api/verify-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customerData, ticketInfo } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ error: 'Missing payment fields' });
        }

        const expected = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (expected !== razorpay_signature) {
            return res.status(400).json({ error: 'Signature mismatch — payment not verified' });
        }

        // ✅ Signature valid — persist the booking
        const booking = {
            id:              razorpay_payment_id,
            orderId:         razorpay_order_id,
            paymentId:       razorpay_payment_id,
            customer:        customerData  || {},
            ticket:          ticketInfo    || {},
            status:          'paid',
            verifiedAt:      new Date().toISOString(),
        };

        try {
            await fbPush('bookings', booking);
        } catch (dbErr) {
            console.warn('Could not persist booking to Firebase:', dbErr.message);
        }

        res.json({ success: true, paymentId: razorpay_payment_id });
    } catch (err) {
        console.error('Verify payment error:', err);
        res.status(500).json({ error: 'Verification failed', detail: err.message });
    }
});

/* ── Expose Razorpay Key ID to frontend ──────────────────────── */
app.get('/api/config', (req, res) => {
    res.json({ razorpayKeyId: process.env.RAZORPAY_KEY_ID });
});

// Removed SPA fallback to prevent intercepting static file 404s on Vercel

/* ── Start (local dev only — Vercel uses module.exports) ─────── */
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`\n  ✦ PUNKTUATE server`);
        console.log(`  → http://localhost:${PORT}`);
        console.log(`  → Razorpay: ${process.env.RAZORPAY_KEY_ID}`);
        console.log(`  → Firebase: ${process.env.FIREBASE_DATABASE_URL}\n`);
    });
}

// Export for Vercel serverless
module.exports = app;
