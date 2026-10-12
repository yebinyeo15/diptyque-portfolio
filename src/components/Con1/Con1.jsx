import "./Con1.css";

const fragrances = [
  {
    image: "doson",
    name: "DO SON",
    notes: "TUBEROSE · SEA BREEZE · ORANGE BLOSSOM",
    description: ["바닷바람에 실려 오는 하얀 꽃향기,", "오래된 여름날의 기억."],
  },
  {
    image: "orpheon",
    name: "ORPHÉON",
    notes: "JUNIPER · CEDAR · TONKA BEAN",
    description: [
      "파리의 밤을 채우던 음악과 온기,",
      "시간이 지나도 남는 잔향.",
    ],
  },
  {
    image: "eaurose",
    name: "EAU ROSE",
    notes: "DAMASK ROSE · LITCHI · CHAMOMILE",
    description: ["이슬을 머금은 장미의 첫 숨결,", "가장 순수한 꽃의 순간."],
  },
  {
    image: "tamdao",
    name: "TAM DAO",
    notes: "SANDALWOOD · CEDAR · CYPRESS",
    description: [
      "고요한 숲속에 머무는 나무의 숨결,",
      "깊고 따뜻하게 번지는 평온.",
    ],
  },
  {
    image: "lombre",
    name: "L’OMBRE DANS L’EAU",
    notes: "BLACKCURRANT LEAVES · ROSE",
    description: [
      "장미와 블랙커런트 잎이 만나는 순간,",
      "물가에 드리운 싱그러운 그림자.",
    ],
  },
  {
    image: "fleur",
    name: "FLEUR DE PEAU",
    notes: "MUSK · IRIS · AMBRETTE",
    description: [
      "피부 위에 조용히 스며드는 향기,",
      "가까이에서 느껴지는 부드러운 온기.",
    ],
  },
];

const filters = ["ALL", "FLORAL", "WOODY", "FRESH", "MUSKY"];

function Con1() {
  return (
    <section className="con1" data-node-id="566:2474">
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

        <a className="con1__view-all" data-node-id="566:2508">
          <span>VIEW ALL FRAGRANCES</span>
        </a>
        <span
          className="con1__view-arrow"
          aria-hidden="true"
          data-node-id="566:2510"
        >
          <img src="/images/page/con1-arrow.svg" alt="" />
        </span>
        <img
          className="con1__view-underline"
          src="/images/page/con1-underline.svg"
          alt=""
          data-node-id="566:2512"
        />

        <div className="con1__grid">
          {fragrances.map(({ image, name, notes, description }) => (
            <article className={`con1__card con1__card--${image}`} key={name}>
              <div className="con1__image">
                <img src={`/images/page/con1-${image}.png`} alt={name} />
                <div className="con1__hover" aria-hidden="true">
                  <h3>{name}</h3>
                  <span />
                  <p>
                    {description[0]}
                    <br />
                    {description[1]}
                  </p>
                </div>
              </div>
              <div className="con1__meta">
                <span>{name}</span>
                <span>{notes}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Con1;
