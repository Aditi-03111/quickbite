import { loadRestaurants, saveOrder, db } from './supabase.js';
import { initClerk } from './clerk.js';
import './app.js';
import './menu-page.js';

window.saveOrder = saveOrder;
window.db = db;

document.addEventListener('DOMContentLoaded', async () => {
  window.initMenuPage();
  const clerkReady = initClerk();
  const loaded = await loadRestaurants();
  if (loaded.length > 0) {
    window.restaurants.splice(0, window.restaurants.length, ...loaded);
    window.initMenuPage();
  }

  await clerkReady;
});
