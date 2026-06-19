/* ═══════════════════════════════════════════════════════════════════════════
   CARBON QUEST - MOBILE UI HELPERS
   Additional UI interactions and utilities
   ═══════════════════════════════════════════════════════════════════════════ */

// Touch-friendly interactions
class MobileUI {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupTouchFeedback();
        this.setupAccessibility();
        this.setupPerformance();
    }
    
    /* ─────────────────────────────────────────────────────────────────────
       Touch Feedback
       ───────────────────────────────────────────────────────────────────── */
    setupTouchFeedback() {
        // Add active state on touch
        document.addEventListener('touchstart', (e) => {
            const target = e.target.closest('button, .btn-primary, .btn-secondary, .nav-item, .card-header');
            if (target) {
                target.classList.add('touch-active');
            }
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            const target = e.target.closest('button, .btn-primary, .btn-secondary, .nav-item, .card-header');
            if (target) {
                setTimeout(() => target.classList.remove('touch-active'), 150);
            }
        }, { passive: true });
    }
    
    /* ─────────────────────────────────────────────────────────────────────
       Accessibility
       ───────────────────────────────────────────────────────────────────── */
    setupAccessibility() {
        // Announce section changes to screen readers
        this.setupAriaLive();
        
        // Keyboard navigation
        this.setupKeyboardNav();
        
        // Focus management
        this.setupFocusManagement();
    }
    
    setupAriaLive() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'ariaLive';
        document.body.appendChild(liveRegion);
    }
    
    announce(message) {
        const liveRegion = document.getElementById('ariaLive');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }
    
    setupKeyboardNav() {
        // Escape key closes drawer
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const drawer = document.getElementById('settingsDrawer');
                if (drawer && drawer.classList.contains('open')) {
                    drawer.classList.remove('open');
                }
            }
        });
        
        // Tab trapping in drawer
        const drawer = document.getElementById('settingsDrawer');
        if (drawer) {
            drawer.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && drawer.classList.contains('open')) {
                    this.trapFocus(e, drawer);
                }
            });
        }
    }
    
    trapFocus(e, container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
    
    setupFocusManagement() {
        // Return focus when drawer closes
        let lastFocusedElement = null;
        
        const settingsToggle = document.getElementById('settingsToggle');
        const drawer = document.getElementById('settingsDrawer');
        const closeSettings = document.getElementById('closeSettings');
        
        if (settingsToggle && drawer) {
            settingsToggle.addEventListener('click', () => {
                lastFocusedElement = document.activeElement;
                setTimeout(() => closeSettings.focus(), 100);
            });
            
            const returnFocus = () => {
                if (lastFocusedElement) {
                    lastFocusedElement.focus();
                }
            };
            
            closeSettings.addEventListener('click', returnFocus);
            document.getElementById('drawerOverlay').addEventListener('click', returnFocus);
        }
    }
    
    /* ─────────────────────────────────────────────────────────────────────
       Performance
       ───────────────────────────────────────────────────────────────────── */
    setupPerformance() {
        // Lazy load images
        this.setupLazyLoading();
        
        // Debounce resize events
        this.setupResizeHandler();
        
        // Optimize animations
        this.setupAnimationOptimization();
    }
    
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }
    
    handleResize() {
        // Update any size-dependent calculations
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setupAnimationOptimization() {
        // Reduce animations if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition-fast', '0ms');
            document.documentElement.style.setProperty('--transition-base', '0ms');
        }
    }
    
    /* ─────────────────────────────────────────────────────────────────────
       Utilities
       ───────────────────────────────────────────────────────────────────── */
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.setAttribute('role', 'alert');
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    showLoading(show = true) {
        const loading = document.getElementById('loadingSection');
        if (loading) {
            loading.style.display = show ? 'block' : 'none';
        }
    }
}

// Add screen reader only utility class
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
    
    .touch-active {
        opacity: 0.7;
        transform: scale(0.98);
    }
    
    .toast {
        position: fixed;
        bottom: calc(var(--bottom-nav-height) + 1rem);
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        padding: 1rem 1.5rem;
        border-radius: 4px;
        background: var(--color-bg-secondary);
        color: var(--color-text);
        border: 1px solid var(--color-border);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transition: transform 0.3s ease;
        max-width: 90%;
    }
    
    .toast.show {
        transform: translateX(-50%) translateY(0);
    }
    
    @media (min-width: 768px) {
        .toast {
            bottom: 2rem;
        }
    }
`;
document.head.appendChild(style);

// Initialize mobile UI
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.mobileUI = new MobileUI();
    });
} else {
    window.mobileUI = new MobileUI();
}

// Made with Bob
