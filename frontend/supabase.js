// All data goes through the Express backend — no Supabase keys in frontend
const API_URL = import.meta.env.VITE_API_URL || '';

async function getAuthHeaders() {
  const token = await window.__clerk?.session?.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export async function loadRestaurants() {
  try {
    const res = await fetch(`${API_URL}/api/restaurants`);
    if (!res.ok) throw new Error('Failed to fetch restaurants');
    const restaurants = await res.json();

    const result = [];
    for (const r of restaurants) {
      const menuRes = await fetch(`${API_URL}/api/restaurants/${r.id}/menu`);
      const sections = menuRes.ok ? await menuRes.json() : [];
      result.push({
        id: r.id,
        name: r.name,
        img: r.img,
        rating: parseFloat(r.rating),
        time: r.delivery_time,
        fee: r.delivery_fee,
        tags: r.tags || [],
        badge: r.badge,
        menu: sections.map(s => ({
          section: s.name,
          items: (s.menu_items || []).map(i => ({
            name: i.name,
            desc: i.description,
            price: parseFloat(i.price),
            img: i.img,
            emoji: i.emoji
          }))
        }))
      });
    }
    return result;
  } catch (err) {
    console.error('API error:', err);
    return [];
  }
}

export async function saveOrder(orderData) {
  try {
    const res = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: await getAuthHeaders(),
      body: JSON.stringify({
        customer_name: orderData.name,
        phone: orderData.phone,
        address: orderData.address,
        payment_method: orderData.payment,
        subtotal: orderData.subtotal,
        total: orderData.total,
        items: orderData.items
      })
    });
    if (!res.ok) throw new Error('Failed to save order');
    return await res.json();
  } catch (err) {
    console.error('Order error:', err);
    return null;
  }
}

export async function fetchOrders() {
  try {
    const res = await fetch(`${API_URL}/api/orders`, {
      headers: await getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch orders');
    return await res.json();
  } catch (err) {
    console.error('Orders error:', err);
    return [];
  }
}
