import { useState } from "react";
import "./Con6.css";

const rituals = [
  {
    question: "WHERE SHOULD I APPLY FRAGRANCE?",
    answer: [
      "손목과 목선처럼 체온이 느껴지는 곳에 가볍게 뿌려주세요.",
      "향이 피부와 만나 더욱 자연스럽게 번집니다.",
    ],
  },
  {
    question: "EAU DE TOILETTE OR EAU DE PARFUM?",
    answer: [
      "오 드 뚜왈렛은 가볍고 선명하게,",
      "오 드 퍼퓸은 더 깊고 풍부한 잔향으로 오래 머뭅니다.",
    ],
  },
  {
    question: "CAN I LAYER DIFFERENT SCENTS?",
    answer: [
      "서로 다른 향을 겹치면 나만의 새로운 인상을 만들 수 있습니다.",
      "가벼운 향부터 차례로 사용해보세요.",
    ],
  },
  {
    question: "HOW SHOULD I BURN A CANDLE?",
    answer: [
      "첫 사용 시 왁스 표면이 고르게 녹을 때까지 태워주세요.",
      "심지는 약 5mm 길이로 다듬어 사용하는 것이 좋습니다.",
    ],
  },
  {
    question: "HOW SHOULD FRAGRANCE BE STORED?",
    answer: [
      "직사광선과 높은 온도를 피해 서늘한 곳에 보관해주세요.",
      "향의 섬세한 균형을 더 오래 유지할 수 있습니다.",
    ],
  },
];

function Con6() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="con6" data-node-id="566:2837">
      <div className="page-inner con6__inner">
        <span className="section-pill">THE RITUAL</span>
        <h2 className="section-heading">
          A few things
          <br />
          worth knowing
        </h2>
        <p className="section-copy con6__lead">
          향을 사용하고, 오래 간직하는 방법.
        </p>
        <div className="con6__quote">
          <p>
            A ritual is not a rule,
            <br />
            but a way of remembering.
          </p>
          <p lang="ko">
            리추얼은 규칙이 아니라,
            <br />
            향을 기억하는 하나의 방식입니다.
          </p>
        </div>
        <div className="con6__accordion">
          {rituals.map(({ question, answer }, i) => {
            const isOpen = activeIndex === i;
            const triggerId = `con6-ritual-trigger-${i + 1}`;
            const panelId = `con6-ritual-panel-${i + 1}`;

            return (
              <div
                key={question}
                className={`con6__accordion-item${isOpen ? " is-open" : ""}`}
              >
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setActiveIndex(i)}
                >
                  <small>0{i + 1}</small>
                  <strong>{question}</strong>
                  <b aria-hidden="true">{isOpen ? "−" : "＋"}</b>
                </button>
                <div
                  id={panelId}
                  className="con6__answer"
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                >
                  <p>
                    {answer[0]}
                    <br />
                    {answer[1]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Con6;
