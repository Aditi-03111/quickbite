import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function loadRestaurants() {
  try {
    const { data: restaurantRows, error } = await db
      .from('restaurants').select('*').order('id');
    if (error) throw error;

    const result = [];
    for (const r of restaurantRows) {
      const { data: sections } = await db
        .from('menu_sections')
        .select('*, menu_items(*)')
        .eq('restaurant_id', r.id)
        .order('sort_order');

      result.push({
        id: r.id, name: r.name, img: r.img,
        rating: parseFloat(r.rating),
        time: r.delivery_time, fee: r.delivery_fee,
        tags: r.tags || [], badge: r.badge,
        menu: (sections || []).map(s => ({
          section: s.name,
          items: (s.menu_items || []).map(i => ({
            name: i.name, desc: i.description,
            price: parseFloat(i.price), img: i.img, emoji: i.emoji
          }))
        }))
      });
    }
    return result;
  } catch (err) {
    console.error('Supabase error:', err);
    return [];
  }
}

export async function saveOrder(orderData) {
  try {
    const { data: order, error } = await db.from('orders').insert({
      clerk_user_id: orderData.clerkUserId,
      customer_name: orderData.name, phone: orderData.phone,
      address: orderData.address, payment_method: orderData.payment,
      subtotal: orderData.subtotal, delivery_fee: 2.99,
      total: orderData.total, status: 'received'
    }).select().single();
    if (error) throw error;

    await db.from('order_items').insert(
      orderData.items.map(i => ({
        order_id: order.id, item_name: i.name,
        emoji: i.emoji, price: i.price, qty: i.qty
      }))
    );
    return order;
  } catch (err) {
    console.error('Order save error:', err);
    return null;
  }
}
