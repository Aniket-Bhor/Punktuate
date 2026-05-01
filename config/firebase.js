const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

const firebaseDbUrl = 'https://punktuate-default-rtdb.firebaseio.com/';

// Note: For Realtime Database with a public URL (test mode), 
// we can sometimes initialize without a service account if rules allow.
// However, for a secure production integration, a service account is required.
// We will initialize using the URL and look for a service account in env.

try {
    if (!admin.apps.length) {
        const config = {
            databaseURL: firebaseDbUrl
        };

        // If service account JSON string is provided in .env
        if (process.env.FIREBASE_SERVICE_ACCOUNT) {
            try {
                const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
                config.credential = admin.credential.cert(serviceAccount);
            } catch (e) {
                console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT from .env. Falling back to default initialization.');
            }
        }

        admin.initializeApp(config);
        console.log('Firebase Admin SDK initialized with database:', firebaseDbUrl);
    }
} catch (error) {
    console.error('Firebase Initialization Error:', error);
}

const db = admin.database();

module.exports = { admin, db };
