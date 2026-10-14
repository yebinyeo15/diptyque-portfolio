import "./About.css";

function About() {
  return (
    <section className="about" data-node-id="566:2414">
      <div className="page-inner about__inner" data-node-id="566:2415">
        <div className="about__main-text" data-node-id="566:2416">
          <h2 data-node-id="566:2417">
            <em>PHILOSYKOS</em>
            <span>The scent</span>
            <span>that defines</span>
            <span>the Maison</span>
          </h2>
        </div>

        <div className="about__sub-text" data-node-id="566:2418">
          <p data-node-id="566:2419">
            딥디크의 자연과 기억에 대한 시선을
            <br />
            가장 상징적으로 담아낸 향
          </p>
        </div>

        <div className="about__drop-one-frame" data-node-id="566:2420">
          <img src="/images/page/about-drop1.png" alt="" />
        </div>
        <img
          className="about__drop-two"
          src="/images/page/about-drop2.png"
          alt=""
          data-node-id="566:2421"
        />
        <img
          className="about__puddle"
          src="/images/page/about-puddle.png"
          alt=""
          data-node-id="566:2422"
        />

        <div className="about__figs" data-node-id="566:2423">
          <div
            className="about__fig-frame about__fig-frame--left"
            data-node-id="566:2424"
          >
            <div className="about__fig-float about__fig-float--left">
              <img src="/images/page/about-left.png" alt="" />
            </div>
          </div>
          <div
            className="about__fig-frame about__fig-frame--right"
            data-node-id="566:2425"
          >
            <div className="about__fig-float about__fig-float--right">
              <img src="/images/page/about-right.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
