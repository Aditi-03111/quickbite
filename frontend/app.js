import { DELIVERY_FEE, formatCurrency, formatDeliveryFee, toRupees } from './currency.js';

const categories = [
  { icon: '🍕', name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=80&auto=format&fit=crop' },
  { icon: '🍔', name: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80&auto=format&fit=crop' },
  { icon: '🍣', name: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&q=80&auto=format&fit=crop' },
  { icon: '🌮', name: 'Mexican', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200&q=80&auto=format&fit=crop' },
  { icon: '🍜', name: 'Noodles', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&q=80&auto=format&fit=crop' },
  { icon: '🍛', name: 'Indian', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&q=80&auto=format&fit=crop' },
  { icon: '🥗', name: 'Salads', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80&auto=format&fit=crop' },
  { icon: '🍰', name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&q=80&auto=format&fit=crop' },
  { icon: '🥪', name: 'Sandwiches', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200&q=80&auto=format&fit=crop' },
  { icon: '🍗', name: 'Chicken', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=200&q=80&auto=format&fit=crop' },
  { icon: '🥩', name: 'Steaks', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200&q=80&auto=format&fit=crop' },
  { icon: '🧆', name: 'Vegan', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80&auto=format&fit=crop' },
];

const restaurants = [
  {
    id: 1,
    name: "Mario's Pizzeria",
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80&auto=format&fit=crop',
    rating: 4.8, time: '20-30 min', fee: '₹49',
    tags: ['pizza', 'italian'], badge: 'Popular',
    menu: [
      {
        section: 'Pizzas', items: [
          { emoji: '🍕', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=90&auto=format&fit=crop', name: 'Margherita', desc: 'Tomato, mozzarella, fresh basil', price: 12.99 },
          { emoji: '🍕', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=90&auto=format&fit=crop', name: 'Pepperoni', desc: 'Tomato, mozzarella, pepperoni', price: 14.99 },
          { emoji: '🍕', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=90&auto=format&fit=crop', name: 'BBQ Chicken', desc: 'BBQ sauce, chicken, red onion', price: 15.99 },
          { emoji: '🍕', img: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&q=90&auto=format&fit=crop', name: 'Veggie Supreme', desc: 'Bell peppers, mushrooms, olives', price: 13.99 },
        ]
      },
      {
        section: 'Sides', items: [
          { emoji: '🥖', img: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=600&q=90&auto=format&fit=crop', name: 'Garlic Bread', desc: 'Toasted with herb butter', price: 4.99 },
          { emoji: '🥗', img: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=90&auto=format&fit=crop', name: 'Caesar Salad', desc: 'Romaine, croutons, parmesan', price: 7.99 },
        ]
      },
    ],
  },
  {
    id: 2,
    name: 'Burger Barn',
    img: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80&auto=format&fit=crop',
    rating: 4.6, time: '15-25 min', fee: '₹39',
    tags: ['burgers', 'american'], badge: 'Fast delivery',
    menu: [
      {
        section: 'Burgers', items: [
          { emoji: '🍔', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=90&auto=format&fit=crop', name: 'Classic Smash', desc: 'Double patty, American cheese, pickles', price: 11.99 },
          { emoji: '🍔', img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=90&auto=format&fit=crop', name: 'Bacon Deluxe', desc: 'Crispy bacon, cheddar, caramelized onion', price: 13.99 },
          { emoji: '🍔', img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=90&auto=format&fit=crop', name: 'Mushroom Swiss', desc: 'Sauteed mushrooms, Swiss cheese', price: 12.99 },
          { emoji: '🌱', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=90&auto=format&fit=crop', name: 'Veggie Burger', desc: 'Black bean patty, avocado, sprouts', price: 11.49 },
        ]
      },
      {
        section: 'Sides & Drinks', items: [
          { emoji: '🍟', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=90&auto=format&fit=crop', name: 'Crispy Fries', desc: 'Seasoned with sea salt', price: 3.99 },
          { emoji: '🥤', img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&q=90&auto=format&fit=crop', name: 'Milkshake', desc: 'Vanilla, chocolate, or strawberry', price: 5.99 },
        ]
      },
    ],
  },
  {
    id: 3,
    name: 'Tokyo Sushi Bar',
    img: 'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=600&q=80&auto=format&fit=crop',
    rating: 4.9, time: '25-40 min', fee: '₹69',
    tags: ['sushi', 'japanese'], badge: 'Top rated',
    menu: [
      {
        section: 'Rolls', items: [
          { emoji: '🍣', img: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=600&q=90&auto=format&fit=crop', name: 'California Roll', desc: 'Crab, avocado, cucumber', price: 9.99 },
          { emoji: '🍣', img: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=90&auto=format&fit=crop', name: 'Spicy Tuna Roll', desc: 'Tuna, spicy mayo, cucumber', price: 11.99 },
          { emoji: '🍣', img: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&q=90&auto=format&fit=crop', name: 'Dragon Roll', desc: 'Shrimp tempura, avocado on top', price: 14.99 },
          { emoji: '🍣', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=90&auto=format&fit=crop', name: 'Rainbow Roll', desc: 'Assorted fish, avocado', price: 15.99 },
        ]
      },
      {
        section: 'Extras', items: [
          { emoji: '🍜', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=90&auto=format&fit=crop', name: 'Miso Soup', desc: 'Tofu, seaweed, green onion', price: 3.49 },
          { emoji: '🥟', img: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=90&auto=format&fit=crop', name: 'Gyoza (6 pcs)', desc: 'Pan-fried pork dumplings', price: 7.99 },
        ]
      },
    ],
  },
  {
    id: 4,
    name: 'Spice Garden',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&auto=format&fit=crop',
    rating: 4.7, time: '30-45 min', fee: '₹59',
    tags: ['indian', 'curry'], badge: null,
    menu: [
      {
        section: 'Mains', items: [
          { emoji: '🍛', img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=90&auto=format&fit=crop', name: 'Butter Chicken', desc: 'Creamy tomato sauce, tender chicken', price: 14.99 },
          { emoji: '🍛', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=90&auto=format&fit=crop', name: 'Palak Paneer', desc: 'Spinach curry with cottage cheese', price: 13.49 },
          { emoji: '🍛', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=90&auto=format&fit=crop', name: 'Lamb Rogan Josh', desc: 'Slow-cooked lamb in aromatic spices', price: 16.99 },
          { emoji: '🫓', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=90&auto=format&fit=crop', name: 'Garlic Naan', desc: 'Freshly baked with garlic butter', price: 3.49 },
        ]
      },
      {
        section: 'Rice & Sides', items: [
          { emoji: '🍚', img: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=600&q=90&auto=format&fit=crop', name: 'Basmati Rice', desc: 'Fragrant long-grain rice', price: 2.99 },
          { emoji: '🥣', img: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=90&auto=format&fit=crop', name: 'Raita', desc: 'Yogurt with cucumber and mint', price: 2.49 },
        ]
      },
    ],
  },
  {
    id: 5,
    name: 'Taco Fiesta',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop',
    rating: 4.5, time: '15-25 min', fee: '₹49',
    tags: ['mexican', 'tacos'], badge: 'New',
    menu: [
      {
        section: 'Tacos', items: [
          { emoji: '🌮', img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=90&auto=format&fit=crop', name: 'Carne Asada', desc: 'Grilled beef, salsa, cilantro', price: 3.99 },
          { emoji: '🌮', img: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=600&q=90&auto=format&fit=crop', name: 'Al Pastor', desc: 'Marinated pork, pineapple, onion', price: 3.99 },
          { emoji: '🌮', img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=90&auto=format&fit=crop', name: 'Fish Taco', desc: 'Battered fish, slaw, chipotle mayo', price: 4.49 },
          { emoji: '🌮', img: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=600&q=90&auto=format&fit=crop', name: 'Veggie Taco', desc: 'Roasted veggies, black beans, guac', price: 3.49 },
        ]
      },
      {
        section: 'Extras', items: [
          { emoji: '🥑', img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=90&auto=format&fit=crop', name: 'Guacamole & Chips', desc: 'Fresh avocado, lime, jalapeno', price: 5.99 },
          { emoji: '🫙', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=90&auto=format&fit=crop', name: 'Queso Dip', desc: 'Warm cheese dip with tortilla chips', price: 4.99 },
        ]
      },
    ],
  },
  {
    id: 6,
    name: 'Noodle House',
    img: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80&auto=format&fit=crop',
    rating: 4.6, time: '20-35 min', fee: '₹49',
    tags: ['noodles', 'asian'], badge: null,
    menu: [
      {
        section: 'Noodles', items: [
          { emoji: '🍜', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=90&auto=format&fit=crop', name: 'Tonkotsu Ramen', desc: 'Rich pork broth, chashu, soft egg', price: 13.99 },
          { emoji: '🍜', img: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&q=90&auto=format&fit=crop', name: 'Pad Thai', desc: 'Rice noodles, shrimp, peanuts, lime', price: 12.99 },
          { emoji: '🍜', img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=90&auto=format&fit=crop', name: 'Beef Pho', desc: 'Aromatic broth, rice noodles, herbs', price: 13.49 },
          { emoji: '🍜', img: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&q=90&auto=format&fit=crop', name: 'Dan Dan Noodles', desc: 'Spicy sesame sauce, minced pork', price: 11.99 },
        ]
      },
      {
        section: 'Starters', items: [
          { emoji: '🥟', img: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=90&auto=format&fit=crop', name: 'Spring Rolls (4 pcs)', desc: 'Crispy vegetable spring rolls', price: 5.99 },
          { emoji: '🥣', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=90&auto=format&fit=crop', name: 'Wonton Soup', desc: 'Pork wontons in clear broth', price: 6.49 },
        ]
      },
    ],
  },
];

let cart = [];
let activeCategory = null;
let activeFilter = 'all';

document.addEventListener('DOMContentLoaded', async function() {
  renderCategories();
  renderRestaurants(restaurants);
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }
});

function renderCategories() {
  var grid = document.getElementById('categories-grid');
  if (!grid) return;
  grid.innerHTML = categories.map(function(c) {
    return '<div class="category-card" onclick="selectCategory(\'' + c.name.toLowerCase() + '\', this)" tabindex="0" role="button">' +
      '<div class="category-img-wrapper">' +
      '<img src="' + c.image + '" alt="' + c.name + '" class="category-card-img" />' +
      '</div>' +
      '<div class="category-name">' + c.name + '</div></div>';
  }).join('');
}

function selectCategory(name, el) {
  document.querySelectorAll('.category-card').forEach(function(c) { c.classList.remove('active'); });
  activeCategory = activeCategory === name ? null : name;
  if (activeCategory) el.classList.add('active');
  applyFilters();
  document.getElementById('restaurants').scrollIntoView({ behavior: 'smooth' });
}

function filterRestaurants(filter, el) {
  activeFilter = filter;
  document.querySelectorAll('.filter-tab').forEach(function(t) { t.classList.remove('active'); });
  el.classList.add('active');
  applyFilters();
}

function filterRestaurantsById(filter) {
  activeFilter = filter;
  document.querySelectorAll('.filter-tab').forEach(function(t) {
    t.classList.toggle('active', t.textContent.toLowerCase() === filter);
  });
  applyFilters();
  document.getElementById('restaurants').scrollIntoView({ behavior: 'smooth' });
}

function applyFilters() {
  var filtered = restaurants;
  if (activeFilter !== 'all') filtered = filtered.filter(function(r) { return r.tags.includes(activeFilter); });
  if (activeCategory) filtered = filtered.filter(function(r) {
    return r.tags.some(function(t) { return t.includes(activeCategory); }) || r.name.toLowerCase().includes(activeCategory);
  });
  renderRestaurants(filtered);
}

function handleSearch(query) {
  var q = query.toLowerCase().trim();
  if (!q) { renderRestaurants(restaurants); return; }
  var filtered = restaurants.filter(function(r) {
    return r.name.toLowerCase().includes(q) ||
      r.tags.some(function(t) { return t.includes(q); }) ||
      r.menu.some(function(s) { return s.items.some(function(i) { return i.name.toLowerCase().includes(q); }); });
  });
  renderRestaurants(filtered);
  document.getElementById('restaurants').scrollIntoView({ behavior: 'smooth' });
}

function renderRestaurants(list) {
  var grid = document.getElementById('restaurants-grid');
  if (!grid) return;
  if (list.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:80px 0;color:var(--text-muted)"><div style="font-size:3rem;margin-bottom:14px">🔍</div><p style="font-weight:700">No restaurants found</p></div>';
    return;
  }
  grid.innerHTML = list.map(function(r) {
    return '<div class="restaurant-card" onclick="openRestaurant(' + r.id + ')" tabindex="0" role="button">' +
      '<div class="restaurant-img">' +
      '<img src="' + r.img + '" alt="' + r.name + '" />' +
      (r.badge ? '<span class="restaurant-badge">' + r.badge + '</span>' : '') +
      '<button class="restaurant-fav" onclick="event.stopPropagation();toggleFav(this)">🤍</button>' +
      '</div>' +
      '<div class="restaurant-info">' +
      '<div class="restaurant-name">' + r.name + '</div>' +
      '<div class="restaurant-meta"><span>⭐ ' + r.rating + '</span><span>🕐 ' + r.time + '</span><span>🚴 ' + formatDeliveryFee(r.fee) + ' delivery</span></div>' +
      '<div class="restaurant-tags">' + r.tags.map(function(t) { return '<span class="tag">' + t + '</span>'; }).join('') + '</div>' +
      '</div></div>';
  }).join('');
}

function toggleFav(btn) {
  btn.textContent = btn.textContent === '🤍' ? '❤️' : '🤍';
}

function openRestaurant(id) {
  var r = null;
  for (var i = 0; i < restaurants.length; i++) {
    if (restaurants[i].id === id) { r = restaurants[i]; break; }
  }
  if (!r) return;

  var html = '<div class="rm-hero">' +
    '<img src="' + r.img + '" alt="' + r.name + '" />' +
    '<div class="rm-hero-overlay"></div>' +
    '<div class="rm-hero-info"><h2>' + r.name + '</h2>' +
    '<div class="rm-meta"><span>⭐ ' + r.rating + '</span><span>🕐 ' + r.time + '</span><span>🚴 ' + formatDeliveryFee(r.fee) + ' delivery</span></div>' +
    '</div></div>';

  r.menu.forEach(function(section) {
    html += '<div class="menu-section"><h3>' + section.section + '</h3><div class="menu-items">';
    section.items.forEach(function(item) {
      html += '<div class="menu-item">' +
        '<div class="menu-item-img"><img src="' + item.img + '" alt="' + item.name + '" onerror="this.parentNode.innerHTML=\'' + item.emoji + '\'" /></div>' +
        '<div class="menu-item-info"><div class="menu-item-name">' + item.name + '</div><div class="menu-item-desc">' + item.desc + '</div></div>' +
        '<span class="menu-item-price">' + formatCurrency(toRupees(item.price)) + '</span>' +
        '<button class="add-btn" onclick="addToCart(\'' + item.name.replace(/'/g, '') + '\', ' + item.price + ', \'' + item.emoji + '\', event)">Add</button>' +
        '</div>';
    });
    html += '</div></div>';
  });

  document.getElementById('restaurant-modal-content').innerHTML = html;
  openModal('restaurant-modal');
}

function addToCart(name, price, emoji, event) {
  if (event) event.stopPropagation();
  price = toRupees(price);
  var existing = null;
  for (var i = 0; i < cart.length; i++) { if (cart[i].name === name) { existing = cart[i]; break; } }
  if (existing) { existing.qty += 1; } else { cart.push({ name: name, price: price, emoji: emoji, qty: 1 }); }
  updateCart();
  showToast(emoji + ' ' + name + ' added to cart');
}

function removeFromCart(name) {
  var idx = -1;
  for (var i = 0; i < cart.length; i++) { if (cart[i].name === name) { idx = i; break; } }
  if (idx === -1) return;
  if (cart[idx].qty > 1) { cart[idx].qty -= 1; } else { cart.splice(idx, 1); }
  updateCart();
}

function updateCart() {
  var count = cart.reduce(function(s, i) { return s + i.qty; }, 0);
  document.getElementById('cart-count').textContent = count;
  var itemsEl = document.getElementById('cart-items');
  var footerEl = document.getElementById('cart-footer');
  if (cart.length === 0) {
    itemsEl.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p>Your cart is empty</p><small>Add items from a restaurant to get started</small></div>';
    footerEl.style.display = 'none';
    return;
  }
  var html = '';
  cart.forEach(function(item) {
    html += '<div class="cart-item">' +
      '<div class="cart-item-img">' + item.emoji + '</div>' +
      '<div class="cart-item-info"><div class="cart-item-name">' + item.name + '</div><div class="cart-item-price">' + formatCurrency(item.price * item.qty) + '</div></div>' +
      '<div class="cart-item-qty">' +
      '<button class="qty-btn" onclick="removeFromCart(\'' + item.name.replace(/'/g, '') + '\')">−</button>' +
      '<span class="qty-num">' + item.qty + '</span>' +
      '<button class="qty-btn" onclick="addToCart(\'' + item.name.replace(/'/g, '') + '\', ' + item.price + ', \'' + item.emoji + '\')">+</button>' +
      '</div></div>';
  });
  itemsEl.innerHTML = html;
  var subtotal = cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
  document.getElementById('cart-subtotal').textContent = formatCurrency(subtotal);
  document.getElementById('cart-total').textContent = formatCurrency(subtotal + DELIVERY_FEE);
  footerEl.style.display = 'block';
}

function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

function toggleCart() {
  document.getElementById('cart-sidebar').classList.toggle('open');
  document.getElementById('cart-overlay').classList.toggle('open');
}

async function placeOrder(event) {
  event.preventDefault();
  var clerkUserId = typeof window.getClerkUserId === 'function' ? window.getClerkUserId() : null;
  if (!clerkUserId) {
    closeModal('checkout-modal');
    if (typeof window.clerkSignIn === 'function') window.clerkSignIn();
    return;
  }

  var form = event.target;
  var inputs = form.querySelectorAll('input, select');
  var orderData = {
    clerkUserId: clerkUserId,
    name: inputs[0].value,
    phone: inputs[1].value,
    address: inputs[2].value,
    payment: inputs[3].value,
    subtotal: cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0),
    total: cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0) + DELIVERY_FEE,
    items: cart.slice()
  };
  closeModal('checkout-modal');
  // Save locally first (fallback)
  saveLocalOrder(orderData);
  // Attempt remote save
  var remoteResult = typeof window.saveOrder === 'function' ? await window.saveOrder(orderData) : null;
  // If remote succeeded, clear local orders
  if (remoteResult && remoteResult.success) {
    localStorage.removeItem('quickbite_orders');
  }
  cart = [];
  updateCart();
  setTimeout(function() { openModal('success-modal'); }, 300);
}

function saveLocalOrder(orderData) {
  var orders = JSON.parse(localStorage.getItem('quickbite_orders') || '[]');
  orders.unshift({
    id: 'QB' + Date.now().toString().slice(-6),
    customer_name: orderData.name,
    phone: orderData.phone,
    address: orderData.address,
    payment_method: orderData.payment,
    subtotal: orderData.subtotal,
    delivery_fee: DELIVERY_FEE,
    total: orderData.total,
    status: 'received',
    created_at: new Date().toISOString(),
    order_items: orderData.items.map(function(item) {
      return {
        item_name: item.name,
        emoji: item.emoji,
        price: item.price,
        qty: item.qty
      };
    })
  });
  localStorage.setItem('quickbite_orders', JSON.stringify(orders.slice(0, 10)));
}

function openModal(id) {
  if (id === 'login-modal' && typeof window.clerkSignIn === 'function') {
    window.clerkSignIn();
    return;
  }

  if (id === 'checkout-modal') {
    var isSignedIn = typeof window.isClerkSignedIn === 'function' && window.isClerkSignedIn();
    if (!isSignedIn) {
      if (typeof window.clerkSignIn === 'function') window.clerkSignIn();
      return;
    }

    var mini = document.getElementById('order-summary-mini');
    if (cart.length === 0) {
      mini.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem">No items in cart.</p>';
    } else {
      var subtotal = cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
      var rows = cart.map(function(i) { return '<div class="osm-row"><span>' + i.emoji + ' ' + i.name + ' x' + i.qty + '</span><span>' + formatCurrency(i.price * i.qty) + '</span></div>'; }).join('');
      mini.innerHTML = rows + '<div class="osm-row"><span>Delivery fee</span><span>' + formatCurrency(DELIVERY_FEE) + '</span></div><div class="osm-row osm-total"><span>Total</span><span>' + formatCurrency(subtotal + DELIVERY_FEE) + '</span></div>';
    }
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
  }
  var modalEl = document.getElementById(id);
  if (!modalEl) return;
  modalEl.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  var modalEl = document.getElementById(id);
  if (!modalEl) return;
  modalEl.classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOnOverlay(event, id) {
  if (event.target === event.currentTarget) closeModal(id);
}

function showDemoTracking() {
  closeModal('success-modal');
  openModal('tracking-modal');
}

function handleLogin(event) {
  event.preventDefault();
  if (typeof window.clerkSignIn === 'function') {
    window.clerkSignIn();
  }
}

var toastTimer;
function showToast(message) {
  var toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() { toast.classList.remove('show'); }, 2500);
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    ['restaurant-modal', 'checkout-modal', 'login-modal', 'success-modal', 'tracking-modal'].forEach(closeModal);
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Expose all functions globally for inline HTML onclick handlers
window.restaurants = restaurants;
window.renderRestaurants = renderRestaurants;
window.selectCategory = selectCategory;
window.filterRestaurants = filterRestaurants;
window.filterRestaurantsById = filterRestaurantsById;
window.handleSearch = handleSearch;
window.openRestaurant = openRestaurant;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.toggleCart = toggleCart;
window.toggleMobileMenu = toggleMobileMenu;
window.openModal = openModal;
window.closeModal = closeModal;
window.closeModalOnOverlay = closeModalOnOverlay;
window.showDemoTracking = showDemoTracking;
window.placeOrder = placeOrder;
window.toggleFav = toggleFav;
