"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import Signature from "@/public/webp/Signature.webp";
export default function NotFound() {
  const [stars, setStars] = useState<Array<{id: number, top: number, left: number, size: number}>>([]);
  useEffect(() => {
    const generatedStars = [];
    for (let i = 0; i < 66; i++) {
      generatedStars.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100, 
        size: 1 + Math.random() * 4
      });
    }
    setStars(generatedStars);
  }, []);
  return (
    <div className="not-found-page">
      <div className="container container-star">
        {stars.map((star) => (
          <div key={star.id} className={star.id < 66 ? "star-1" : "star-2"}
            style={{
              top: `${star.top}vh`,
              left: `${star.left}vw`,
              width: `${star.size}px`,
              height: star.id < 66 ? `${star.size/3}px` : `${star.size}px`
            }} />
        ))}
      </div>
      <video autoPlay loop muted playsInline className="video-background" aria-hidden="true">
        <source src="/webm/Banner.webm" type="video/webm" />
      </video>
      <div className="container container-bird">
        {[...Array(6)].map((_, i) => (
          <div key={`bird-${i}`} className={`bird bird-anim`}>
            <div className="bird-container">
              <div className="wing wing-left">
                <div className="wing-left-top"></div>
              </div>
              <div className="wing wing-right">
                <div className="wing-right-top"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container-title">
        <div className="title">
          <div className="number">
            <div className="error">4</div>
          </div>
          <div className="moon">
            <div className="face">
              <div className="mouth"></div>
              <div className="eyes">
                <div className="eye-left"></div>
                <div className="eye-right"></div>
              </div>
            </div>
          </div>
          <div className="number">
            <div className="error">4</div>
          </div>
        </div>
        <div className="subtitle">
          <span className="info">Oops. Looks like you took a wrong turn.</span>
        </div>
      </div>
      <footer className="not-found-footer">
        <div>
          <ul className="footer-list">
            <li>&nbsp;Created By&nbsp;&nbsp;</li>
            <li>
              <Link href="/#home">
                <Image 
                  src={Signature.src} 
                  alt="Logo" 
                  width={0} 
                  height={0} 
                  sizes="100vw" 
                  loading="lazy" 
                />
              </Link>
            </li>
            <li>&nbsp;|&nbsp;&nbsp;</li>
            <li className="far fa-copyright" id="copyright" />
            <li>&nbsp;&nbsp;2021 All rights reserved.&nbsp;</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}