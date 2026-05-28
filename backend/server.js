import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { clerkMiddleware, getAuth } from '@clerk/express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Supabase with service key — never exposed to frontend
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:4173',
    'https://quickbite-frontend.onrender.com'
  ]
}));
app.use(express.json());
app.use(clerkMiddleware());

function requireUser(req, res, next) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Sign in required' });
  }
  req.userId = userId;
  next();
}

// ===== HEALTH CHECK =====
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ===== RESTAURANTS =====
app.get('/api/restaurants', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .order('id');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== MENU FOR ONE RESTAURANT =====
app.get('/api/restaurants/:id/menu', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('menu_sections')
      .select('*, menu_items(*)')
      .eq('restaurant_id', req.params.id)
      .order('sort_order');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== ALL MENU ITEMS =====
app.get('/api/menu', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*, menu_sections(name, restaurant_id, restaurants(name, img, delivery_fee, delivery_time, rating))')
      .order('id');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== CREATE ORDER =====
app.post('/api/orders', requireUser, async (req, res) => {
  try {
    const { customer_name, phone, address, payment_method, subtotal, total, items } = req.body;

    if (!customer_name || !address || !items?.length) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        clerk_user_id: req.userId,
        customer_name, phone, address, payment_method,
        subtotal, delivery_fee: 2.99, total, status: 'received'
      })
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = items.map(i => ({
      order_id: order.id,
      item_name: i.name,
      emoji: i.emoji,
      price: i.price,
      qty: i.qty
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
    if (itemsError) throw itemsError;

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== GET ALL ORDERS =====
app.get('/api/orders', requireUser, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('clerk_user_id', req.userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== GET SINGLE ORDER =====
app.get('/api/orders/:id', requireUser, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', req.params.id)
      .eq('clerk_user_id', req.userId)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`QuickBite API running on http://localhost:${PORT}`);
});
