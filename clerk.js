import { Clerk } from '@clerk/clerk-js';

let clerkReady = false;
let clerkInitPromise = null;

export async function initClerk() {
  const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!key) {
    console.warn('Missing VITE_CLERK_PUBLISHABLE_KEY. Clerk sign-in is disabled.');
    updateNavAuth(null);
    return;
  }

  if (clerkReady) {
    updateNavAuth(window.__clerk);
    return;
  }

  if (!clerkInitPromise) {
    clerkInitPromise = (async () => {
      const clerk = new Clerk(key);
      await clerk.load();
      window.__clerk = clerk;
      clerkReady = true;

      updateNavAuth(clerk);
      clerk.addListener(() => updateNavAuth(window.__clerk));
    })().catch((error) => {
      clerkInitPromise = null;
      console.error('Clerk failed to initialize:', error);
      updateNavAuth(null);
      throw error;
    });
  }

  await clerkInitPromise;
}

export function getClerkUserId() {
  return window.__clerk?.user?.id || null;
}

export function isClerkSignedIn() {
  return Boolean(getClerkUserId());
}

export function updateNavAuth(clerk) {
  const area = document.getElementById('auth-area');
  if (!area) return;

  if (clerk && clerk.user) {
    const name = clerk.user.firstName || clerk.user.fullName || 'User';
    const photo = clerk.user.imageUrl;
    const initials = name.slice(0, 2).toUpperCase();

    area.innerHTML =
      '<div class="user-menu">' +
        '<button class="user-btn" onclick="toggleUserDropdown()">' +
          (photo
            ? `<img src="${photo}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;" />`
            : `<div class="user-avatar">${initials}</div>`) +
          `<span>${name.split(' ')[0]}</span>` +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>' +
        '</button>' +
        '<div class="user-dropdown" id="user-dropdown">' +
          '<a href="orders.html">🛍️ My Orders</a>' +
          '<button class="signout-btn" onclick="clerkSignOut()">🚪 Sign out</button>' +
        '</div>' +
      '</div>';
  } else {
    area.innerHTML =
      '<button class="btn btn-ghost" onclick="clerkSignIn()">Sign in</button>' +
      '<button class="btn btn-primary" onclick="clerkSignIn()">Get started</button>';
  }
}

window.clerkSignIn = async () => {
  try {
    if (!clerkReady) await initClerk();
    await window.__clerk?.redirectToSignIn({
      signInFallbackRedirectUrl: window.location.href
    });
  } catch (error) {
    console.error('Clerk sign-in failed:', error);
  }
};

window.clerkSignOut = async () => {
  await window.__clerk?.signOut();
  updateNavAuth(window.__clerk);
};

window.getClerkUserId = getClerkUserId;
window.isClerkSignedIn = isClerkSignedIn;

window.toggleUserDropdown = () => {
  document.getElementById('user-dropdown')?.classList.toggle('open');
};

document.addEventListener('click', (e) => {
  if (!e.target.closest('.user-menu')) {
    document.getElementById('user-dropdown')?.classList.remove('open');
  }
});
