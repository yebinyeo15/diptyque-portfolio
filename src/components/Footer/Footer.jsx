import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer" data-node-id="566:2949">
      <div className="page-inner site-footer__inner">
        <img
          className="site-footer__logo"
          src="/images/figma-logo.svg"
          alt="Diptyque Paris"
        />
        <p className="site-footer__tag">
          PARIS · 1961
          <br />
          PERFUMER AND ARTIST
        </p>
        <div className="site-footer__social">
          <img src="/images/page/social-behance.svg" alt="Behance" />
          <img src="/images/page/social-instagram.svg" alt="Instagram" />
          <img src="/images/page/social-x.svg" alt="X" />
        </div>
        <img
          className="site-footer__image"
          src="/images/page/footer-image.png"
          alt="Diptyque glass object"
        />
        <p className="site-footer__caption">
          검은 유리의 중심에서
          <br />
          보이지 않는 향이 투명한 형태로 번져갑니다.
        </p>
        <div className="site-footer__address">
          MAISON DIPTYQUE
          <br />
          34 BOULEVARD SAINT-GERMAIN
          <br />
          <span>75005 PARIS</span>
        </div>
        <nav>
          <div>
            FRAGRANCES
            <br />
            CANDLES
            <br />
            STORIES
          </div>
          <div>
            PRIVACY POLICY
            <br />
            TERMS &amp; CONDITIONS
            <br />
            ACCESSIBILITY
          </div>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
