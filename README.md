# 🍔 QuickBite — Food Delivery App

A modern food delivery web app built with vanilla HTML/CSS/JS, Vite, Supabase (PostgreSQL), and Clerk authentication.

![QuickBite](https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80&auto=format&fit=crop)

## ✨ Features

- 🍕 Browse restaurants by category (Pizza, Burgers, Sushi, Indian, Mexican, Noodles)
- 🔍 Search dishes and restaurants in real time
- 📋 Full menu page with food photos and prices
- 🛒 Cart with quantity controls and live totals
- 💳 Checkout flow with order summary
- 📦 Orders saved to PostgreSQL via Supabase
- 🗂️ My Orders page — view all past orders
- 🔐 Google authentication via Clerk
- 📱 Fully responsive design

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, JavaScript (ES Modules) |
| Build tool | Vite |
| Database | PostgreSQL via Supabase |
| Auth | Clerk (Google OAuth) |
| Images | Unsplash |

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/quickbite.git
cd quickbite
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key
```

### 4. Set up the database

In your [Supabase SQL Editor](https://supabase.com/dashboard):

1. Run `schema.sql` — creates all tables
2. Run `seed.sql` — populates restaurants and menu items
3. Run `fix_rls.sql` — sets up Row Level Security policies

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
quickbite/
├── index.html          # Home page
├── menu.html           # Full menu page
├── orders.html         # My orders page
├── styles.css          # Global styles
├── menu.css            # Menu page styles
├── app.js              # Core app logic (restaurants, cart, modals)
├── main.js             # Entry point (Supabase + Clerk init)
├── supabase.js         # Supabase client + DB functions
├── clerk.js            # Clerk auth integration
├── menu-page.js        # Menu page logic
├── schema.sql          # Database schema
├── seed.sql            # Seed data
├── fix_rls.sql         # RLS policy fixes
├── vite.config.js      # Vite configuration
├── .env.example        # Environment variable template
└── .gitignore
```

## 🗄️ Database Schema

```
restaurants     → id, name, img, rating, delivery_time, delivery_fee, tags, badge
menu_sections   → id, restaurant_id, name, sort_order
menu_items      → id, section_id, restaurant_id, name, description, price, img, emoji
orders          → id, customer_name, phone, address, payment_method, subtotal, total, status
order_items     → id, order_id, item_name, emoji, price, qty
```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase publishable/anon key |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |

## 📦 Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

## 🙏 Credits

- Food photos by [Unsplash](https://unsplash.com)
- Database by [Supabase](https://supabase.com)
- Auth by [Clerk](https://clerk.com)
- Build tool by [Vite](https://vitejs.dev)
