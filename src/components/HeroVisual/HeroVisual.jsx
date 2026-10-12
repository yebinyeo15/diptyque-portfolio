import "./HeroVisual.css";

function HeroVisual() {
  const stats = [
    ["1961", "THE BEGINNING", "파리에서 시작된 딥디크", "566:2471", "566:2463"],
    [
      "03",
      "THE FOUNDERS",
      "예술과 여행으로 연결된 세 명의 창립자",
      "566:2457",
      "566:2465",
    ],
    [
      "34",
      "THE FIRST BOUTIQUE",
      "생제르맹 34번가에 문을 연 첫 부티크",
      "566:2459",
      "566:2467",
    ],
    [
      "∞",
      "INSPIRATION",
      "예술과 자연, 기억에서 이어지는 영감",
      "566:2461",
      "566:2469",
    ],
  ];
  return (
    <section id="hero-visual" className="hero-visual" data-node-id="566:2447">
      <div className="page-inner hero-visual__inner" data-node-id="566:2449">
        <span
          className="section-pill hero-visual__pill"
          data-node-id="566:2472"
        >
          THE MAISON
        </span>
        <div className="hero-visual__title" data-node-id="566:2450">
          <h2 data-node-id="566:2451">
            Born in Paris
            <br />
            inspired by elsewhere
          </h2>
        </div>
        <div className="hero-visual__copy" data-node-id="566:2452">
          <p data-node-id="566:2453">
            Founded in Paris in 1961, Diptyque was shaped by art, travel and
            nature.
            <br />
            Every creation transforms a place, a material and a memory into
            scent.
          </p>
        </div>
        <video
          className="hero-visual__media"
          data-node-id="566:2454"
          src="/videos/hero%20visual.mp4"
          poster="/images/page/hero-media.png"
          aria-label="Diptyque fragrance still life"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-visual__stats" data-node-id="566:2455">
          {stats.map(([number, title, copy, numberNode, copyNode]) => (
            <article key={title}>
              <div className="hero-visual__stat-number">
                <strong data-node-id={numberNode}>{number}</strong>
              </div>
              <div className="hero-visual__stat-copy">
                <p data-node-id={copyNode}>
                  {title}
                  <br />
                  {copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroVisual;
