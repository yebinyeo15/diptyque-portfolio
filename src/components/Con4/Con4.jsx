import { useCallback, useEffect, useRef, useState } from "react";

import "./Con4.css";
import { getLenis } from "../../lib/lenis";
import doSonImage from "./con4-doson.png";
import orpheonImage from "./con4-orpheon.png";
import tamDaoImage from "./con4-tamdao.png";

const fragrances = ["PHILOSYKOS", "DO SON", "ORPHÉON", "TAM DAO"];
const STICKY_MIN_WIDTH = 768;
const STICKY_MIN_HEIGHT = 840;

const fragranceContent = {
  PHILOSYKOS: {
    image: "/images/page/con4-philosykos.png",
    imageAlt: "무화과나무와 무화과 열매",
    archiveLabel: "01 / PHILOSYKOS",
    quote: (
      <>
        <p>
          <em>Under</em>
          <span> the fig tree,</span>
        </p>
        <p>
          <span>summer </span>
          <em>seemed</em>
          <span> to</span>
        </p>
        <p>
          <span>stand </span>
          <em>still.</em>
        </p>
      </>
    ),
    notes: "FIG LEAF · FIG WOOD · WHITE CEDAR",
    description: (
      <>
        무화과나무 그늘 아래,
        <br />
        여름의 시간이 잠시 멈춘 듯했습니다
      </>
    ),
  },
  "DO SON": {
    image: doSonImage,
    imageAlt: "흰 천과 튜베로즈 꽃",
    archiveLabel: "02 / DO SON",
    quote: (
      <>
        <p>
          <em>Tuberose</em>
          <span> drifting</span>
        </p>
        <p>
          <span>in </span>
          <em>from</em>
        </p>
        <p>
          <span>the </span>
          <em>sea.</em>
        </p>
      </>
    ),
    notes: "TUBEROSE · SEA BREEZE · ORANGE BLOSSOM",
    description: (
      <>
        바닷바람을 따라 스며든,
        <br />
        튜베로즈의 부드러운 기억
      </>
    ),
  },
  ORPHÉON: {
    image: orpheonImage,
    imageAlt: "연기와 유리잔, 주니퍼 열매",
    archiveLabel: "03 / ORPHÉON",
    quote: (
      <>
        <p>
          <span>The </span>
          <em>night</em>
        </p>
        <p>
          <em>remained</em>
          <span> on</span>
        </p>
        <p>
          <span>velvet and </span>
          <em>wood.</em>
        </p>
      </>
    ),
    notes: "JUNIPER · CEDAR · TONKA BEAN",
    description: (
      <>
        파리의 밤, 벨벳과 나무에 남은
        <br />
        따뜻하고 관능적인 기억
      </>
    ),
  },
  "TAM DAO": {
    image: tamDaoImage,
    imageAlt: "안개가 낀 고요한 삼나무 숲",
    archiveLabel: "04 / TAM DAO",
    quote: (
      <>
        <p>
          <span>A quiet </span>
          <em>forest,</em>
        </p>
        <p>
          <em>held</em>
          <span> close</span>
        </p>
        <p>
          <span>to </span>
          <em>skin.</em>
        </p>
      </>
    ),
    notes: "SANDALWOOD · CEDAR · CYPRESS",
    description: (
      <>
        고요한 숲, 피부 가까이 머무는
        <br />
        샌달우드의 따뜻한 기억
      </>
    ),
  },
};

