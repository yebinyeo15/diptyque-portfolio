import { useEffect, useRef } from "react";
import "./Con2.css";

function Con2() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return undefined;

    let observer;
    if (!("IntersectionObserver" in window)) {
      video.play().catch(() => {});
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        },
        { threshold: 0.01 },
      );

      observer.observe(section);
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = null;
    let lastFrameTime = null;
    let currentInset = 22.5;
    const smoothingTime = 150;
    const fullWidthHold = 0.22;

    const getTargetInset = () => {
      if (reducedMotion.matches || window.innerWidth < 768) {
        return 0;
      }

      const rect = section.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = rect.top + rect.height / 2;
      const travelDistance = (window.innerHeight + rect.height) / 2;
      const centerDistance = Math.min(
        1,
        Math.abs(sectionCenter - viewportCenter) / travelDistance,
      );
      const revealProgress = Math.max(
        0,
        (centerDistance - fullWidthHold) / (1 - fullWidthHold),
      );

      return 22.5 * revealProgress;
    };

    const setRevealInset = (inset) => {
      section.style.setProperty("--con2-reveal-inset", `${inset.toFixed(3)}%`);
    };

    const animateReveal = (timestamp) => {
      const targetInset = getTargetInset();

      if (reducedMotion.matches || window.innerWidth < 768) {
        currentInset = 0;
        lastFrameTime = null;
        frameId = null;
        setRevealInset(0);
        return;
      }

      const deltaTime =
        lastFrameTime === null
          ? 16.67
          : Math.min(timestamp - lastFrameTime, 64);
      const smoothing = 1 - Math.exp(-deltaTime / smoothingTime);
      currentInset += (targetInset - currentInset) * smoothing;
      lastFrameTime = timestamp;

      if (Math.abs(targetInset - currentInset) < 0.01) {
        currentInset = targetInset;
        lastFrameTime = null;
        frameId = null;
        setRevealInset(currentInset);
        return;
      }

      setRevealInset(currentInset);
      frameId = window.requestAnimationFrame(animateReveal);
    };

    const requestRevealAnimation = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(animateReveal);
    };

    currentInset = getTargetInset();
    setRevealInset(currentInset);

    window.addEventListener("scroll", requestRevealAnimation, {
      passive: true,
    });
    window.addEventListener("resize", requestRevealAnimation);
    reducedMotion.addEventListener("change", requestRevealAnimation);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", requestRevealAnimation);
      window.removeEventListener("resize", requestRevealAnimation);
      reducedMotion.removeEventListener("change", requestRevealAnimation);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      video.pause();
    };
  }, []);

  return (
    <section ref={sectionRef} className="con2" data-node-id="566:3061">
      <video
        ref={videoRef}
        src="/videos/con2_video.mp4"
        poster="/images/page/con2-video-still.png"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </section>
  );
}

export default Con2;
