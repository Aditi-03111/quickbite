import { loadRestaurants, saveOrder, db } from './supabase.js';
import { initClerk, updateNavAuth } from './clerk.js';

// Make functions available globally for inline HTML handlers
window.saveOrder = saveOrder;
window.db = db;

// Import app logic
import './app.js';

// Init on load
document.addEventListener('DOMContentLoaded', async () => {
  const clerkReady = initClerk();
  const loaded = await loadRestaurants();
  if (loaded.length > 0) {
    window.restaurants.splice(0, window.restaurants.length, ...loaded);
    if (typeof window.renderRestaurants === 'function') {
      window.renderRestaurants(window.restaurants);
    }
  }
  await clerkReady;
});
