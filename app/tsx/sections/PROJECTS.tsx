import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ESPigurator from "@/public/webp/ESPigurator.webp";
import Spioboter from "@/public/webp/Spioboter.webp";
import Kingfolio from "@/public/webp/Kingfolio.webp";
import ArchLinux from "@/public/webp/ArchLinux.webp";
import UnrealEngine from "@/public/webp/UnrealEngine.webp";
import KIP from "@/public/webp/KommunalInvestitionsProgramm-KIP-2025.webp";
import AutomationAnywhere from "@/public/webp/AutomationAnywhere.webp";
export function PROJECTS() {
  const appRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (document.querySelector('script[src="/js/scrollDist.js"]')) {
        return;
      }
      const script = document.createElement('script');
      script.src = '/js/scrollDist.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('ScrollDist loaded');
      };
      document.body.appendChild(script);
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);
  const [showPDF, setShowPDF] = useState(false);
  const handleClosePDF = () => {
    setShowPDF(false);
  };
  useEffect(() => {
    if (showPDF) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPDF]);
  useEffect(() => {
    const handleOpenPDF = () => {
      setShowPDF(true);
    };

    window.addEventListener('openPDF', handleOpenPDF);
    
    return () => {
      window.removeEventListener('openPDF', handleOpenPDF);
    };
  }, []);
  useEffect(() => {
    const html = document.documentElement;
    if (showPDF) {
      document.body.style.overflow = 'hidden';
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'hidden';
      document.body.classList.add('show-pdf');
      html.style.overflow = 'hidden';
      html.style.overflowX = 'hidden';
      html.style.overflowY = 'hidden';
      html.classList.add('show-pdf');
    } else {
      document.body.style.overflow = '';
      document.body.style.overflowX = '';
      document.body.style.overflowY = '';
      document.body.classList.remove('show-pdf');
      html.style.overflow = '';
      html.style.overflowX = '';
      html.style.overflowY = '';
      html.classList.remove('show-pdf');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.overflowX = '';
      document.body.style.overflowY = '';
      document.body.classList.remove('show-pdf');
      html.style.overflow = '';
      html.style.overflowX = '';
      html.style.overflowY = '';
      html.classList.remove('show-pdf');
    };
  }, [showPDF]);
  return (
    <section className="projects" id="projects" aria-labelledby="My Projects">
      <svg className="svg-container" style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="turbulent-displace" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>
      <video autoPlay loop muted playsInline className="video-background" aria-hidden="true" >
        <source src="/webm/Banner.webm" type="video/webm" />
      </video>
      <div className="projects-title-section">
        <div className="max-width">
          <h2 className="title">My Projects</h2>
        </div>
      </div>
      <div className="projects-animation-section">
        <div className="projects-scroll-container">
          <div className="projects-sticky-section">
            <div className="projects-inner-scroll">
              <div id="scrollDist" aria-hidden="true"></div>
              <div id="app" ref={appRef}>
                <svg id="headlines" fill="none" stroke="#fff" strokeWidth="3" viewBox="0 0 586 150" aria-labelledby="SVG Titel" role="img">
                  <g id="txt1">
                    <path d="M40.2,16.9c-5,0-9.1,1-12.3,3.1S23,25.1,23,29.3c0,4.1,1.6,7.3,4.8,9.5s10,4.6,20.5,7.1 c10.5,2.5,18.3,6.1,23.7,10.7c5.3,4.6,8,11.3,8,20.2c0,8.9-3.4,16.1-10.1,21.7c-6.7,5.5-15.5,8.3-26.4,8.3 c-16,0-30.1-5.5-42.5-16.5l10.8-13c10.3,9,21,13.4,32.1,13.4c5.5,0,10-1.2,13.2-3.6c3.3-2.4,4.9-5.5,4.9-9.5s-1.5-7-4.6-9.2 s-8.3-4.2-15.8-6c-7.5-1.8-13.2-3.5-17.1-5c-3.9-1.5-7.4-3.5-10.4-5.9c-6-4.6-9.1-11.6-9.1-21c0-9.4,3.4-16.7,10.3-21.8 C22.2,3.6,30.7,1,40.9,1c6.5,0,13,1.1,19.4,3.2c6.4,2.1,12,5.2,16.6,9.1l-9.2,13c-3-2.7-7.1-5-12.3-6.7 C50.3,17.8,45.2,16.9,40.2,16.9z" />
                    <path d="M147.9,89.9c5.9,0,11-1,15.3-3c4.3-2,8.8-5.2,13.4-9.6l11.1,11.4c-10.8,12-23.9,18-39.3,18 c-15.4,0-28.2-5-38.4-14.9c-10.2-9.9-15.3-22.5-15.3-37.7s5.2-27.8,15.5-38C120.6,6.1,133.7,1,149.6,1c15.8,0,29,5.8,39.6,17.5 l-11,12c-4.9-4.7-9.5-7.9-13.8-9.8c-4.3-1.8-9.4-2.8-15.3-2.8c-10.3,0-19,3.3-26,10c-7,6.7-10.5,15.2-10.5,25.6 c0,10.4,3.5,19,10.4,26C130.1,86.4,138.3,89.9,147.9,89.9z" />
                    <path d="M290.2,36.6c0,16.8-7.3,27.4-22,31.8l26.7,37.1H273l-24.4-34.3H226v34.3h-17.2V3.5h38 c15.6,0,26.7,2.6,33.4,7.9C286.9,16.6,290.2,25,290.2,36.6z M267.3,51.1c3.5-3,5.3-7.9,5.3-14.5c0-6.7-1.8-11.2-5.4-13.7 c-3.6-2.5-10-3.7-19.3-3.7H226v36.5h21.5C257.2,55.6,263.8,54.1,267.3,51.1z" />
                    <path d="M400.5,91.4c-10.3,10.1-23.1,15.1-38.3,15.1c-15.2,0-27.9-5-38.3-15.1c-10.3-10.1-15.5-22.6-15.5-37.7 s5.2-27.6,15.5-37.7C334.3,6,347,1,362.2,1c15.2,0,27.9,5,38.3,15.1c10.3,10.1,15.5,22.6,15.5,37.7S410.8,81.4,400.5,91.4z  M387.8,27.6c-7-7.2-15.5-10.8-25.6-10.8c-10.1,0-18.7,3.6-25.6,10.8c-7,7.2-10.4,15.9-10.4,26.2c0,10.3,3.5,19,10.4,26.2 c7,7.2,15.5,10.8,25.6,10.8c10.1,0,18.7-3.6,25.6-10.8c7-7.2,10.4-15.9,10.4-26.2C398.3,43.5,394.8,34.8,387.8,27.6z" />
                    <path d="M437.7,105.5V3.5h17.2v85.7h46.6v16.4H437.7z" />
                    <path d="M520.3,105.5V3.5h17.2v85.7h46.6v16.4H520.3z" />
                  </g>
                  <g id="txt2">
                    <path d="M210.7,1v16.2h-54.5v27h48.9v15.3h-48.9v27.3h56.2v16.2H139V1H210.7z" />
                    <path d="M311,1h17.2v102.1h-18.7l-57.8-74.5v74.5h-17.2V1h17.2L311,77.2V1z" />
                    <path d="M433.8,14.4c9.8,8.9,14.7,21.3,14.7,37.2c0,15.9-4.8,28.4-14.3,37.7c-9.5,9.2-24.1,13.9-43.8,13.9h-33.9V1h35 C409.9,1,423.9,5.5,433.8,14.4z M431.1,52c0-23.4-13.4-35-40.1-35h-17.2v69.9h19.1c12.4,0,21.8-2.9,28.4-8.8 C427.9,72.1,431.1,63.4,431.1,52z" />
                  </g>
                </svg>
                <div id="imgGroup">
                  <Image src={ESPigurator} data-x="0" data-y="0" data-caption="Diplomarbeit - ESPigurator" alt="ESP32-Herzschlag, WiFi-Nervensystem, 3D-gedrucktes Skelett - eine Woche, vier Entwickler, unendliche Möglichkeiten der Robotik erkundet." />
                  <Image src={Spioboter} data-x="0" data-y="0" data-caption="Robotic Project" alt="ESP32-Herzschlag, WiFi-Nervensystem, 3D-gedrucktes Skelett - eine Woche, vier Entwickler, unendliche Möglichkeiten der Robotik erkundet." />
                  <Image src={Kingfolio} data-x="0" data-y="0" data-caption="Nextjs Website" alt="Wo CSS-Animationen tanzen und React-Komponenten lebendig werden - ein immersives Tech-Portfolio als Symphonie aus Code und Kreativität." />
                  <Image src={ArchLinux} data-x="0" data-y="0" data-caption="Arch Linux" alt="Arch Linux ... nicht installiert, sondern komponiert. Jede Zeile Code, jedes Package, ein bewusster Pinselstrich auf dem Canvas des Systems." />
                  <Image src={UnrealEngine} data-x="0" data-y="0" data-caption="Game-Development" alt="Wo Schatten flüstern und jede Textur Gänsehaut erzeugt. Vom ersten Blueprint zum gruseligen Gameplay - eine Reise wo jeder Light Bake und Sound cue pure Angst Atmosphäre schafft, durch die Abgründe der Spieleprogrammierung." />
                  <Image src={KIP} data-x="0" data-y="0" data-caption="KIP 2025" alt="Mein Beitrag zur digitalen Transformation Österreichs ... Im KIP 2025 mitgewirkt, wo Zukunft nicht nur geplant, sondern gebaut wird." />
                  <Image src={AutomationAnywhere} data-x="0" data-y="0" data-caption="RPA-Development" alt="Automatisierung im Enterprise-Maßstab: Python-Skripte, VBS-Legacy Integration und RPA-Lösungen die Business-Prozesse revolutionieren." />
                </div>
                <div id="detail" aria-live="polite">
                  <div id="detailImg"></div>
                  <div id="detailTxt"></div>
                </div>
                <svg width="100%" height="100%" fill="none" stroke="#fff" aria-hidden="true">
                  <g id="cursor">
                    <circle id="cursorCircle" cx="0" cy="0" r="12" strokeWidth="3" />
                    <path id="cursorClose" d="M-25,-25 L25,25 M-25,25 L25,-25" opacity="0" strokeWidth="3.5" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPDF && (
        <>
          <div className="pdf-overlay">
            <div className="pdf-popup rainbowcard rainbowGlow">
              <iframe src="/pdf/ESPigurator.pdf" className="pdf-iframe" title="ESPigurator PDF" />
              <button className="pdf-close-btn" onClick={handleClosePDF}>
                ✕
              </button>
            </div>
          </div>
          <div className="pdf-blur"></div>
        </>
      )}
    </section>
  );
}