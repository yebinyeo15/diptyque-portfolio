import { useEffect, useRef } from "react";
import "./Con8.css";

const STICKY_MEDIA_QUERY =
  "(min-width: 1200px) and (hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const SCROLL_DISTANCE = 900;
const REVEAL_COMPLETION = 0.87;
const PROGRESS_EASING_MS = 90;
const PROGRESS_EPSILON = 0.0001;

const lines = [
  "A fragrance is never only what we smell.",
  "It is the air of a place, the warmth of skin,",
  "the trace of a season. Long after it disappears,",
  "it quietly leads us back.",
];

function Quote({ className, ariaHidden = false }) {
  return (
    <p className={className} aria-hidden={ariaHidden || undefined}>
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </p>
  );
}

function Con8() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const stickyMedia = window.matchMedia(STICKY_MEDIA_QUERY);
    const reducedMotionMedia = window.matchMedia(REDUCED_MOTION_QUERY);
    let frameId = null;
    let currentProgress = 0;
    let targetProgress = 0;
    let previousTime = null;

    const getProgress = () => {
      if (!stickyMedia.matches) return 0;

      const sectionTop = section.getBoundingClientRect().top;

      return Math.min(
        1,
        Math.max(0, -sectionTop / SCROLL_DISTANCE),
      );
    };

    const applyProgress = (progress) => {
      const revealProgress = Math.min(1, progress / REVEAL_COMPLETION);

      lines.forEach((_, index) => {
        const lineProgress = Math.min(
          1,
          Math.max(0, revealProgress * lines.length - index),
        );

        section.style.setProperty(
          `--con8-line-${index + 1}`,
          `${(lineProgress * 100).toFixed(3)}%`,
        );
      });
    };

    const renderProgress = (time) => {
      const elapsed = previousTime === null ? 0 : time - previousTime;
      previousTime = time;

      if (reducedMotionMedia.matches) {
        currentProgress = targetProgress;
      } else {
        const easing = 1 - Math.exp(-elapsed / PROGRESS_EASING_MS);
        currentProgress += (targetProgress - currentProgress) * easing;
      }

      if (Math.abs(targetProgress - currentProgress) < PROGRESS_EPSILON) {
        currentProgress = targetProgress;
      }

      applyProgress(currentProgress);

      if (currentProgress !== targetProgress) {
        frameId = window.requestAnimationFrame(renderProgress);
      } else {
        frameId = null;
        previousTime = null;
      }
    };

    const requestRender = () => {
      targetProgress = getProgress();

      if (frameId === null) {
        previousTime = null;
        frameId = window.requestAnimationFrame(renderProgress);
      }
    };

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    stickyMedia.addEventListener("change", requestRender);
    reducedMotionMedia.addEventListener("change", requestRender);

    currentProgress = getProgress();
    targetProgress = currentProgress;
    applyProgress(currentProgress);

    return () => {
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      stickyMedia.removeEventListener("change", requestRender);
      reducedMotionMedia.removeEventListener("change", requestRender);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="con8" data-node-id="566:2945">
      <div
        className="page-inner con8__inner"
        data-node-id="566:2946"
      >
        <div className="con8__main-text" data-node-id="566:2947">
          <Quote className="con8__copy con8__copy--default" />
          <Quote className="con8__copy con8__copy--revealed" ariaHidden />
        </div>
      </div>
    </section>
  );
}

export default Con8;
