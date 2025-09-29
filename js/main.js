function showMessage() {
    document.getElementById('message').textContent = 'Welcome to your Next Step!';
}

const navigation = document.querySelector('[data-mobile-nav]');
const toggleButton = document.querySelector('[data-mobile-nav-toggle]');
const mobileBreakpoint = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(max-width: 900px)')
    : null;

function isMenuOpen() {
    if (!toggleButton) {
        return true;
    }

    const expanded = toggleButton.getAttribute('aria-expanded');
    return expanded === 'true';
}

function syncAriaHidden() {
    if (!navigation) {
        return;
    }

    if (!mobileBreakpoint) {
        navigation.removeAttribute('aria-hidden');
        return;
    }

    const isMobile = mobileBreakpoint.matches;
    const menuOpen = isMenuOpen();

    if (!isMobile) {
        navigation.removeAttribute('aria-hidden');
        return;
    }

    if (menuOpen) {
        navigation.removeAttribute('aria-hidden');
    } else {
        navigation.setAttribute('aria-hidden', 'true');
    }
}

function handleToggleClick() {
    const isExpanded = isMenuOpen();
    const nextExpandedState = !isExpanded;

    if (toggleButton) {
        toggleButton.setAttribute('aria-expanded', String(nextExpandedState));
    }

    if (navigation) {
        navigation.classList.toggle('is-open', nextExpandedState);
    }

    syncAriaHidden();
}

if (navigation) {
    syncAriaHidden();

    if (toggleButton) {
        toggleButton.addEventListener('click', handleToggleClick);
    }

    if (mobileBreakpoint) {
        if (typeof mobileBreakpoint.addEventListener === 'function') {
            mobileBreakpoint.addEventListener('change', syncAriaHidden);
        } else if (typeof mobileBreakpoint.addListener === 'function') {
            mobileBreakpoint.addListener(syncAriaHidden);
        }
    }
}
