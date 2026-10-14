import { useEffect, useRef, useState } from "react";
import "./Footer.css";

const SLIDE_INTERVAL = 3000;
const footerSlides = [
  {
    image: "/images/page/footer-image.png",
    alt: "Diptyque glass object",
    caption: [
      "검은 유리의 중심에서",
      "보이지 않는 향이 투명한 형태로 번져갑니다.",
    ],
  },
  {
    image: "/images/page/footer-image-2.png",
    alt: "Diptyque translucent glass sculpture",
    caption: [
      "보이지 않는 향의 결이",
      "공기 속에서 천천히 겹쳐집니다.",
    ],
  },
  {
    image: "/images/page/footer-image-3.png",
    alt: "Diptyque glass object surrounded by ripples",
    caption: ["향이 지나간 자리에는", "잊히지 않는 감각이 남습니다."],
  },
];

function Footer() {
  const footerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    footerSlides.forEach(({ image }) => {
      const preloadImage = new Image();
      preloadImage.src = image;
    });
  }, []);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) return undefined;

    if (!("IntersectionObserver" in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % footerSlides.length);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, [isVisible]);

  return (
    <footer ref={footerRef} className="site-footer" data-node-id="566:2949">
      <div className="page-inner site-footer__inner">
        <div className="site-footer__logo" data-node-id="566:2987">
          <img src="/images/page/footer-logo.svg" alt="Diptyque Paris" />
        </div>
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
        <div className="site-footer__media" data-node-id="566:3005">
          {footerSlides.map(({ image, alt, caption }, index) => {
            const isActive = index === activeSlide;

            return (
              <div
                key={image}
                className={`site-footer__slide${isActive ? " is-active" : ""}`}
                aria-hidden={!isActive}
              >
                <img className="site-footer__image" src={image} alt={alt} />
                <p className="site-footer__caption">
                  {caption[0]}
                  <br />
                  {caption[1]}
                </p>
              </div>
            );
          })}
        </div>
        <div className="site-footer__address">
          <span>MAISON DIPTYQUE</span>
          <span>34 BOULEVARD SAINT-GERMAIN</span>
          <span>75005 PARIS</span>
        </div>
        <nav>
          <div>
            <span>FRAGRANCES</span>
            <span>CANDLES</span>
            <span>STORIES</span>
          </div>
          <div>
            <span>PRIVACY POLICY</span>
            <span>TERMS &amp; CONDITIONS</span>
            <span>ACCESSIBILITY</span>
          </div>
        </nav>
      </div>
      <aside className="site-footer__fixed" aria-hidden="true">
        <div className="site-footer__fixed-card">
          <div className="site-footer__fixed-preview">
            <img
              src="/images/page/footer-fixed-card.png"
              alt=""
            />
          </div>
          <div className="site-footer__fixed-brand">
            DIPTYQUE
            <br />
            PARIS
          </div>
        </div>
        <div className="site-footer__back-to-top">
          BACK TO TOP <span>↑</span>
        </div>
      </aside>
    </footer>
  );
}

export default Footer;