function Con4() {
  const [selectedFragrance, setSelectedFragrance] = useState("PHILOSYKOS");
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const frameRequestRef = useRef(null);
  const programmaticIndexRef = useRef(null);
  const targetScrollRef = useRef(null);
  const unlockTimerRef = useRef(null);
  const selectedContent = fragranceContent[selectedFragrance];

  const getScrollMetrics = useCallback(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;

    if (!section || !panel) return null;

    const stickyEnabled =
      window.innerWidth >= STICKY_MIN_WIDTH &&
      window.innerHeight >= STICKY_MIN_HEIGHT;
    const stickyTop = Math.max(
      0,
      (window.innerHeight - panel.offsetHeight) / 2,
    );
    const sectionTop = section.getBoundingClientRect().top;
    const scrollTrack = Math.max(0, section.offsetHeight - panel.offsetHeight);
    const step = scrollTrack / fragrances.length;
    const scrollTop = document.scrollingElement?.scrollTop ?? window.scrollY;

    return {
      scrollTop,
      scrollTrack,
      sectionTop,
      stickyEnabled,
      stickyTop,
      step,
    };
  }, []);

  const releaseProgrammaticScroll = useCallback(() => {
    programmaticIndexRef.current = null;
    targetScrollRef.current = null;

    if (unlockTimerRef.current !== null) {
      window.clearTimeout(unlockTimerRef.current);
      unlockTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (frameRequestRef.current !== null) {
      window.cancelAnimationFrame(frameRequestRef.current);
      frameRequestRef.current = null;
    }

    const updateFromScroll = () => {
      frameRequestRef.current = null;

      const metrics = getScrollMetrics();

      if (!metrics) return;

      const progress = Math.min(
        metrics.scrollTrack,
        Math.max(0, metrics.stickyTop - metrics.sectionTop),
      );
      if (!metrics.stickyEnabled) {
        return;
      }

      if (programmaticIndexRef.current !== null) {
        if (
          targetScrollRef.current === null ||
          Math.abs(metrics.scrollTop - targetScrollRef.current) > 2
        ) {
          return;
        }

        releaseProgrammaticScroll();
      }

      if (metrics.step <= 0) return;

      const nextIndex = Math.min(
        fragrances.length - 1,
        Math.max(0, Math.floor(progress / metrics.step)),
      );

      setSelectedFragrance((current) =>
        current === fragrances[nextIndex] ? current : fragrances[nextIndex],
      );
    };

    const requestUpdate = () => {
      if (frameRequestRef.current !== null) return;

      frameRequestRef.current = window.requestAnimationFrame(updateFromScroll);
    };

    const handleWindowScroll = () => {
      requestUpdate();
    };

    const handleDocumentScroll = () => {
      requestUpdate();
    };

    const handleResize = () => requestUpdate();

    const interruptProgrammaticScroll = () => {
      if (programmaticIndexRef.current === null) return;

      releaseProgrammaticScroll();
      requestUpdate();
    };

    requestUpdate();
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    document.addEventListener("scroll", handleDocumentScroll, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", handleResize);
    window.addEventListener("wheel", interruptProgrammaticScroll, {
      passive: true,
    });
    window.addEventListener("touchstart", interruptProgrammaticScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      document.removeEventListener("scroll", handleDocumentScroll, true);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", interruptProgrammaticScroll);
      window.removeEventListener("touchstart", interruptProgrammaticScroll);

      if (frameRequestRef.current !== null) {
        window.cancelAnimationFrame(frameRequestRef.current);
        frameRequestRef.current = null;
      }

      if (unlockTimerRef.current !== null) {
        window.clearTimeout(unlockTimerRef.current);
      }
    };
  }, [getScrollMetrics, releaseProgrammaticScroll]);

  const handleFragranceSelect = (name) => {
    const nextIndex = fragrances.indexOf(name);
    const metrics = getScrollMetrics();

    setSelectedFragrance(name);

    if (!metrics?.stickyEnabled || nextIndex < 0) return;

    const currentProgress = metrics.stickyTop - metrics.sectionTop;
    const targetProgress = nextIndex * metrics.step + 1;
    const targetScroll = metrics.scrollTop + targetProgress - currentProgress;

    programmaticIndexRef.current = nextIndex;
    targetScrollRef.current = targetScroll;

    if (unlockTimerRef.current !== null) {
      window.clearTimeout(unlockTimerRef.current);
    }

    const lenis = getLenis();

    if (lenis) {
      lenis.scrollTo(targetScroll, { lerp: 0.12 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }

    unlockTimerRef.current = window.setTimeout(releaseProgrammaticScroll, 1200);
  };

  return (
    <section ref={sectionRef} className="con4" data-node-id="566:2590">
      <div ref={panelRef} className="page-inner con4__inner">
        <span className="section-pill">SCENT STORIES</span>
        <h2 className="section-heading">
          Scents that
          <br />
          stay with us
        </h2>
        <p className="section-copy">
          향이 사라진 뒤에도
          <br />
          장소와 순간에 대한 기억은 오래 남습니다
        </p>
        <div className="con4__feature" data-node-id="566:2730">
          <div className="con4__image-stack">
            {fragrances.map((name) => {
              const content = fragranceContent[name];
              const isActive = name === selectedFragrance;

              return (
                <img
                  key={name}
                  className={`con4__image${isActive ? " is-active" : ""}`}
                  src={content.image}
                  alt={isActive ? content.imageAlt : ""}
                  aria-hidden={!isActive}
                  data-fragrance={name}
                />
              );
            })}
          </div>
          <div className="con4__archive">
            <div key={selectedFragrance} className="con4__archive-content">
              <small className="con4__archive-index">
                {selectedContent.archiveLabel}
              </small>
              <div className="con4__archive-quote">{selectedContent.quote}</div>
              <small className="con4__archive-notes">
                {selectedContent.notes}
              </small>
            </div>
          </div>
        </div>
        <ol className="con4__index" aria-label="향수 목록">
          {fragrances.map((name, i) => (
            <li
              key={name}
              className={
                name === selectedFragrance ? "is-selected" : "is-muted"
              }
            >
              <button
                type="button"
                className="con4__index-trigger"
                onClick={() => handleFragranceSelect(name)}
                aria-pressed={name === selectedFragrance}
              >
                <small className="con4__index-number">0{i + 1}</small>
                <strong className="con4__index-name">{name}</strong>
              </button>
              <span className="con4__index-arrow" aria-hidden="true">
                →
              </span>
              <p
                className="con4__index-copy"
                aria-hidden={name !== selectedFragrance}
              >
                {fragranceContent[name].description}
              </p>
            </li>
          ))}
        </ol>
        <div className="con4__marquee" aria-hidden="true">
          <div className="con4__marquee-track">
            <p>
              PHILOSYKOS — FIG LEAF&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;DO SON
              — TUBEROSE&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;EAU ROSE — DAMASK
              ROSE&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;ORPHÉON —
              JUNIPER&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;TAM DAO —
              SANDALWOOD&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;PHILOSYKOS — FIG
              LEAF&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;DO SON —
              TUBEROSE&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;EAU ROSE — DAMASK
              ROSE&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;ORPHÉON —
              JUNIPER&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;TAM DAO — SANDALWOOD
            </p>
            <p aria-hidden="true">
              PHILOSYKOS — FIG LEAF&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;DO SON
              — TUBEROSE&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;EAU ROSE — DAMASK
              ROSE&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;ORPHÉON —
              JUNIPER&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;TAM DAO —
              SANDALWOOD&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;PHILOSYKOS — FIG
              LEAF&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;DO SON —
              TUBEROSE&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;EAU ROSE — DAMASK
              ROSE&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;ORPHÉON —
              JUNIPER&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;TAM DAO — SANDALWOOD
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Con4;
