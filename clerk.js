// Clerk is loaded via CDN script tag in HTML, not as npm import
// This file just wires up the UI

let clerkReady = false;
let clerkLoadPromise = null;

export async function initClerk() {
  const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (clerkReady) {
    updateNavAuth(window.__clerk);
    return;
  }

  if (!clerkLoadPromise) clerkLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://outgoing-sheepdog-64.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js`;
    script.onload = resolve;
    script.onerror = () => {
      // fallback to jsdelivr
      const s2 = document.createElement('script');
      s2.src = 'https://cdn.jsdelivr.net/npm/@clerk/clerk-js@6/dist/clerk.browser.js';
      s2.onload = resolve;
      s2.onerror = reject;
      document.head.appendChild(s2);
    };
    document.head.appendChild(script);
  });

  await clerkLoadPromise;
  const clerk = new window.Clerk(key);
  await clerk.load();
  window.__clerk = clerk;
  clerkReady = true;

  updateNavAuth(clerk);
  clerk.addListener(() => updateNavAuth(window.__clerk));
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
  if (!clerkReady) await initClerk();
  await window.__clerk?.redirectToSignIn({ redirectUrl: window.location.href });
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
