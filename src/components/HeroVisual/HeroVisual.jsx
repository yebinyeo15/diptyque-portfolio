import { useEffect, useRef } from "react";
import "./HeroVisual.css";

const SCROLL_DISTANCE = 900;
const FRAME_PROGRESS_END = 0.62;
const COUNT_PROGRESS_START = 0.58;
const COUNT_DURATION_MS = 700;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const clamp = (value) => Math.min(1, Math.max(0, value));
const smoothStep = (value) => value * value * (3 - 2 * value);

const STATS = [
  [
    "1961",
    1961,
    0,
    "THE BEGINNING",
    "파리에서 시작된 딥디크",
    "566:2471",
    "566:2463",
  ],
  [
    "03",
    3,
    2,
    "THE FOUNDERS",
    "예술과 여행으로 연결된 세 명의 창립자",
    "566:2457",
    "566:2465",
  ],
  [
    "34",
    34,
    2,
    "THE FIRST BOUTIQUE",
    "생제르맹 34번가에 문을 연 첫 부티크",
    "566:2459",
    "566:2467",
  ],
  [
    "∞",
    null,
    0,
    "INSPIRATION",
    "예술과 자연, 기억에서 이어지는 영감",
    "566:2461",
    "566:2469",
  ],
];

function HeroVisual() {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const reducedMotionMedia = window.matchMedia(REDUCED_MOTION_QUERY);
    let frameId = null;
    let countFrameId = null;
    let countStartTime = null;
    let hasCountStarted = false;

    const applyCountProgress = (progress) => {
      STATS.forEach(([, finalValue, digits], index) => {
        const numberElement = numberRefs.current[index];

        if (!numberElement || finalValue === null) return;

        const nextValue = Math.round(finalValue * progress);
        numberElement.textContent = String(nextValue).padStart(digits, "0");
      });
    };

    const runCountUp = (time) => {
      if (countStartTime === null) countStartTime = time;

      const progress = clamp((time - countStartTime) / COUNT_DURATION_MS);
      applyCountProgress(smoothStep(progress));

      if (progress < 1) {
        countFrameId = window.requestAnimationFrame(runCountUp);
      } else {
        countFrameId = null;
      }
    };

    const startCountUp = () => {
      if (reducedMotionMedia.matches) {
        if (countFrameId !== null) {
          window.cancelAnimationFrame(countFrameId);
          countFrameId = null;
        }

        hasCountStarted = true;
        applyCountProgress(1);
        return;
      }

      if (hasCountStarted) return;

      hasCountStarted = true;
      countFrameId = window.requestAnimationFrame(runCountUp);
    };

    const applyFrameProgress = (progress) => {
      const frameProgress = smoothStep(
        clamp(progress / FRAME_PROGRESS_END),
      );

      section.style.setProperty(
        "--hero-media-scale",
        (0.9 + frameProgress * 0.1).toFixed(4),
      );
    };

    const update = () => {
      frameId = null;

      if (reducedMotionMedia.matches) {
        applyFrameProgress(1);
        startCountUp();
        return;
      }

      const sectionTop = section.getBoundingClientRect().top;
      const startTop = window.innerHeight * 0.55;
      const progress = clamp((startTop - sectionTop) / SCROLL_DISTANCE);

      applyFrameProgress(progress);

      if (progress >= COUNT_PROGRESS_START) {
        startCountUp();
      }
    };

    const requestUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(update);
    };

    applyCountProgress(reducedMotionMedia.matches ? 1 : 0);
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotionMedia.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotionMedia.removeEventListener("change", requestUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      if (countFrameId !== null) window.cancelAnimationFrame(countFrameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-visual"
      className="hero-visual"
      data-node-id="566:2447"
    >
      <div className="page-inner hero-visual__inner" data-node-id="566:2449">
        <span
          className="section-pill hero-visual__pill"
          data-node-id="566:2472"
        >
          THE MAISON
        </span>
        <div className="hero-visual__title" data-node-id="566:2450">
          <h2 data-node-id="566:2451">
            Born in Paris
            <br />
            inspired by elsewhere
          </h2>
        </div>
        <div className="hero-visual__copy" data-node-id="566:2452">
          <p data-node-id="566:2453">
            Founded in Paris in 1961, Diptyque was shaped by art, travel and
            nature.
            <br />
            Every creation transforms a place, a material and a memory into
            scent.
          </p>
        </div>
        <video
          className="hero-visual__media"
          data-node-id="566:2454"
          src="/videos/hero%20visual.mp4"
          poster="/images/page/hero-media.png"
          aria-label="Diptyque fragrance still life"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-visual__stats" data-node-id="566:2455">
          {STATS.map(([
            number,
            finalValue,
            ,
            title,
            copy,
            numberNode,
            copyNode,
          ], index) => (
            <article key={title}>
              <div className="hero-visual__stat-number">
                {finalValue === null ? (
                  <img
                    className="hero-visual__infinity"
                    src="/images/page/hero-infinity.png"
                    alt="∞"
                    data-node-id={numberNode}
                  />
                ) : (
                  <strong
                    ref={(node) => {
                      numberRefs.current[index] = node;
                    }}
                    data-node-id={numberNode}
                  >
                    {number}
                  </strong>
                )}
              </div>
              <div className="hero-visual__stat-copy">
                <p data-node-id={copyNode}>
                  {title}
                  <br />
                  {copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroVisual;
