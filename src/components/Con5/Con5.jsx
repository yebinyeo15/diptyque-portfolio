import "./Con5.css";

function Con5() {
  const cards = [
    [
      "flame",
      "01 / THE FLAME",
      <>
        Light
        <br />
        the <em>scent</em>
      </>,
      <>
        불을 밝히는 순간,
        <br />
        향은 공간 속 하나의 분위기가 됩니다.
      </>,
      "CANDLES · HOME FRAGRANCE",
      "DISCOVER THE CANDLES",
    ],
    [
      "interior",
      "02 / THE INTERIOR",
      <>
        A room
        <br />
        with a <em>memory</em>
      </>,
      <>
        향과 오브제가 놓인 공간은
        <br />
        오래 기억되는 하나의 풍경이 됩니다.
      </>,
      "DECORATION · DIFFUSERS · OBJECTS",
      "ENTER THE HOME",
    ],
  ];
  return (
    <section id="beyond" className="con5" data-node-id="566:2755">
      <div className="page-inner con5__inner">
        <span className="section-pill">BEYOND THE PERFUME</span>
        <h2 className="section-heading">Scent, beyond the bottle</h2>
        <p className="section-copy">
          피부 위의 향에서 공간에 머무는 향까지,
          <br />
          딥디크의 세계는 일상 전체로 이어집니다.
        </p>
        <div className="con5__cards">
          {cards.map(([image, label, title, copy, meta, link]) => (
            <article key={image} className={`con5__card--${image}`}>
              <img src={`/images/page/con5-${image}.png`} alt="" />
              <img src={`/images/page/con5-${image}-overlay.png`} alt="" />
              <small>{label}</small>
              <h3>{title}</h3>
              <p>{copy}</p>
              <b>{meta}</b>
              <a>{link}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Con5;
