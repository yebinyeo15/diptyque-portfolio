import "./Con3.css";

const scentStages = [
  { image: "origin", number: "01", title: "THE ORIGIN", description: <><span>무화과나무의 그늘, 장미가 피어난 정원, 비에 젖은 숲처럼</span><br /><span>향은 하나의 풍경에서 시작됩니다</span></>, tags: ["LANDSCAPE", "MEMORY", "NATURE"] },
  { image: "material", number: "02", title: "THE MATERIAL", description: <><span>꽃과 잎, 나무와 수지에서</span><br /><span>가장 선명한 향의 인상을 추출합니다</span></>, tags: ["FLOWER", "WOOD", "RESIN"] },
  { image: "composition", number: "03", title: "THE COMPOSITION", description: <><span>서로 다른 향조를 겹치고 비워내며</span><br /><span>딥디크만의 예상치 못한 조화를 완성합니다</span></>, tags: ["TOP", "HEART", "BASE"] },
  { image: "impression", number: "04", title: "THE IMPRESSION", description: <><span>완성된 향은 피부 위에 머물며</span><br /><span>사람마다 다른 장소와 기억을 불러옵니다</span></>, tags: ["SKIN", "SILLAGE", "MEMORY"] },
];

function Con3() {
  return (
    <section className="con3" data-node-id="566:2518">
      <div className="page-inner con3__inner">
        <span className="con3__eyebrow">THE MAKING OF A SCENT</span>
        <h2 className="con3__heading">From raw material<br />to lasting memory</h2>
        <p className="con3__intro">자연에서 발견한 원료가 하나의 기억으로 완성되는 과정을 따라가 보세요</p>

        <a className="con3__view-all">
          <span>DISCOVER THE SAVOIR-FAIRE</span>
          <img className="con3__view-all-arrow" src="/images/page/con1-arrow.svg" alt="" />
          <img className="con3__view-all-underline" src="/images/page/con1-underline.svg" alt="" />
        </a>

        <div className="con3__list" id="con3-cards">
          {scentStages.map(({ image, number, title, description, tags }) => (
            <article className={`con3__card con3__card--${image}`} key={number}>
              <div className="con3__image-frame">
                <img className="con3__image" src={`/images/page/con3-${image}.png`} alt="" />
              </div>
              <span className="con3__number">{number}</span>
              <h3 className="con3__card-title">{title}</h3>
              <p className="con3__description">{description}</p>
              <ul className="con3__tags" aria-label={`${title} keywords`}>
                {tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Con3;
