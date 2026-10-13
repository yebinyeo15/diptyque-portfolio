import { useState } from "react";

import "./Con4.css";
import doSonImage from "./con4-doson.png";
import orpheonImage from "./con4-orpheon.png";
import tamDaoImage from "./con4-tamdao.png";

const fragrances = ["PHILOSYKOS", "DO SON", "ORPHÉON", "TAM DAO"];

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
  "ORPHÉON": {
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
  const selectedContent = fragranceContent[selectedFragrance];

  return (
    <section className="con4" data-node-id="566:2590">
      <div className="page-inner con4__inner">
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
          <img
            key={selectedFragrance}
            src={selectedContent.image}
            alt={selectedContent.imageAlt}
          />
          <div className="con4__archive">
            <small className="con4__archive-index">
              {selectedContent.archiveLabel}
            </small>
            <div className="con4__archive-quote">
              {selectedContent.quote}
            </div>
            <small className="con4__archive-notes">
              {selectedContent.notes}
            </small>
          </div>
        </div>
        <ol className="con4__index" aria-label="향수 목록">
          {fragrances.map((name, i) => (
            <li
              key={name}
              className={name === selectedFragrance ? "is-selected" : "is-muted"}
            >
              <button
                type="button"
                className="con4__index-trigger"
                onClick={() => setSelectedFragrance(name)}
                aria-pressed={name === selectedFragrance}
              >
                <small className="con4__index-number">0{i + 1}</small>
                <strong className="con4__index-name">{name}</strong>
              </button>
              {name === selectedFragrance && (
                <>
                  <span className="con4__index-arrow" aria-hidden="true">
                    →
                  </span>
                  <p className="con4__index-copy">
                    {selectedContent.description}
                  </p>
                </>
              )}
            </li>
          ))}
        </ol>
        <div className="con4__marquee" aria-hidden="true">
          <p>
            PHILOSYKOS — FIG LEAF&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;DO SON —
            TUBEROSE&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;EAU ROSE — DAMASK
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
    </section>
  );
}

export default Con4;
