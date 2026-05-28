import { initClerk } from './clerk.js';
import { formatCurrency, normalizeStoredOrderAmount } from './currency.js';
import { fetchOrders } from './supabase.js';

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
  try {
    const orders = await fetchOrders();
    if (!orders || orders.length === 0) {
      el.innerHTML = '<div class="empty-orders"><div>🛍️</div><h3>No orders yet</h3><p>Place your first order from the <a href="menu.html" style="color:var(--primary)">menu</a></p></div>';
      return;
    }
    el.innerHTML = orders.map(function(o) {
      var date = new Date(o.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
      var statusClass = 'status-' + (o.status || 'received');
      var itemsHtml = (o.order_items || []).map(function(i) {
        return '<div class="order-item-row"><span>' + (i.emoji || '') + ' ' + i.item_name + ' × ' + i.qty + '</span><span>' + formatCurrency(normalizeStoredOrderAmount(i.price) * i.qty) + '</span></div>';
      }).join('');
      return '<div class="order-card">' +
        '<div class="order-header">' +
        '<div class="order-id"><div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:2px">Order #' + o.id + '</div><strong>' + o.customer_name + '</strong></div>' +
        '<span class="order-status ' + statusClass + '">' + (o.status || 'received') + '</span>' +
        '</div>' +
        '<div class="order-meta"><span>📅 ' + date + '</span><span>📍 ' + o.address + '</span><span>💳 ' + (o.payment_method || '') + '</span></div>' +
        '<div class="order-items-list">' + itemsHtml +
        '<div class="order-total-row"><span>Total</span><span>' + formatCurrency(normalizeStoredOrderAmount(o.total)) + '</span></div>' +
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
