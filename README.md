# Punktuate | Reliable Influencer Marketing Agency Website

A premium, luxury-themed marketing agency website for **Punktuate**, specializing in sustainable influencer marketing strategies, creator continuity, and data-driven growth.

---

## 🌟 Overview

Punktuate is an agency that focuses on building repeatable content engines and long-term creator partnerships. The website showcases their philosophy, services, a dedicated journal with deep dives into strategic marketing, and a premium ticketing system for events.

### Core Philosophy:
- **Consistency over Virality:** Moving away from short-term luck-based trends towards long-term sustainable growth.
- **Creator Continuity:** Fostering authentic brand affinity through long-term creator partnerships.
- **Systems, Not Just Creators:** Implementing data-driven frameworks that perform consistently across platforms.

---

## 🚀 Key Features

- **Single-Page Application (SPA) Experience:** Seamless navigation between sections without full page reloads.
- **Luxury UI/UX Design:** A sophisticated color palette of **Deep Blue (#000B3D)** and **Gold (#D4AF37)**, featuring glassmorphism and smooth transitions.
- **Transparent Navbar:** Starts fully transparent, transitions to glassmorphism style on scroll.
- **Slim Luxury Announcement Ticker:** Premium top bar with event announcements.
- **Interactive Journal:** A collection of articles with a premium reading experience.
- **Dynamic Influencer Directory:** Fetches and displays influencer data from the backend API.
- **Event Ticketing System:** Complete ticket selection, customer details, and Razorpay payment integration.
- **Scroll-Reveal Animations:** Elements fade in and slide up as the user scrolls, powered by the `IntersectionObserver` API.
- **Infinite Loop Logo Slider:** A smooth, continuous slider for showcasing partner logos and brands.
- **Responsive Layout:** Fully optimized for mobile, tablet, and desktop viewing.
- **Firebase Integration:** Saves payment transactions to Firestore database.

---

## 🛠️ Tech Stack

### Frontend:
- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript
- **Icons:** [Lucide Icons](https://lucide.dev/), [Font Awesome 6.5.0](https://fontawesome.com/), [Boxicons 2.1.4](https://boxicons.com/)
- **Animations:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) (for celebratory effects)
- **Typography:** [Google Fonts (Inter)](https://fonts.google.com/specimen/Inter)

### Backend:
- Node.js
- Express.js
- **Database:** Firebase Firestore
- **Payment Gateway:** Razorpay
- **Additional:** CORS, dotenv

---

## 📂 Project Structure

```text
├── index.html                      # Main entry point and core website structure
├── index.css                       # Custom global styles and Tailwind overrides
├── index.js                        # Navigation logic, scroll effects, and animations
├── server.js                       # Express backend server with APIs
├── package.json                    # Project dependencies and scripts
├── .env.example                    # Example environment variables
├── vercel.json                     # Vercel deployment configuration
│
├── config/
│   └── firebase.js                 # Firebase Admin SDK initialization
│
├── routes/
│   └── paymentRoutes.js            # Payment API routes (create order, verify payment)
│
├── api/payment/
│   ├── create-order.js             # Create Razorpay order endpoint
│   └── verify-payment.js           # Verify Razorpay payment endpoint
│
├── Influencers/
│   ├── [Influencer Name]/
│   │   ├── [Name].jpeg             # Influencer profile image
│   │   └── [Name].txt              # Influencer bio and details
│   └── ...
│
├── consistency-over-virality.html  # Journal Article: Why consistency beats luck
├── influencer-campaigns-fail.html  # Journal Article: Common pitfalls in marketing
├── systems-not-creators.html       # Journal Article: The importance of frameworks
├── success.html                    # Payment success page
├── failed.html                     # Payment failure page
│
├── generate-influencers-json.js   # Utility script to generate influencers JSON
├── influencers.json                # (Legacy) Static influencer data
│
├── *.png, *.jpg, *.jpeg            # Brand logos, social icons, and photographic assets
└── *.mp4                           # Video showcases and background media
```

---

## 📖 Journal Articles

The website includes a dedicated section for thought leadership:
1. **Virality is Luck. Consistency is Strategy.** - Discusses the pitfalls of chasing trends and the value of repeatable content engines.
2. **Influencer Campaigns Fail** - Analyzing why traditional one-off campaigns often underperform.
3. **Systems, Not Just Creators** - Exploring the need for robust frameworks in influencer marketing.

---

## � Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Environment Variables

#### Local Development
Create a `.env` file in the root directory (use `.env.example` as a template):

```env
PORT=5000
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
FIREBASE_SERVICE_ACCOUNT=your_firebase_service_account_json_string
```

#### Vercel Production
Add these environment variables in your Vercel project dashboard:
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `FIREBASE_SERVICE_ACCOUNT` (JSON string of your Firebase service account key)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Copy `.env.example` to `.env` and fill in your credentials.

### Running the Project

#### Development
```bash
npm start
```
The server will start on http://localhost:5000

---

## 🔌 API Endpoints

### Influencers API
- **GET** `/api/influencers` - Returns list of all influencers from the Influencers directory

### Payment API
- **POST** `/api/payment/create-order` - Creates a new Razorpay order
- **POST** `/api/payment/verify-payment` - Verifies Razorpay payment signature

---

## 📦 Deployment

### Vercel Deployment (Recommended)
The project is fully configured for Vercel deployment with serverless functions!

#### Step-by-Step:
1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel Project Settings → Environment Variables:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `FIREBASE_SERVICE_ACCOUNT` (paste entire Firebase service account JSON as string)
3. **Deploy!** Vercel will automatically detect the configuration.

#### Key Vercel Features:
- Serverless functions for all API endpoints (`/api/influencers`, `/api/payment/*`)
- SPA fallback routing (all routes serve `index.html` for client-side navigation)
- Static asset serving for images, videos, etc.

### Other Platforms
For platforms like Netlify, Heroku, etc.:
- You'll need to run the full Express server (`npm start`)
- Note: Serverless functions won't work natively; you'll need to use the Express server

#### Static Hosting Only:
- Payment and influencer API features will not work
- Use only for frontend preview

---

## 🎨 Design Assets

- **Colors:**
  - Primary Background: `#000B3D` (Deep Blue)
  - Primary Accent: `#D4AF37` (Luxury Gold)
- **Fonts:**
  - Inter (Variable font for headings and body text)
- **Icons:**
  - Used for social links, navigation, and visual accents across the site.

---

## 📝 License

Copyright © 2026 Punktuate - All Rights Reserved.
