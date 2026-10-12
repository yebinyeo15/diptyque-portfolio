import "./Con7.css";

function Con7() {
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
    <section className="con7" data-node-id="566:2901">
      <div className="page-inner con7__inner">
        <span className="section-pill">SCENT JOURNAL</span>
        <h2 className="section-heading">Notes from the Maison</h2>
        <p className="section-copy">
          향과 장소, 예술에 관한
          <br />
          메종 딥디크의 짧은 기록.
        </p>
        <a className="text-link">
          <span>VIEW ALL STORIES</span>
        </a>
        <div className="con7__cards">
          {cards.map(([image, label, title, copy]) => (
            <article key={image}>
              <img src={`/images/page/con7-${image}.png`} alt="" />
              <small>{label}</small>
              <h3>{title}</h3>
              <i />
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Con7;
