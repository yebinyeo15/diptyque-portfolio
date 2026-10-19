import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Con1.css";

const REVEAL_THRESHOLD = 0.08;
const REVEAL_ROOT_MARGIN = "0px 0px -4% 0px";
const ENABLE_CARD_REVEAL = false;

const fragrances = [
  {
    image: "doson",
    name: "DO SON",
    path: "/fragrances/do-son",
    notes: "TUBEROSE · SEA BREEZE · ORANGE BLOSSOM",
    description: ["바닷바람에 실려 오는 하얀 꽃향기,", "오래된 여름날의 기억."],
  },
  {
    image: "orpheon",
    name: "ORPHÉON",
    path: "/fragrances/orpheon",
    notes: "JUNIPER · CEDAR · TONKA BEAN",
    description: [
      "파리의 밤을 채우던 음악과 온기,",
      "시간이 지나도 남는 잔향.",
    ],
  },
  {
    image: "eaurose",
    name: "EAU ROSE",
    path: "/fragrances/eau-rose",
    notes: "DAMASK ROSE · LITCHI · CHAMOMILE",
    description: ["이슬을 머금은 장미의 첫 숨결,", "가장 순수한 꽃의 순간."],
  },
  {
    image: "tamdao",
    name: "TAM DAO",
    path: "/fragrances/tam-dao",
    notes: "SANDALWOOD · CEDAR · CYPRESS",
    description: [
      "고요한 숲속에 머무는 나무의 숨결,",
      "깊고 따뜻하게 번지는 평온.",
    ],
  },
  {
    image: "lombre",
    name: "L’OMBRE DANS L’EAU",
    path: "/fragrances/lombre-dans-leau",
    notes: "BLACKCURRANT LEAVES · ROSE",
    description: [
      "장미와 블랙커런트 잎이 만나는 순간,",
      "물가에 드리운 싱그러운 그림자.",
    ],
  },
  {
    image: "fleur",
    name: "FLEUR DE PEAU",
    path: "/fragrances/fleur-de-peau",
    notes: "MUSK · IRIS · AMBRETTE",
    description: [
      "피부 위에 조용히 스며드는 향기,",
      "가까이에서 느껴지는 부드러운 온기.",
    ],
  },
];

const filters = ["ALL", "FLORAL", "WOODY", "FRESH", "MUSKY"];

function Con1() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!ENABLE_CARD_REVEAL) {
      return undefined;
    }

    const grid = gridRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!grid || reduceMotion || !("IntersectionObserver" in window)) {
      return undefined;
    }

    const rowTriggers = grid.querySelectorAll("[data-con1-row-trigger]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const viewportBottom = entry.rootBounds?.bottom ?? window.innerHeight;

          if (
            entry.isIntersecting ||
            entry.boundingClientRect.top < viewportBottom
          ) {
            const row = entry.target.dataset.con1RowTrigger;

            grid
              .querySelectorAll(`[data-con1-row="${row}"]`)
              .forEach((card) => card.classList.add("is-visible"));
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: REVEAL_THRESHOLD,
        rootMargin: REVEAL_ROOT_MARGIN,
      },
    );

    rowTriggers.forEach((trigger) => observer.observe(trigger));
    grid.classList.add("con1__grid--reveal-ready");

    return () => {
      observer.disconnect();
      grid.classList.remove("con1__grid--reveal-ready");
    };
  }, []);

  return (
    <section id="collection" className="con1" data-node-id="566:2474">
      <div className="page-inner con1__inner" data-node-id="566:2476">
        <span className="section-pill con1__pill" data-node-id="566:2516">
          THE COLLECTION
        </span>
        <h2 className="con1__heading" data-node-id="566:2478">
          Fragrances of the Maison
        </h2>
        <p className="con1__copy" data-node-id="566:2480">
          서로 다른 장소와 기억에서 시작된 딥디크의
          <br />
          여섯 가지 향의 세계를 만나보세요
        </p>

        <div className="con1__filters" data-node-id="158:1894">
          {filters.map((filter, index) => (
            <span className={index === 0 ? "is-active" : ""} key={filter}>
              {filter}
            </span>
          ))}
        </div>

        <p className="con1__view-all">THE FRAGRANCE COLLECTION</p>

        <div
          className={`con1__grid${ENABLE_CARD_REVEAL ? "" : " con1__grid--reveal-disabled"}`}
          ref={gridRef}
        >
          {fragrances.map(({ image, name, path, notes, description }, index) => {
            const row = Math.floor(index / 2);

            return (
              <div
                className="con1__reveal"
                data-con1-row={row}
                data-con1-row-trigger={index % 2 === 0 ? row : undefined}
                key={name}
              >
                <Link
                  className={`con1__card con1__card--${image}`}
                  to={path}
                >
                  <div className="con1__image">
                    <img src={`/images/page/con1-${image}.png`} alt={name} />
                    <span className="con1__card-cue" aria-hidden="true">
                      <img src="/images/page/con1-arrow.svg" alt="" />
                    </span>
                    <div className="con1__hover" aria-hidden="true">
                      <h3>{name}</h3>
                      <span />
                      <p>
                        {description[0]}
                        <br />
                        {description[1]}
                      </p>
                      <div className="con1__details-cue">
                        <span>VIEW DETAILS</span>
                        <img
                          src="/images/fragrances/arrow-up-right.svg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="con1__meta">
                    <span>{name}</span>
                    <span>{notes}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Con1;
