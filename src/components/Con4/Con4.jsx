import "./Con4.css";

function Con4() {
  const fragrances = ["PHILOSYKOS", "DO SON", "ORPHÉON", "TAM DAO"];
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
        <div className="con4__feature">
          <img
            src="/images/page/con4-philosykos.png"
            alt="Fig tree and fruit"
          />
          <div>
            <small>01 / PHILOSYKOS</small>
            <strong>
              Under the fig tree,
              <br />
              summer seemed to
              <br />
              stand still.
            </strong>
            <small>FIG LEAF · FIG WOOD · WHITE CEDAR</small>
          </div>
        </div>
        <ol>
          {fragrances.map((name, i) => (
            <li key={name} className={i ? "is-muted" : ""}>
              <small>0{i + 1}</small>
              <strong>{name}</strong>
              {i === 0 && (
                <>
                  <span>→</span>
                  <p>
                    무화과나무 그늘 아래,
                    <br />
                    여름의 시간이 잠시 멈춘 듯했습니다
                  </p>
                </>
              )}
            </li>
          ))}
        </ol>
        <div className="con4__marquee">
          PHILOSYKOS — FIG LEAF&nbsp;&nbsp; ✦ &nbsp;&nbsp;DO SON —
          TUBEROSE&nbsp;&nbsp; ✦ &nbsp;&nbsp;EAU ROSE — DAMASK ROSE&nbsp;&nbsp;
          ✦ &nbsp;&nbsp;ORPHÉON — JUNIPER&nbsp;&nbsp; ✦ &nbsp;&nbsp;TAM DAO —
          SANDALWOOD&nbsp;&nbsp; ✦ &nbsp;&nbsp;PHILOSYKOS — FIG LEAF
        </div>
      </div>
    </section>
  );
}

export default Con4;
