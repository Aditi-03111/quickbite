import { db } from './supabase.js';
import { getClerkUserId, initClerk } from './clerk.js';

var toastTimer;

function showToast(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() { t.classList.remove('show'); }, 2500);
}

async function loadOrders() {
  var el = document.getElementById('orders-list');
  var clerkUserId = getClerkUserId();

  if (!clerkUserId) {
    el.innerHTML = '<div class="empty-orders"><div>🔐</div><h3>Sign in to view orders</h3><p>Your orders are saved to your account.</p><button class="btn btn-primary" onclick="clerkSignIn()">Sign in</button></div>';
    return;
  }

  try {
    var { data: orders, error } = await db
      .from('orders')
      .select('*, order_items(*)')
      .eq('clerk_user_id', clerkUserId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (!orders || orders.length === 0) {
      el.innerHTML = '<div class="empty-orders"><div>🛍️</div><h3>No orders yet</h3><p>Place your first order from the <a href="menu.html" style="color:var(--primary)">menu</a></p></div>';
      return;
    }

    el.innerHTML = orders.map(function(o) {
      var date = new Date(o.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
      var statusClass = 'status-' + (o.status || 'received');
      var itemsHtml = (o.order_items || []).map(function(i) {
        return '<div class="order-item-row"><span>' + (i.emoji || '') + ' ' + i.item_name + ' x ' + i.qty + '</span><span>$' + (i.price * i.qty).toFixed(2) + '</span></div>';
      }).join('');
      return '<div class="order-card">' +
        '<div class="order-header">' +
        '<div class="order-id"><div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:2px">Order #' + o.id + '</div><strong>' + o.customer_name + '</strong></div>' +
        '<span class="order-status ' + statusClass + '">' + (o.status || 'received') + '</span>' +
        '</div>' +
        '<div class="order-meta"><span>📅 ' + date + '</span><span>📍 ' + o.address + '</span><span>💳 ' + (o.payment_method || '') + '</span></div>' +
        '<div class="order-items-list">' + itemsHtml +
        '<div class="order-total-row"><span>Total</span><span>$' + parseFloat(o.total).toFixed(2) + '</span></div>' +
        '</div></div>';
    }).join('');
  } catch (err) {
    el.innerHTML = '<div class="empty-orders"><div>⚠️</div><h3>Could not load orders</h3><p>' + err.message + '</p></div>';
    showToast('Could not load orders');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await initClerk();
  await loadOrders();

  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }
});
