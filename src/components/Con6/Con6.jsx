import "./Con6.css";

function Con6() {
  const questions = [
    "WHERE SHOULD I APPLY FRAGRANCE?",
    "EAU DE TOILETTE OR EAU DE PARFUM?",
    "CAN I LAYER DIFFERENT SCENTS?",
    "HOW SHOULD I BURN A CANDLE?",
    "HOW SHOULD FRAGRANCE BE STORED?",
  ];
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
          A ritual is not a rule,
          <br />
          but a way of remembering.
          <br />
          <span>
            리추얼은 규칙이 아니라,
            <br />
            향을 기억하는 하나의 방식입니다.
          </span>
        </div>
        <div className="con6__accordion">
          {questions.map((q, i) => (
            <div key={q} className={i === 0 ? "is-open" : ""}>
              <small>0{i + 1}</small>
              <strong>{q}</strong>
              <b>{i === 0 ? "−" : "＋"}</b>
              {i === 0 && (
                <p>
                  손목과 목선처럼 체온이 느껴지는 곳에 가볍게 뿌려주세요.
                  <br />
                  향이 피부와 만나 더욱 자연스럽게 번집니다.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Con6;
