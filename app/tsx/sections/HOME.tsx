"use client";
import { useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaCodepen, FaTwitter, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
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
        section.style.height = '100dvh';
      } else {
        section.style.height = '500px';
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.scrollTo(0, 0);
    if (homeRef.current) {
      homeRef.current.style.height = '100dvh';
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [homeRef]);
  const socialLinks = [
    { icon: <FaLinkedin />, href: "https://linkedin.com/in/mücahid-emin-tomakin-027576272", label: "LinkedIn" },
    { icon: <FaGithub />, href: "https://github.com/mucahid-emin-tomakin", label: "GitHub" },
    { icon: <FaCodepen />, href: "https://codepen.io/mucahid-emin-tomakin", label: "CodePen" },
    { icon: <FaFacebook />, href: "https://facebook.com/share/1BWPsCoCzG/?mibextid=wwXIfr", label: "Facebook" },
    { icon: <FaTwitter />, href: "https://x.com/mucahid_tomakin", label: "Twitter" },
    { icon: <FaInstagram />, href: "https://instagram.com/mucahid.emin.tomakin", label: "Instagram" },
    { icon: <FaTiktok />, href: "https://tiktok.com/@mucahid.emin.tomakin", label: "TikTok" }
  ];
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
          <div className="home-actions">
            <div className="buttonBlack">
              <a href="#contact">
                <span>Hire me</span>
              </a>
            </div>
            <div className="social-icons">
              <ul>
                {socialLinks.map((social, index) => (
                  <li key={index}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Social Media ${index + 1}`}>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span>{social.icon}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}