import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from "next/image";
import Ney from "@/public/webp/Ney.webp";
import NeyII from "@/public/webp/NeyII.webp";
import CVImage from "@/public/webp/CV.webp";
interface TypedInstance {
  destroy: () => void;
}
export function ABOUT() {
  const [showCV, setShowCV] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [showRotatePrompt, setShowRotatePrompt] = useState(false);
  const handleCVClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowCV(true);
    setShowPDF(false);
  }, []);
  const handleCloseCV = () => {
    setShowCV(false);
    setShowPDF(false);
  };
  useEffect(() => {
    const checkOrientation = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isSmallPortrait = width < 570 && width < height;
      setIsLandscape(width > height);
      setShowRotatePrompt(showCV && isSmallPortrait && !showPDF);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, [showCV, showPDF]);
  useEffect(() => {
    if (showCV) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [showCV]);
  useEffect(() => {
    let typedInstance: TypedInstance | undefined;
    const container = document.querySelector(".fade-bottom");
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            import("typed.js").then(({ default: Typed }) => {
              typedInstance = new Typed(".typing", {
                strings: ["Engineer", "RPA-Developer", "IT-Manager", "Student"],
                typeSpeed: 60,
                backSpeed: 60,
                loop: true,
                startDelay: 300,
                showCursor: false,
                cursorChar: "|",
              });
            });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);
    return () => {
      typedInstance?.destroy();
      observer.disconnect();
    };
  }, []);
  const handleImageClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowPDF(true);
  }, []);
  return (
    <section className="about" id="about" aria-labelledby="About me">
      <div className="max-width">
        <h2 className="title" id="animated">About me</h2>
        <div className="about-content">
          <div className="column">
            <div className="right" id="downtop">
              <Image src={Ney} className="polygons img-down reveal" alt="Ney" style={{ animation: "zoom-in-zoom-out 2s ease infinite" }}  />
              <Image src={NeyII} className="polygons img-top reveal" alt="Ney" style={{ animation: "zoom-in-zoom-out 2s ease infinite" }}  />
            </div>
            <div className="left">
              <div className="reveal text fade-bottom" style={{ fontFamily: "'BlackChancery', sans-serif", textAlign: "center" }}>
                Ich bin ein <span className="typing"></span>
              </div>
              <p className="reveal fade-right">
                Wenn ich nicht gerade Code repariere, Kaffee trinke oder über die neueste Tech-Neuigkeit staune, baue ich Dinge im Internet. 
                Mein Job ist es, Computer davon zu überzeugen, das zu tun, was wir wollen (meistens klappt&apos;s 😉).<br />
                Mehr über meinen Werdegang erfährst du hier... 👇🏻
              </p>
            </div>
            <div className="buttonNeon reveal fade-left" style={{ textAlign: "center" }}>
              <Link href="/cvpage" id="buttonNeon-II" onClick={handleCVClick}>
                <span></span><span></span><span></span><span></span>
                <strong>Download CV</strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {showCV && (
        <>
          <div className={`cv-overlay ${showPDF ? 'pdf-active' : ''}`}>
            <div className={`cv-popup ${showPDF ? 'pdf-active' : ''}`}>
              {showRotatePrompt ? (
                <div className="rotate-prompt-overlay">
                  <div className="rotate-prompt-container">
                    <button className="rotate-close-btn" onClick={handleCloseCV}>✕</button>
                    <div className="rotate-icon">📱</div>
                    <h3>Bitte drehe dein Handy</h3>
                    <p>Halte dein Gerät im Querformat für die beste Ansicht</p>
                    <div className="rotate-arrow">↻</div>
                  </div>
                </div>
              ) : showPDF ? (
                <div className="pdf-content rainbowcard rainbowGlow">
                  <iframe src="/pdf/CV.pdf" className="cv-iframe" title="CV PDF Viewer" />
                  <button className="cv-close-btn" onClick={handleCloseCV}>✕</button>
                </div>
              ) : (
                <div className={`cv-content rainbowcard rainbowGlow ${isLandscape ? 'landscape-mode' : ''}`}>
                  <a href="#" onClick={handleImageClick} className="cv-image-link">
                    <Image src={CVImage} className="cv-image" alt="CV Preview" />
                  </a>
                  <button className="cv-close-btn" onClick={handleCloseCV}>✕</button>
                </div>
              )}
            </div>
          </div>
          <div className="cv-blur"></div>
        </>
      )}
    </section>
  );
}