import { formatCurrency, formatDeliveryFee, toRupees } from './currency.js';

const tagImages = {
  'all': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=200&q=80&auto=format&fit=crop',
  'pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=80&auto=format&fit=crop',
  'italian': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=200&q=80&auto=format&fit=crop',
  'burgers': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80&auto=format&fit=crop',
  'american': 'https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=200&q=80&auto=format&fit=crop',
  'sushi': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&q=80&auto=format&fit=crop',
  'japanese': 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=200&q=80&auto=format&fit=crop',
  'indian': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&q=80&auto=format&fit=crop',
  'curry': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200&q=80&auto=format&fit=crop',
  'mexican': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200&q=80&auto=format&fit=crop',
  'tacos': 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=200&q=80&auto=format&fit=crop',
  'noodles': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&q=80&auto=format&fit=crop',
  'asian': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=200&q=80&auto=format&fit=crop',
  'salads': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80&auto=format&fit=crop',
  'desserts': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&q=80&auto=format&fit=crop',
  'sandwiches': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200&q=80&auto=format&fit=crop',
  'chicken': 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=200&q=80&auto=format&fit=crop',
  'steaks': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200&q=80&auto=format&fit=crop',
  'vegan': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80&auto=format&fit=crop'
};

var activeTag = 'all';

function initMenuPage() {
  var allTags = ['all'];
  window.restaurants.forEach(function(r) {
    r.tags.forEach(function(t) { if (!allTags.includes(t)) allTags.push(t); });
  });

  var pillsEl = document.getElementById('menu-filter-pills');
  if (!pillsEl) return;

  pillsEl.innerHTML = allTags.map(function(t) {
    var imgUrl = tagImages[t] || tagImages['all'];
    var label = t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1);
    return '<button class="menu-pill' + (t === 'all' ? ' active' : '') + '" onclick="setTag(\'' + t + '\', this)">' +
      '<div class="menu-pill-img-wrapper">' +
      '<img src="' + imgUrl + '" alt="' + label + '" class="menu-pill-img" />' +
      '</div>' +
      '<span class="menu-pill-name">' + label + '</span></button>';
  }).join('');

  renderMenuPage('');
}

function setTag(tag, el) {
  activeTag = tag;
  document.querySelectorAll('.menu-pill').forEach(function(p) { p.classList.remove('active'); });
  el.classList.add('active');
  renderMenuPage(document.getElementById('menu-search').value);
}

function filterMenu(query) {
  renderMenuPage(query);
}

function renderMenuPage(query) {
  var q = (query || '').toLowerCase().trim();
  var sectionsEl = document.getElementById('menu-sections');
  var html = '';
  var anyResults = false;

  window.restaurants.forEach(function(r) {
    // filter by tag
    if (activeTag !== 'all' && !r.tags.includes(activeTag)) return;

    // collect all items across all sections
    var allItems = [];
    r.menu.forEach(function(section) {
      section.items.forEach(function(item) {
        allItems.push({ item: item, section: section.section });
      });
    });

    // filter by search query
    if (q) {
      allItems = allItems.filter(function(entry) {
        return entry.item.name.toLowerCase().includes(q) ||
          entry.item.desc.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q);
      });
    }

    if (allItems.length === 0) return;
    anyResults = true;

    html += '<div class="restaurant-menu-block">';
    html += '<div class="rmb-header">';
    html += '<div class="rmb-img"><img src="' + r.img + '" alt="' + r.name + '" /></div>';
    html += '<div class="rmb-info"><h2>' + r.name + '</h2>';
    html += '<div class="rmb-meta"><span>⭐ ' + r.rating + '</span><span>🕐 ' + r.time + '</span><span>🚴 ' + formatDeliveryFee(r.fee) + ' delivery</span></div>';
    html += '</div></div>';

    html += '<div class="menu-grid">';
    allItems.forEach(function(entry) {
      var item = entry.item;
      html += '<div class="menu-card">';
      html += '<div class="menu-card-img">';
      if (item.img) {
        html += '<img src="' + item.img + '" alt="' + item.name + '" onerror="this.parentNode.innerHTML=\'<div class=menu-card-emoji-fallback>' + item.emoji + '</div>\'" />';
      } else {
        html += '<div class="menu-card-emoji-fallback">' + item.emoji + '</div>';
      }
      html += '<span class="menu-card-restaurant-tag">' + r.name + '</span>';
      html += '</div>';
      html += '<div class="menu-card-body">';
      html += '<div class="menu-card-name">' + item.name + '</div>';
      html += '<div class="menu-card-desc">' + item.desc + '</div>';
      html += '<div class="menu-card-footer">';
      html += '<span class="menu-card-price">' + formatCurrency(toRupees(item.price)) + '</span>';
      html += '<button class="add-btn" onclick="addToCart(\'' + item.name.replace(/'/g, '') + '\', ' + item.price + ', \'' + item.emoji + '\', event)">Add to cart</button>';
      html += '</div></div></div>';
    });
    html += '</div></div>';
  });

  if (!anyResults) {
    html = '<div class="no-results"><div>🔍</div><p>No dishes found</p><small>Try a different search or filter</small></div>';
  }

  sectionsEl.innerHTML = html;
}

window.initMenuPage = initMenuPage;
window.setTag = setTag;
window.filterMenu = filterMenu;
window.renderMenuPage = renderMenuPage;
