/**
 * Ultra-smooth hardware-accelerated scroll to top animation.
 *
 * Why native window.scrollTo({ behavior: 'smooth' }) or naive rAF fails:
 * 1. CSS `scroll-behavior: smooth` on `html` conflicts with programmatic rAF updates:
 *    Calling window.scrollTo(0, nextY) repeatedly causes the browser's native smooth-scroller
 *    to restart and fight every 16ms, producing severe stutter, lags, or visual freezes.
 * 2. On macOS trackpads / Magic Mouse, clicking fires residual momentum `wheel` events
 *    or micro-displacements. Naive interruption listeners immediately cancel on frame 1,
 *    aborting the scroll before it even moves.
 * 3. Native browser smooth-scroll on long pages (>3000px) has a fixed duration cap
 *    causing extreme velocity (~8000px/s) or sudden teleporting/white-screen drops.
 *
 * This implementation fixes all of the above:
 * - Temporarily disables CSS `scroll-behavior: smooth` during execution.
 * - Uses `behavior: 'instant'` per frame for 120 FPS hardware-synced progression.
 * - Protects against Mac trackpad click momentum with a grace period (280ms) and delta threshold.
 * - Uses luxury easeInOutCubic for silky soft departure and whisper landing.
 * - Prevents multiple overlapping animations.
 */

let activeAnimationId: number | null = null;
let activeCleanup: (() => void) | null = null;

export function smoothScrollToTop(duration?: number, callback?: () => void) {
  if (typeof window === 'undefined') return;

  // 1. Cancel any active smooth scroll animation to avoid racing
  if (activeCleanup) {
    activeCleanup();
  }

  const startY =
    window.scrollY ??
    window.pageYOffset ??
    document.documentElement.scrollTop ??
    document.body.scrollTop ??
    0;

  if (startY <= 2) {
    if (callback) callback();
    return;
  }

  // 2. Compute balanced duration based on distance if not explicitly set
  // (e.g. ~650ms for short distance, ~950ms for 5000px+ full page)
  const distance = Math.abs(startY);
  const resolvedDuration =
    typeof duration === 'number' && duration > 0
      ? duration
      : Math.min(1050, Math.max(650, Math.round(600 + Math.sqrt(distance) * 5.5)));

  // 3. Temporarily suppress CSS `scroll-behavior: smooth` on root elements
  const docEl = document.documentElement;
  const bodyEl = document.body;
  const prevDocBehavior = docEl.style.scrollBehavior;
  const prevBodyBehavior = bodyEl.style.scrollBehavior;

  // Force instant scrolling so our rAF controls exact pixel positions at 120 FPS
  docEl.style.setProperty('scroll-behavior', 'auto', 'important');
  bodyEl.style.setProperty('scroll-behavior', 'auto', 'important');

  const startTime = performance.now();
  let isCancelled = false;

  // 4. Interruption listener with Grace Period (280ms) for Mac trackpad momentum
  const GRACE_PERIOD_MS = 280;

  const onWheel = (e: WheelEvent) => {
    // Ignore residual inertial momentum from trackpad clicks during first 280ms
    if (performance.now() - startTime < GRACE_PERIOD_MS) return;
    // Only cancel if user intentionally scrolls (magnitude > 6px)
    if (Math.abs(e.deltaY) > 6 || Math.abs(e.deltaX) > 6) {
      cancelScroll();
    }
  };

  const onTouchMove = () => {
    if (performance.now() - startTime < GRACE_PERIOD_MS) return;
    cancelScroll();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (performance.now() - startTime < GRACE_PERIOD_MS) return;
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space', 'Home', 'End'].includes(e.code)) {
      cancelScroll();
    }
  };

  const cleanup = () => {
    if (activeAnimationId !== null) {
      cancelAnimationFrame(activeAnimationId);
      activeAnimationId = null;
    }
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('keydown', onKeyDown);

    // Restore original CSS scroll behavior
    docEl.style.scrollBehavior = prevDocBehavior;
    bodyEl.style.scrollBehavior = prevBodyBehavior;

    activeCleanup = null;
  };

  const cancelScroll = () => {
    isCancelled = true;
    cleanup();
  };

  activeCleanup = cleanup;

  window.addEventListener('wheel', onWheel, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: true });
  window.addEventListener('keydown', onKeyDown, { passive: true });

  // 5. Luxury easeInOutCubic: soft liftoff, fluid glide, whisper-soft deceleration
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const frame = (currentTime: number) => {
    if (isCancelled) return;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / resolvedDuration, 1);
    const eased = easeInOutCubic(progress);

    const nextY = Math.max(0, Math.round(startY * (1 - eased)));

    try {
      window.scrollTo({
        top: nextY,
        left: 0,
        behavior: 'instant' as ScrollBehavior,
      });
    } catch {
      window.scrollTo(0, nextY);
    }

    if (progress < 1) {
      activeAnimationId = window.requestAnimationFrame(frame);
    } else {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      } catch {
        window.scrollTo(0, 0);
      }
      cleanup();
      if (callback) callback();
    }
  };

  activeAnimationId = window.requestAnimationFrame(frame);
}
