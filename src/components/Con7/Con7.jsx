import { useEffect, useRef } from "react";
import "./Con7.css";

const STICKY_MEDIA_QUERY =
  "(min-width: 1200px) and (min-height: 1000px) and (hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const SCROLL_DISTANCE = 900;
const DEFAULT_DIVIDER_WIDTH = 31;
const EXPANDED_DIVIDER_WIDTH = 454;

function Con7() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;

    if (!section || !panel) return undefined;

    const stickyMedia = window.matchMedia(STICKY_MEDIA_QUERY);
    const reducedMotionMedia = window.matchMedia(REDUCED_MOTION_QUERY);
    let frameId = null;

    const renderProgress = () => {
      frameId = null;

      if (!stickyMedia.matches || reducedMotionMedia.matches) {
        section.style.setProperty("--con7-image-scale", "1");
        section.style.setProperty(
          "--con7-divider-width",
          `${DEFAULT_DIVIDER_WIDTH}px`,
        );
        return;
      }

      const sectionTop = section.getBoundingClientRect().top;
      const stickyTop = (window.innerHeight - panel.offsetHeight) / 2;
      const progress = Math.min(
        1,
        Math.max(0, (stickyTop - sectionTop) / SCROLL_DISTANCE),
      );
      const imageScale = 1 + progress * 0.5;
      const dividerWidth =
        DEFAULT_DIVIDER_WIDTH +
        progress * (EXPANDED_DIVIDER_WIDTH - DEFAULT_DIVIDER_WIDTH);

      section.style.setProperty("--con7-image-scale", imageScale.toFixed(4));
      section.style.setProperty(
        "--con7-divider-width",
        `${dividerWidth.toFixed(2)}px`,
      );
    };

    const requestRender = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(renderProgress);
    };

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    stickyMedia.addEventListener("change", requestRender);
    reducedMotionMedia.addEventListener("change", requestRender);
    renderProgress();

    return () => {
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      stickyMedia.removeEventListener("change", requestRender);
      reducedMotionMedia.removeEventListener("change", requestRender);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const cards = [
    [
      "card1",
      "PLACES · PARIS",
      <>
        Where every
        <br />
        journey began
      </>,
      <>
        생제르맹 34번지에서 시작된
        <br />
        딥디크 최초의 이야기.
      </>,
    ],
    [
      "card2",
      "MATERIALS · FIG LEAF",
      <>
        The green memory
        <br />
        of a fig tree
      </>,
      <>
        잎과 나무, 햇빛의 기억으로
        <br />
        완성된 필로시코스.
      </>,
    ],
    [
      "card3",
      "ART & CULTURE",
      <>
        When scent meets
        <br />
        imagination
      </>,
      <>
        향과 회화, 오브제가 만나는
        <br />
        딥디크의 예술적 세계.
      </>,
    ],
  ];
  return (
    <section ref={sectionRef} className="con7" data-node-id="566:2901">
      <div ref={panelRef} className="page-inner con7__inner">
        <span className="section-pill">SCENT JOURNAL</span>
        <h2 className="section-heading">Notes from the Maison</h2>
        <p className="section-copy">
          향과 장소, 예술에 관한
          <br />
          메종 딥디크의 짧은 기록.
        </p>
        <div className="con7__stories-link">
          <span>VIEW ALL STORIES</span>
          <span className="con7__stories-arrow" aria-hidden="true">
            <img src="/images/page/con1-arrow.svg" alt="" />
          </span>
          <img
            className="con7__stories-underline"
            src="/images/page/con1-underline.svg"
            alt=""
          />
        </div>
        <div className="con7__cards">
          {cards.map(([image, label, title, copy]) => (
            <article key={image} className={`con7__card con7__card--${image}`}>
              <div className="con7__card-media">
                <img
                  className="con7__card-image"
                  src={`/images/page/con7-${image}.png`}
                  alt=""
                />
              </div>
              <small>{label}</small>
              <h3>{title}</h3>
              <span
                className="con7__card-divider"
                aria-hidden="true"
              />
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Con7;
