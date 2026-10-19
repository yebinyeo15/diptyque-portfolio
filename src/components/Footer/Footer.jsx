import { useEffect, useRef, useState } from "react";
import { getLenis } from "../../lib/lenis";
import "./Footer.css";

const SLIDE_INTERVAL = 3000;
const SCROLL_DIRECTION_THRESHOLD = 8;
const SCROLL_IDLE_DELAY = 1500;
const footerSlides = [
  {
    image: "/images/page/footer-image.png",
    alt: "Diptyque glass object",
    caption: [
      "검은 유리의 중심에서",
      "보이지 않는 향이 투명한 형태로 번져갑니다.",
    ],
  },
  {
    image: "/images/page/footer-image-2.png",
    alt: "Diptyque translucent glass sculpture",
    caption: [
      "보이지 않는 향의 결이",
      "공기 속에서 천천히 겹쳐집니다.",
    ],
  },
  {
    image: "/images/page/footer-image-3.png",
    alt: "Diptyque glass object surrounded by ripples",
    caption: ["향이 지나간 자리에는", "잊히지 않는 감각이 남습니다."],
  },
];

function Footer({ floatingBoundarySelector = ".main-visual" }) {
  const footerRef = useRef(null);
  const floatingRef = useRef(null);
  const hideTimerRef = useRef(null);
  const isInteractingRef = useRef(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [isFloatingVisible, setIsFloatingVisible] = useState(false);

  useEffect(() => {
    footerSlides.forEach(({ image }) => {
      const preloadImage = new Image();
      preloadImage.src = image;
    });
  }, []);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) return undefined;

    if (!("IntersectionObserver" in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isFooterVisible) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % footerSlides.length);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, [isFooterVisible]);

  useEffect(() => {
    const mainVisual = document.querySelector(floatingBoundarySelector);

    if (!mainVisual) return undefined;

    let frameId = null;
    let lastDirectionalScroll = Math.max(0, window.scrollY);

    const clearHideTimer = () => {
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };

    const scheduleHide = () => {
      clearHideTimer();

      if (isInteractingRef.current) return;

      hideTimerRef.current = window.setTimeout(() => {
        setIsFloatingVisible(false);
        hideTimerRef.current = null;
      }, SCROLL_IDLE_DELAY);
    };

    hideTimerRef.current = null;

    const updateVisibility = () => {
      frameId = null;
      const currentScroll = Math.max(0, window.scrollY);
      const hasPassedMainVisual =
        mainVisual.getBoundingClientRect().bottom <= 0;

      if (!hasPassedMainVisual) {
        clearHideTimer();
        setIsFloatingVisible(false);
        lastDirectionalScroll = currentScroll;
        return;
      }

      const scrollDelta = currentScroll - lastDirectionalScroll;

      if (Math.abs(scrollDelta) < SCROLL_DIRECTION_THRESHOLD) return;

      if (scrollDelta > 0) {
        clearHideTimer();
        setIsFloatingVisible(false);
      } else {
        setIsFloatingVisible(true);
        scheduleHide();
      }

      lastDirectionalScroll = currentScroll;
    };

    const requestVisibilityUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateVisibility);
    };

    requestVisibilityUpdate();
    window.addEventListener("scroll", requestVisibilityUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestVisibilityUpdate);

    return () => {
      window.removeEventListener("scroll", requestVisibilityUpdate);
      window.removeEventListener("resize", requestVisibilityUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      clearHideTimer();
    };
  }, [floatingBoundarySelector]);

  useEffect(() => {
    if (
      !isFloatingVisible &&
      floatingRef.current?.contains(document.activeElement)
    ) {
      document.activeElement.blur();
    }
  }, [isFloatingVisible]);

  const clearHideTimer = () => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const scheduleHide = () => {
    clearHideTimer();

    if (isInteractingRef.current) return;

    hideTimerRef.current = window.setTimeout(() => {
      setIsFloatingVisible(false);
      hideTimerRef.current = null;
    }, SCROLL_IDLE_DELAY);
  };

  const handleFloatingEnter = () => {
    isInteractingRef.current = true;
    clearHideTimer();
  };

  const handleFloatingLeave = () => {
    isInteractingRef.current = false;
    scheduleHide();
  };

  const handleFloatingBlur = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    handleFloatingLeave();
  };

  const handleBackToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lenis = getLenis();

    if (lenis) {
      lenis.scrollTo(0, { immediate: prefersReducedMotion });
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer ref={footerRef} className="site-footer" data-node-id="566:2949">
      <div className="page-inner site-footer__inner">
        <div className="site-footer__logo" data-node-id="566:2987">
          <img src="/images/page/footer-logo.svg" alt="Diptyque Paris" />
        </div>
        <p className="site-footer__tag">
          PARIS · 1961
          <br />
          PERFUMER AND ARTIST
        </p>
        <div className="site-footer__social">
          <img src="/images/page/social-behance.svg" alt="Behance" />
          <img src="/images/page/social-instagram.svg" alt="Instagram" />
          <img src="/images/page/social-x.svg" alt="X" />
        </div>
        <div className="site-footer__media" data-node-id="566:3005">
          {footerSlides.map(({ image, alt, caption }, index) => {
            const isActive = index === activeSlide;

            return (
              <div
                key={image}
                className={`site-footer__slide${isActive ? " is-active" : ""}`}
                aria-hidden={!isActive}
              >
                <img className="site-footer__image" src={image} alt={alt} />
                <p className="site-footer__caption">
                  {caption[0]}
                  <br />
                  {caption[1]}
                </p>
              </div>
            );
          })}
        </div>
        <div className="site-footer__address">
          <span>MAISON DIPTYQUE</span>
          <span>34 BOULEVARD SAINT-GERMAIN</span>
          <span>75005 PARIS</span>
        </div>
        <nav>
          <div>
            <span>FRAGRANCES</span>
            <span>CANDLES</span>
            <span>STORIES</span>
          </div>
          <div>
            <span>PRIVACY POLICY</span>
            <span>TERMS &amp; CONDITIONS</span>
            <span>ACCESSIBILITY</span>
          </div>
        </nav>
      </div>
      <aside
        ref={floatingRef}
        className={`site-footer__fixed${isFloatingVisible ? " is-visible" : ""}`}
        aria-hidden={!isFloatingVisible}
        onPointerEnter={handleFloatingEnter}
        onPointerLeave={handleFloatingLeave}
        onFocusCapture={handleFloatingEnter}
        onBlurCapture={handleFloatingBlur}
      >
        <div
          className="site-footer__fixed-card"
          aria-hidden="true"
        >
          <span className="site-footer__fixed-preview">
            <img
              src="/images/page/footer-fixed-card.png"
              alt=""
            />
          </span>
          <span className="site-footer__fixed-brand">
            DIPTYQUE
            <br />
            PARIS
          </span>
        </div>
        <button
          className="site-footer__back-to-top"
          type="button"
          onClick={handleBackToTop}
          aria-label="Back to top"
          tabIndex={isFloatingVisible ? 0 : -1}
        >
          BACK TO TOP <span>↑</span>
        </button>
      </aside>
    </footer>
  );
}

export default Footer;
