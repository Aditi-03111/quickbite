var activeTag = 'all';

function initMenuPage() {
  var allTags = ['all'];
  window.restaurants.forEach(function(r) {
    r.tags.forEach(function(t) { if (!allTags.includes(t)) allTags.push(t); });
  });

  var pillsEl = document.getElementById('menu-filter-pills');
  if (!pillsEl) return;

  pillsEl.innerHTML = allTags.map(function(t) {
    return '<button class="menu-pill' + (t === 'all' ? ' active' : '') + '" onclick="setTag(\'' + t + '\', this)">' +
      (t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)) + '</button>';
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
    html += '<div class="rmb-meta"><span>⭐ ' + r.rating + '</span><span>🕐 ' + r.time + '</span><span>🚴 ' + r.fee + ' delivery</span></div>';
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
      html += '<span class="menu-card-price">$' + item.price.toFixed(2) + '</span>';
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
