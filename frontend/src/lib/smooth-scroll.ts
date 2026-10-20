/**
 * Ultra-smooth hardware-accelerated scroll to top animation
 * Replaces native window.scrollTo({ behavior: 'smooth' }) which often stutters,
 * teleports, or gets aborted by browser thresholds on long pages.
 */
export function smoothScrollToTop(duration = 900, callback?: () => void) {
  if (typeof window === 'undefined') return;

  const startPosition = window.pageYOffset || document.documentElement.scrollTop;
  if (startPosition <= 0) {
    if (callback) callback();
    return;
  }

  const startTime = performance.now();
  let isCancelled = false;

  // Interruption listener: if user touches trackpad or scrolls, let them take over
  const cancelOnUserInteraction = () => {
    isCancelled = true;
    cleanup();
  };

  const cleanup = () => {
    window.removeEventListener('wheel', cancelOnUserInteraction);
    window.removeEventListener('touchmove', cancelOnUserInteraction);
  };

  window.addEventListener('wheel', cancelOnUserInteraction, { passive: true });
  window.addEventListener('touchmove', cancelOnUserInteraction, { passive: true });

  // Luxury easeInOutCubic: soft liftoff, fluid glide, whisper-soft deceleration
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const frame = (currentTime: number) => {
    if (isCancelled) return;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    const nextY = Math.round(startPosition * (1 - easedProgress));
    window.scrollTo(0, nextY);

    if (progress < 1) {
      window.requestAnimationFrame(frame);
    } else {
      cleanup();
      window.scrollTo(0, 0);
      if (callback) callback();
    }
  };

  window.requestAnimationFrame(frame);
}
