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

function getLocalOrders() {
  try {
    return JSON.parse(localStorage.getItem('quickbite_orders') || '[]');
  } catch (err) {
    return [];
  }
}

async function loadOrders() {
  var el = document.getElementById('orders-list');
  try {
    const apiOrders = await fetchOrders();
    const localOrders = getLocalOrders();
    const apiIds = new Set((apiOrders || []).map(function(o) { return String(o.id); }));
    const orders = (apiOrders || []).concat(localOrders.filter(function(o) {
      return !apiIds.has(String(o.id));
    }));
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
        '</div><button class="order-track-btn" onclick="scrollToTrackOrder()">Track order</button></div>';
    }).join('');
  } catch (err) {
    el.innerHTML = '<div class="empty-orders"><div>⚠️</div><h3>Could not load orders</h3><p>' + err.message + '</p></div>';
    showToast('Could not load orders');
  }
}

function startTrackOrderDemo() {
  var totalSeconds = 15;
  var remaining = totalSeconds;
  var countdownEl = document.getElementById('track-countdown');
  var statusEl = document.getElementById('track-status-text');
  var locationEl = document.getElementById('track-location');
  var steps = Array.from(document.querySelectorAll('[data-track-step]'));
  if (!countdownEl || !statusEl || !locationEl || steps.length === 0) return;

  function setStep(stepIndex, text, location) {
    steps.forEach(function(step, index) {
      step.classList.toggle('active', index === stepIndex);
      step.classList.toggle('delivered', stepIndex === 3 && index === 3);
    });
    statusEl.textContent = text;
    locationEl.textContent = location;
  }

  setStep(0, 'Your rider is picking up the order in Bengaluru.', 'Indiranagar 100 Feet Road');
  countdownEl.textContent = remaining + 's';

  var timer = setInterval(function() {
    remaining -= 1;
    countdownEl.textContent = Math.max(remaining, 0) + 's';

    if (remaining === 10) {
      setStep(1, 'Spice Garden is packing your order now.', 'Spice Garden, Indiranagar');
    }
    if (remaining === 5) {
      setStep(2, 'Your rider is on the way through MG Road.', 'Near Trinity Metro, MG Road');
    }
    if (remaining <= 0) {
      clearInterval(timer);
      countdownEl.textContent = 'Delivered';
      setStep(3, 'Delivered to Koramangala 5th Block. Enjoy your meal!', 'Koramangala 5th Block');
      showToast('Demo order delivered');
    }
  }, 1000);
}

function scrollToTrackOrder() {
  document.getElementById('track-order')?.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', async () => {
  await initClerk();
  await loadOrders();
  startTrackOrderDemo();

  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }
});

window.scrollToTrackOrder = scrollToTrackOrder;
