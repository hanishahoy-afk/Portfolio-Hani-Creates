# 🎨 Portfolio - Hani Creates

[![License: MIT](https://img.shields.io/badge/License-MIT-rose.svg)](https://opensource.org/licenses/MIT)
[![Theme: Ultra Dark Studio](https://img.shields.io/badge/Theme-Ultra%20Dark%20Studio-09090C.svg?color=E11D48)](https://github.com)
[![Languages: 6 Global](https://img.shields.io/badge/Languages-EN%20%7C%20UR%20%7C%20AR%20%7C%20TR%20%7C%20ZH%20%7C%20FA-F59E0B.svg)](https://github.com)
[![Stack: HTML5 • CSS3 • JS • PHP • MySQL • Laravel](https://img.shields.io/badge/Stack-HTML5%20%7C%20Tailwind%20%7C%20PHP%20%7C%20MySQL%20%7C%20Laravel-blue.svg)](https://github.com)
[![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-10B981.svg)](https://github.com)

> **Official Portfolio Website of Hani Creates** — Professional Graphic & High-CTR YouTube Thumbnail Designer. Specialized in Psychology-backed YouTube Thumbnails, Commercial Event Posters, Modern Flyers, Islamic Art, Vector Logos, and Photo Retouching.

---

## 🌟 Key Features

### 1. 🌌 Ultra Luxury Dark Studio Theme
- Designed with **Obsidian Deep Black (`#09090C`)**, **Cosmic Carbon (`#131219`)**, and **Electric Crimson (`#E11D48`)** neon atmospheric glows.
- Custom Glassmorphism cards with subtle border illumination on mouse hover.
- 60FPS ambient cosmic star-dust canvas animation running smoothly in the background.

### 2. 🌍 6 Global Languages Support
Instant real-time translation with native RTL (Right-to-Left) and LTR (Left-to-Right) support:
- 🇬🇧 **English (`en` - LTR)**
- 🇵🇰 **اردو (`ur` - RTL)**
- 🇸🇦 **العربية (`ar` - RTL)**
- 🇹🇷 **Türkçe (`tr` - LTR)**
- 🇨🇳 **中文 (`zh` - LTR)**
- 🇮🇷 **فارسی (`fa` - RTL)**

### 3. 🔐 VIP Client Gatekeeper (Auth Portal)
- Immersive security shield modal: Visitors must **Sign In** or **Register** to access the full portfolio.
- **⚡ 1-Click Instant Guest VIP Pass:** Instant evaluation without typing credentials.
- Auto-syncs client name, phone number, and email address directly into the project order portal.
- Active VIP Member status pill with 1-click logout in the navigation bar.

### 4. 🛒 High-Conversion Order Portal
- **Strict Validation:** Form cannot be submitted if Name, WhatsApp Number, Email, or Project Brief are missing. Invalid fields shake (`@keyframes inputShake`) with a neon red outline.
- **🎯 Dynamic Custom Quantity:** Select standard packages (1, 3, 5, 10 designs, VIP retainer) or choose **Custom Quantity** to reveal a dedicated custom number of designs field.
- **⚡ Dynamic Custom Delivery Timeline:** Choose standard timelines (12-24h Express, 2-3 Days, 4-7 Days) or choose **Custom Timeline** to specify exact required days.
- **Guaranteed Dual-Channel Delivery:** 
  1. Automated direct background dispatch to `hanishahoy@gmail.com` via FormSubmit AJAX.
  2. Pre-formatted WhatsApp order receipt deep link (`wa.me/923008661972`).

### 5. 💻 Full-Stack PHP, MySQL & Laravel Suite
Included in the `backend/` directory:
- `backend/database.sql`: Production-grade relational MySQL schema (`users`, `orders`, `sessions`).
- `backend/db.php`: Secure PDO MySQL connection with CORS handling.
- `backend/auth.php`: REST API with `PASSWORD_BCRYPT` password hashing and session tokens.
- `backend/order.php`: Relational order storage & automated HTML email dispatch.
- `backend/laravel/HaniPortfolioController.php`: Ready-to-use Laravel 10/11 Controller.
- Dedicated standalone PHP pages: `index.php`, `login.php`, `signup.php`.

---

## 📂 Project Structure

```text
Portfolio-Hani-Creates/
├── index.html                 # Main Frontend Portfolio (Zero-server double-click support)
├── index.php                  # PHP Server Main Page (Session & Auth Gatekeeper)
├── login.php                  # Standalone PHP VIP Login Page
├── signup.php                 # Standalone PHP VIP Registration Page
├── app.js                     # Core Application Logic, Auth Engine, Order Dispatcher
├── data.js                    # Multi-Language Dictionary & Portfolio Projects Data
├── styles.css                 # Dark Studio CSS, Glassmorphism, Animations, RTL/LTR
├── HOW_TO_USE.md              # Detailed Documentation & Guide (in Urdu)
├── README.md                  # GitHub Presentation & Deployment Guide
├── .gitignore                 # Git ignore rules
│
├── backend/                   # Full-Stack PHP & MySQL Backend
│   ├── database.sql           # MySQL Database Schema
│   ├── db.php                 # PDO Connection File
│   ├── auth.php               # Auth REST API (Login, Register, Logout)
│   ├── order.php              # Order Processing & Mailer API
│   ├── README.md              # Backend Setup Guide
│   └── laravel/
│       └── HaniPortfolioController.php   # Laravel 10/11 Controller
│
└── images/                    # High-Resolution Portfolio Artwork
    ├── profile.jpg            # Hani Creates Official Profile Picture
    ├── thumbnails/            # High-CTR YouTube Thumbnails
    ├── posters/               # Commercial & Event Posters
    ├── flyers/                # Business & Restaurant Flyers
    ├── islamic/               # Islamic Art & Bayan Posters
    ├── logos/                 # Vector Logos & Brand Identity
    └── retouching/            # Photo Retouching & Manipulations
```

---

## 🚀 Deployment Options

### Option 1: GitHub Pages (100% Free & Fast)
1. Push this repository to your GitHub account (e.g. `github.com/<your-username>/Portfolio-Hani-Creates`).
2. Go to **Settings** > **Pages**.
3. Under **Branch**, select `main` (or `master`) and `/ (root)`.
4. Click **Save**. Your website will be live in seconds at:
   `https://<your-username>.github.io/Portfolio-Hani-Creates/`

### Option 2: Netlify / Vercel (1-Click Deployment)
1. Drag and drop the project folder onto [Netlify Drop](https://app.netlify.com/drop) or import via GitHub.
2. Instant global CDN deployment with free SSL certificate.

### Option 3: Apache / cPanel / XAMPP (For PHP & MySQL Features)
1. Import `backend/database.sql` into your MySQL server via phpMyAdmin.
2. Update database credentials in `backend/db.php`.
3. Upload files to `public_html` or XAMPP `htdocs`.
4. Access via `http://localhost/Portfolio-Hani-Creates/` or your custom domain.

---

## 📞 Designer Contact

- **Designer:** Hani Creates
- **WhatsApp:** [+92 300 8661972](https://wa.me/923008661972)
- **Email:** [hanishahoy@gmail.com](mailto:hanishahoy@gmail.com)
- **Turnaround:** 24-Hour Express Turnaround
- **Quality:** 4K Resolution & Vector Source Files (PSD / AI) upon prior request

---

*Crafted with passion for creators, YouTubers, and global brands.*
