"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image, { StaticImageData } from "next/image";
import PizzaKing from "@/public/webp/PIZZA KING KG.webp";
import EKOL from "@/public/webp/EKOL Elektroinstallation KG.webp";
import Bundesheer from "@/public/webp/Österreichische Bundesheer.webp";
import FüUS from "@/public/webp/Führungsunterstützungsschule.webp";
import Maarif from "@/public/webp/Maarif Educational Institutions gGmbH.webp";
import M3 from "@/public/webp/MMM Multi-Media-Marketing GmbH.webp";
import ServiceCenter from "@/public/webp/s ServiceCenter GmbH.webp";
import Hofer from "@/public/webp/HOFER KG.webp";
import Post from "@/public/webp/Österreichische Post AG.webp";
import BHAG from "@/public/webp/Buchhaltungsagentur des Bundes.webp";
import Vakif from "@/public/webp/Verein für Geschwisterlichkeit und Wohlfahrt - Kardeslik ve Hizmet Dernegi.webp";
interface LogoData {
  src: StaticImageData;
  width: number;
  height: number;
  asciiArt: string;
  name: string;
}
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  life: number;
}
export function CAREER() {
  const [logosData, setLogosData] = useState<LogoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const originalLogos = useMemo(() => [
    { src: PizzaKing, name: "PizzaKing" },
    { src: EKOL, name: "EKOL" },
    { src: Bundesheer, name: "Bundesheer" },
    { src: FüUS, name: "FüUS" },
    { src: Maarif, name: "Maarif" },
    { src: M3, name: "M3" },
    { src: ServiceCenter, name: "ServiceCenter" },
    { src: Hofer, name: "Hofer" },
    { src: Post, name: "Post" },
    { src: BHAG, name: "BHAG" },
    { src: Vakif, name: "Vakif" }
  ], []);
  const speedSettings = {
    scrollSpeed: 40,
    particleSpeed: 0.016,
    scannerParticleSpeed: 0.8,
  };
  const particleScannerRef = useRef<InstanceType<typeof ParticleScanner> | null>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const scrollAnimationRef = useRef<number | undefined>(undefined);
  const asciiCache = useRef<Map<string, string>>(new Map());
  const slideTrackRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useRef(0);
  const scrollDirection = useRef(1);
  const generateDetailedAsciiArt = useCallback((img: HTMLImageElement, width: number, height: number, name: string): Promise<string> => {
    return new Promise((resolve) => {
      const cacheKey = `${name}-${width}-${height}`;
      if (asciiCache.current.has(cacheKey)) {
        resolve(asciiCache.current.get(cacheKey)!);
        return;
      }
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(generateDetailedFallbackAscii(name));
        return;
      }
      const targetWidth = 50;
      const aspectRatio = height / width;
      const asciiWidth = targetWidth;
      const asciiHeight = Math.max(20, Math.floor(targetWidth * aspectRatio * 0.6));
      canvas.width = asciiWidth;
      canvas.height = asciiHeight;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, asciiWidth, asciiHeight);
      ctx.drawImage(img, 0, 0, asciiWidth, asciiHeight);
      const imageData = ctx.getImageData(0, 0, asciiWidth, asciiHeight);
      const data = imageData.data;
      const asciiCharsets = {
        detailed: ["@", "#", "8", "&", "o", ":", "*", ".", " "],
        highContrast: ["@", "#", "S", "%", "?", "*", "+", ";", ":", ",", ".", " "],
        blocks: ["█", "▓", "▒", "░", " "],
        extended: ["@", "B", "%", "8", "&", "W", "M", "#", "m", "k", "h", "a", "s", "o", ":", "*", "=", "+", "!", "^", "~", "-", "_", ".", " "]
      };
      const charset = asciiCharsets.extended;
      let asciiArt = "";
      let minBrightness = 255;
      let maxBrightness = 0;
      for (let y = 0; y < asciiHeight; y++) {
        for (let x = 0; x < asciiWidth; x++) {
          const index = (y * asciiWidth + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          const a = data[index + 3] / 255;
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b) * a;
          minBrightness = Math.min(minBrightness, brightness);
          maxBrightness = Math.max(maxBrightness, brightness);
        }
      }
      const brightnessRange = maxBrightness - minBrightness;
      for (let y = 0; y < asciiHeight; y++) {
        for (let x = 0; x < asciiWidth; x++) {
          const index = (y * asciiWidth + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          const a = data[index + 3] / 255;
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b) * a;
          const normalizedBrightness = brightnessRange > 0 
            ? (brightness - minBrightness) / brightnessRange 
            : 0.5;
          const charIndex = Math.floor(normalizedBrightness * (charset.length - 1));
          asciiArt += charset[charset.length - 1 - charIndex];
        }
        asciiArt += "\n";
      }
      asciiCache.current.set(cacheKey, asciiArt);
      resolve(asciiArt);
    });
  }, []);
  const loadImageAndGenerateAscii = useCallback((imageSrc: StaticImageData, name: string): Promise<LogoData> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = imageSrc.src;
      img.onload = async () => {
        try {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
          const asciiArt = await generateDetailedAsciiArt(img, width, height, name);
          resolve({
            src: imageSrc,
            width,
            height,
            asciiArt,
            name
          });
        } catch {
          reject(new Error(`Fehler bei ${name}`));
        }
      };
      img.onerror = () => {
        reject(new Error(`Bild ${name} konnte nicht geladen werden`));
      };
      setTimeout(() => {
        if (!img.complete) {
          reject(new Error(`Timeout beim Laden von ${name}`));
        }
      }, 10000);
    });
  }, [generateDetailedAsciiArt]);
  useEffect(() => {
    const loadAllImages = async () => {
      setIsLoading(true);
      const loadedLogos: LogoData[] = [];
      for (const logo of originalLogos) {
        try {
          const logoData = await loadImageAndGenerateAscii(logo.src, logo.name);
          loadedLogos.push(logoData);
        } catch {
          loadedLogos.push({
            src: logo.src,
            width: 222,
            height: 111,
            asciiArt: generateDetailedFallbackAscii(logo.name),
            name: logo.name
          });
        }
      }
      setLogosData(loadedLogos);
      setIsLoading(false);
    };
    loadAllImages();
  }, [loadImageAndGenerateAscii, originalLogos]);
  const generateDetailedFallbackAscii = (name: string): string => {
    let seed = 0;
    for (let i = 0; i < name.length; i++) {
      seed += name.charCodeAt(i);
    }
    const width = 50;
    const height = 20;
    const chars = " .:-=+*#%@";
    let asciiArt = `${name}\n`;
    asciiArt += "=".repeat(width) + "\n";
    for (let y = 0; y < height; y++) {
      let line = "";
      for (let x = 0; x < width; x++) {
        const value = Math.sin(x * 0.2 + y * 0.3 + seed) * 0.4 + 
                     Math.cos(x * 0.15 - y * 0.25 + seed * 0.7) * 0.3 +
                     Math.sin((x + y) * 0.1) * 0.3;
        const normalized = (value + 1) / 2; // Normalize to 0-1
        const charIndex = Math.floor(normalized * (chars.length - 1));
        line += chars[charIndex];
      }
      asciiArt += line + "\n";
    }
    return asciiArt;
  };
  const initSmoothScroll = useMemo(() => () => {
    if (!slideTrackRef.current) return;
    const slideTrack = slideTrackRef.current;
    const totalWidth = slideTrack.scrollWidth;
    const animateScroll = () => {
      const speed = (totalWidth / speedSettings.scrollSpeed) / 60;
      scrollPosition.current += speed * scrollDirection.current;
      if (scrollPosition.current >= totalWidth / 2) {
        scrollPosition.current = -totalWidth / 2;
      } else if (scrollPosition.current <= -totalWidth / 2) {
        scrollPosition.current = totalWidth / 2;
      }
      slideTrack.style.transform = `translateX(${scrollPosition.current}px)`;
      scrollAnimationRef.current = requestAnimationFrame(animateScroll);
    };
    scrollPosition.current = 0;
    animateScroll();
  }, [speedSettings.scrollSpeed]);
  const calculateScannerPosition = (): number => {
      const slider = document.querySelector('.logo-slider') as HTMLElement;
      if (!slider) return window.innerWidth / 8;
      const sliderRect = slider.getBoundingClientRect();
      return sliderRect.left + (sliderRect.width / 8);
  };
  const ParticleScanner = useMemo(() => {
    return class ParticleScanner {
      private canvas: HTMLCanvasElement;
      private ctx: CanvasRenderingContext2D;
      private animationId: number | null = null;
      private w: number;
      private h: number;
      private particles: Particle[] = [];
      private count: number = 0;
      private maxParticles: number;
      private activeMaxParticles: number;
      private intensity: number = 0.8;
      private lightBarWidth: number = 11;
      private fadeZone: number = 60;
      private scanningActive: boolean = false;
      constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.w = window.innerWidth;
        this.h = 300;
        this.maxParticles = 333;
        this.activeMaxParticles = 1111;
        this.setupCanvas();
        this.initParticles();
        this.animate();
      }
      private setupCanvas() {
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.ctx.clearRect(0, 0, this.w, this.h);
      }
      private randomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
      }
      private createParticle() {
        const speedMultiplier = speedSettings.scannerParticleSpeed;
        const currentScannerX = calculateScannerPosition();
        return {
          x: currentScannerX + this.randomFloat(-this.lightBarWidth / 2, this.lightBarWidth / 2),
          y: this.randomFloat(0, this.h),
          vx: this.randomFloat(0.2, 1.0) * speedMultiplier,
          vy: this.randomFloat(-0.15, 0.15) * speedMultiplier,
          radius: this.randomFloat(0.4, 1),
          alpha: this.randomFloat(0.6, 1),
          decay: this.randomFloat(0.005, 0.025),
          life: 1.0,
        };
      }
      private initParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
          const particle = this.createParticle();
          this.count++;
          this.particles[this.count] = particle;
        }
      }
      private updateParticle(particle: Particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= particle.decay;
        if (particle.x > this.w + 10 || particle.life <= 0) {
          this.resetParticle(particle);
        }
      }
      private resetParticle(particle: Particle) {
        const currentScannerX = calculateScannerPosition();
        particle.x = currentScannerX + this.randomFloat(-this.lightBarWidth / 2, this.lightBarWidth / 2);
        particle.y = this.randomFloat(0, this.h);
        particle.vx = this.randomFloat(0.2, 1.0) * speedSettings.scannerParticleSpeed;
        particle.vy = this.randomFloat(-0.15, 0.15) * speedSettings.scannerParticleSpeed;
        particle.alpha = this.randomFloat(0.6, 1);
        particle.life = 1.0;
      }
      private drawParticle(particle: Particle) {
        if (particle.life <= 0) return;
        this.ctx.globalAlpha = particle.alpha * particle.life;
        this.ctx.fillStyle = "#FF4500";
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fill();
      }
      private drawLightBar() {
        this.ctx.globalCompositeOperation = "lighter";
        const currentScannerX = calculateScannerPosition();
        const gradient = this.ctx.createLinearGradient(
          currentScannerX - (this.lightBarWidth / 2), 0,
          currentScannerX + (this.lightBarWidth / 2), 0
        );
        gradient.addColorStop(0, "rgba(255,69,0,1)");
        gradient.addColorStop(0.3, "rgba(255,69,0,0.6)");
        gradient.addColorStop(0.5, "rgba(255,69,1)");
        gradient.addColorStop(0.7, "rgba(255,69,0,0.6)");
        gradient.addColorStop(1, "rgba(255,69,0,1)");
        this.ctx.fillStyle = gradient;
        const verticalGradient = this.ctx.createLinearGradient(0, 0, 0, this.h);
        verticalGradient.addColorStop(0, "rgba(255,69,0,1)");
        verticalGradient.addColorStop(0.1, "rgba(255,69,0,0.3)");
        verticalGradient.addColorStop(0.2, "rgba(255,69,0,0.8)");
        verticalGradient.addColorStop(0.8, "rgba(255,69,0,0.8)");
        verticalGradient.addColorStop(0.9, "rgba(255,69,0,0.3)");
        verticalGradient.addColorStop(1, "rgba(255,69,0,1)");
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.fillStyle = verticalGradient;
        this.ctx.fillRect(
          currentScannerX - (this.lightBarWidth / 2),
          0, 
          this.lightBarWidth,
          this.h
        );
      }
      private render() {
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.drawLightBar();
        this.ctx.globalCompositeOperation = "lighter";
        for (let i = 1; i <= this.count; i++) {
          if (this.particles[i]) {
            this.updateParticle(this.particles[i]);
            this.drawParticle(this.particles[i]);
          }
        }
        if (Math.random() < this.intensity && this.count < this.maxParticles) {
          const particle = this.createParticle();
          this.count++;
          this.particles[this.count] = particle;
        }
      }
      private animate() {
        this.render();
        this.animationId = requestAnimationFrame(() => this.animate());
      }
      public setScanningActive(active: boolean) {
        this.scanningActive = active;
        this.intensity = active ? 1.8 : 0.8;
        this.maxParticles = active ? 2500 : 800;
      }
      public onResize() {
        this.w = window.innerWidth;
        this.setupCanvas();
      }
      public destroy() {
        if (this.animationId) {
          cancelAnimationFrame(this.animationId);
        }
      }
      public setMaxParticles(newMax: number, newActiveMax?: number) {
        this.maxParticles = newMax;
        this.activeMaxParticles = newActiveMax || Math.floor(newMax * 3);
        if (this.count > this.maxParticles) {
          const excess = this.count - this.maxParticles;
          for (let i = 0; i < excess; i++) {
            if (this.particles[this.count]) {
              delete this.particles[this.count];
              this.count--;
            }
          }
        }
      }
    };
  }, [speedSettings.scannerParticleSpeed]);
  const initParticleSystem = useMemo(() => () => {
    const canvas = document.getElementById("particleCanvas") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = 250;
    const particles: Array<{x: number, y: number, speed: number, size: number}> = [];
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * window.innerWidth * 2,
        y: (Math.random() - 0.5) * 250,
        speed: (Math.random() * 30 + 15) * speedSettings.particleSpeed,
        size: Math.random() * 2 + 1
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.x += particle.speed;
        if (particle.x > window.innerWidth / 2 + 100) {
          particle.x = -window.innerWidth / 2 - 100;
          particle.y = (Math.random() - 0.5) * 250;
        }
        ctx.fillStyle = 'rgba(255, 69, 0, 0.4)';
        ctx.beginPath();
        ctx.arc(
          particle.x + canvas.width / 2, 
          particle.y + canvas.height / 2, 
          particle.size, 0, Math.PI * 2
        );
        ctx.fill();
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
  }, [speedSettings.particleSpeed]);
  const clippingAnimationRef = useRef<number | undefined>(undefined);
  const initCardClipping = useMemo(() => () => {
    const updateCardClipping = () => {
      const currentScannerX = calculateScannerPosition();
      const scannerWidth = 11;
      const scannerLeft = currentScannerX - (scannerWidth / 2);
      const scannerRight = currentScannerX + (scannerWidth / 2);
      let anyScanningActive = false;
      document.querySelectorAll(".logo-wrapper").forEach((wrapper) => {
        const rect = wrapper.getBoundingClientRect();
        const cardLeft = rect.left;
        const cardRight = rect.right;
        const cardWidth = rect.width;
        const normalLogo = wrapper.querySelector(".logo-normal") as HTMLElement;
        const asciiLogo = wrapper.querySelector(".logo-ascii") as HTMLElement;
        if (cardLeft < scannerRight && cardRight > scannerLeft) {
          anyScanningActive = true;
          const scannerCenter = currentScannerX;
          const scannerProgress = (scannerCenter - cardLeft) / cardWidth;
          const clipPosition = Math.max(0, Math.min(100, scannerProgress * 100));
          if (normalLogo) {
            normalLogo.style.clipPath = `inset(0 0 0 ${clipPosition}%)`;
            normalLogo.style.transition = 'clip-path 0s linear';
          }
          if (asciiLogo) {
            asciiLogo.style.clipPath = `inset(0 ${100 - clipPosition}% 0 0)`;
            asciiLogo.style.transition = 'clip-path 0s linear';
          }
          if (!wrapper.hasAttribute("data-scanned") && scannerProgress > 0.1) {
            wrapper.setAttribute("data-scanned", "true");
            const scanEffect = document.createElement("div");
            scanEffect.className = "scan-effect";
            wrapper.appendChild(scanEffect);
            setTimeout(() => scanEffect.remove(), 600);
          }
        } else {
          if (cardRight <= scannerLeft) {
            if (normalLogo) normalLogo.style.clipPath = "inset(0 0 0 100%)";
            if (asciiLogo) asciiLogo.style.clipPath = "inset(0 0 0 0)";
          } else if (cardLeft >= scannerRight) {
            if (normalLogo) normalLogo.style.clipPath = "inset(0 0 0 0)";
            if (asciiLogo) asciiLogo.style.clipPath = "inset(0 100% 0 0)";
          }
          wrapper.removeAttribute("data-scanned");
        }
      });
      if (particleScannerRef.current) {
        particleScannerRef.current.setScanningActive(anyScanningActive);
      }
    };
    const clippingLoop = () => {
      updateCardClipping();
      clippingAnimationRef.current = requestAnimationFrame(clippingLoop);
    };
    clippingLoop();
  }, []);
  useEffect(() => {
    if (isLoading || logosData.length === 0) return;
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        initParticleSystem();
      }, 100);
    }
    const scannerCanvas = document.getElementById("scannerCanvas") as HTMLCanvasElement;
    if (scannerCanvas) {
      particleScannerRef.current = new ParticleScanner(scannerCanvas);
    }
    setTimeout(() => {
      initSmoothScroll();
    }, 100);
    initCardClipping();
    let frameCount = 0;
    let lastTime = performance.now();
    let currentMaxParticles = 200;
    let currentActiveMaxParticles = 600;
    let performanceIssueCount = 0;
    const checkPerformance = () => {
      frameCount++;
      const currentTime = performance.now();
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        if (fps < 50) {
          performanceIssueCount++;
          currentMaxParticles = Math.max(30, Math.floor(currentMaxParticles * 0.7));
          currentActiveMaxParticles = Math.max(90, Math.floor(currentActiveMaxParticles * 0.7));
          if (particleScannerRef.current) {
            particleScannerRef.current.setMaxParticles(currentMaxParticles, currentActiveMaxParticles);
          }
        } else if (fps > 58 && performanceIssueCount > 0 && currentMaxParticles < 200) {
          performanceIssueCount = Math.max(0, performanceIssueCount - 1);
          currentMaxParticles = Math.min(200, Math.floor(currentMaxParticles * 1.1));
          currentActiveMaxParticles = Math.min(600, Math.floor(currentActiveMaxParticles * 1.1));
          if (particleScannerRef.current) {
            particleScannerRef.current.setMaxParticles(currentMaxParticles, currentActiveMaxParticles);
          }
        }
        frameCount = 0;
        lastTime = currentTime;
      }
      requestAnimationFrame(checkPerformance);
    };
    checkPerformance();
    const handleResize = () => {
      if (particleScannerRef.current) {
        particleScannerRef.current.onResize();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {cancelAnimationFrame(animationRef.current);}
      if (scrollAnimationRef.current) {cancelAnimationFrame(scrollAnimationRef.current);}
      if (clippingAnimationRef.current) cancelAnimationFrame(clippingAnimationRef.current);
      if (particleScannerRef.current) {
        particleScannerRef.current.destroy();
      }
    };
  }, [isLoading, logosData.length, ParticleScanner, initCardClipping, initParticleSystem, initSmoothScroll]);
  if (isLoading) {
    return (
      <section className="career" id="mycareer" aria-labelledby="My Career Journey">
        <h2 className="title">
          My Career Journey
        </h2>
        <div className="loading" aria-live="polite">Loading Images & Generating Detailed ASCII Art...</div>
      </section>
    );
  }
  const repeatedLogos = [...logosData, ...logosData, ...logosData];
  return (
    <section className="career" id="mycareer" aria-labelledby="My Career Journey">
      <video autoPlay loop muted playsInline className="video-background" aria-hidden="true" >
        <source src="/webm/Banner.webm" type="video/webm" />
      </video>
      <h2 className="title">
        My Career Journey
      </h2>
      <div className="logo-slider rtl" aria-label="My Career Journey als animierter Slider mit den Logos" role="region">
        <canvas id="particleCanvas" className="particle-layer"></canvas>
        <canvas id="scannerCanvas" className="scanner-layer"></canvas>
        <div className="slide-track" ref={slideTrackRef}>
          {repeatedLogos.map((logo, i) => (
            <div className="slide" key={`rtl-${i}-${logo.name}`}>
              <div className="logo-wrapper">
                <div className="logo-normal">
                  <Image src={logo.src} alt={`Firmenlogo ${logo.name} - My Career Journey`} width={logo.width} height={logo.height}/>
                </div>
                <div className="logo-ascii" aria-hidden="true">
                  <canvas className="ascii-canvas" width={150} height={60} ref={(el) => {
                    if (el) {
                      const ctx = el.getContext('2d');
                      if (ctx) {
                        ctx.clearRect(0, 0, 150, 60);
                        ctx.font = '4px "Courier New"';
                        ctx.fillStyle = 'red';
                        ctx.textBaseline = 'top';
                        const lines = logo.asciiArt.split('\n');
                        lines.forEach((line, y) => {
                          ctx.fillText(line, 0, y * 4);
                        });
                      }
                    }
                  }}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}