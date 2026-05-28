import { loadRestaurants, saveOrder } from './supabase.js';
import { initClerk } from './clerk.js';
import './app.js';

// Make saveOrder available globally for placeOrder in app.js
window.saveOrder = saveOrder;

document.addEventListener('DOMContentLoaded', async () => {
  // Load restaurants from Express API
  const loaded = await loadRestaurants();
  if (loaded.length > 0 && window.restaurants) {
    window.restaurants.splice(0, window.restaurants.length, ...loaded);
    if (typeof window.renderCategories === 'function') window.renderCategories();
    if (typeof window.renderRestaurants === 'function') window.renderRestaurants(window.restaurants);
  }

  // Init Clerk auth
  await initClerk();
});
