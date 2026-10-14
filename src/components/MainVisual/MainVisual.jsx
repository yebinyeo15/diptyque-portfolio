import "./MainVisual.css";

const cards = [
  "philosykos",
  "doson",
  "eau-rose",
  "orpheon",
  "tam-dao",
  "fleur",
];

const fragranceNames =
  "PHILOSYKOS      DO SON      EAU ROSE      ORPHEON      TAM DAO      FLEUR DE PEAU";
const fragranceMarqueeText = `${fragranceNames}      `;

function MainVisual() {
  return (
    <section className="main-visual" data-node-id="566:2426">
      <div className="page-inner main-visual__inner">
        <div className="main-visual__title" data-node-id="566:2438">
          <h1 data-node-id="566:2439">
            A Journey
            <br />
            Through Scent
          </h1>
        </div>
        <div className="main-visual__intro" data-node-id="566:2430">
          <p data-node-id="566:2432">
            향으로 되살아나는
            <br />
            기억과 장소의 풍경
          </p>
          <span aria-hidden="true" data-node-id="566:2433" />
        </div>
        <div className="main-visual__caption" data-node-id="566:2436">
          <p data-node-id="566:2437">향기는 기억보다 오래 남습니다.</p>
        </div>
        <div className="main-visual__names" data-node-id="566:2428">
          <div className="main-visual__names-track">
            <p data-node-id="566:2429">{fragranceMarqueeText}</p>
            <p aria-hidden="true">{fragranceMarqueeText}</p>
          </div>
        </div>
      </div>
      <div className="main-visual__cards" data-node-id="566:2440">
        <div className="main-visual__cards-track">
          {[0, 1].map((setIndex) => (
            <div
              className="main-visual__card-set"
              key={setIndex}
              aria-hidden={setIndex === 1 || undefined}
            >
              {cards.map((card) => (
                <img
                  key={`${setIndex}-${card}`}
                  src={`/images/page/main-${card}.png`}
                  alt=""
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MainVisual;
