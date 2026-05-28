let clerk = null;
let initialized = false;
let initPromise = null;

export async function initClerk() {
  if (initialized) {
    updateNavAuth();
    return;
  }

  const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  if (!key) {
    console.warn('VITE_CLERK_PUBLISHABLE_KEY not set');
    updateNavAuth();
    return;
  }

  if (!initPromise) {
    initPromise = (async () => {
      const ClerkModule = await import('@clerk/clerk-js');
      const ClerkClass = ClerkModule.default || ClerkModule.Clerk;

      clerk = new ClerkClass(key);
      await clerk.load();

      initialized = true;
      window.__clerk = clerk;

      updateNavAuth();

      clerk.addListener(() => {
        updateNavAuth();
      });
    })().catch((err) => {
      initPromise = null;
      console.error('Clerk init error:', err);
      updateNavAuth();
      throw err;
    });
  }

  await initPromise;
}

function updateNavAuth() {
  const area = document.getElementById('auth-area');
  if (!area) return;

  const user = clerk?.user;

  if (user) {
    const name = user.firstName || user.fullName || user.emailAddresses?.[0]?.emailAddress || 'User';
    const photo = user.imageUrl;
    const initials = name.slice(0, 2).toUpperCase();

    area.innerHTML =
      '<div class="user-menu">' +
        '<button class="user-btn" onclick="toggleUserDropdown()">' +
          (photo
            ? `<img src="${photo}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;flex-shrink:0;" alt="${name}" />`
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

export function getClerkUserId() {
  return clerk?.user?.id || window.__clerk?.user?.id || null;
}

export function isClerkSignedIn() {
  return Boolean(getClerkUserId());
}

// Global functions called from HTML onclick
window.clerkSignIn = async () => {
  try {
    if (!initialized) await initClerk();
    const returnUrl = window.location.href;
    await clerk?.redirectToSignIn({
      redirectUrl: returnUrl,
      signInFallbackRedirectUrl: returnUrl,
      signUpFallbackRedirectUrl: returnUrl
    });
  } catch (err) {
    console.error('Clerk sign-in error:', err);
  }
};

window.clerkSignOut = async () => {
  try {
    if (!initialized) await initClerk();
    await clerk?.signOut();
    updateNavAuth();
  } catch (err) {
    console.error('Clerk sign-out error:', err);
  }
};

window.getClerkUserId = getClerkUserId;
window.isClerkSignedIn = isClerkSignedIn;

window.toggleUserDropdown = () => {
  document.getElementById('user-dropdown')?.classList.toggle('open');
};

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.user-menu')) {
    document.getElementById('user-dropdown')?.classList.remove('open');
  }
});
