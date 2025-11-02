import { useEffect, useRef } from "react";
export function HOME() {
  const homeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.querySelectorAll("h3, h4, h5").forEach((el) => {
      const letters = el.textContent;
      if (!letters) return;
      el.innerHTML = "";
      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.justifyContent = "center";
      container.style.alignItems = "center";
      container.style.flexWrap = "nowrap";
      container.style.width = "100%";
      letters.split("").forEach((letter) => {
        const span = document.createElement("span");
        span.className = "a";
        span.textContent = letter;
        el.appendChild(span);
      });
      el.appendChild(container);
    });
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (!homeRef.current) return;
      const section = homeRef.current;
      const rect = section.getBoundingClientRect();
      const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (isInViewport) {
        section.style.height = '100vh';
      } else {
        section.style.height = '500px';
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.scrollTo(0, 0);
    if (homeRef.current) {
      homeRef.current.style.height = '100vh';
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [homeRef]);
  return (
    <section className="home" id="home" aria-labelledby="Home" ref={homeRef}>
      <video autoPlay loop muted playsInline className="video-background" aria-hidden="true" >
        <source src="/webm/Banner.webm" type="video/webm" />
      </video>
      <div className="max-width">
        <div className="home-content">
          <div className="text-1">
            Hallöchen,
            ich bin
          </div>
          <div>
            <div className="text-2">
              <h3>Tomakin</h3>
            </div>
            <div className="text-2">
              <h4>Mücahid</h4>
            </div>
            <div className="text-2">
              <h5>Emin</h5>
            </div>
          </div>
          <div className="buttonBlack">
            <a href="#contact">
              <span>Hire me</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}