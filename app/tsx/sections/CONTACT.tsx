"use client";
import { useEffect, useState, useRef } from "react";
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  dx: number;
  dy: number;
  color: string;
  lifetime: number;
  createdAt: number;
}
export function CONTACT() {
  const contactButtonRef = useRef<HTMLButtonElement>(null);
  const [isContactHovering, setIsContactHovering] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [copyFeedback, setCopyFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget as HTMLFormElement;
    setTimeout(() => {
      setShowSuccess(true);
      setIsSubmitting(false);
      setTimeout(() => {
        const iframe = document.createElement('iframe');
        iframe.name = 'formsubmit-frame';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        form.setAttribute('target', 'formsubmit-frame');
        const formData = new FormData(form);
        fetch(form.action, {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        }).finally(() => {
          setTimeout(() => {
            document.body.removeChild(iframe);
            form.reset();
            form.removeAttribute('target');
          }, 2000);
        });
      }, 2000);
    }, 500);
  };
  const handleCloseSuccess = () => {
    setShowSuccess(false);
    const form = document.querySelector('form') as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('me.tomakin00@gmail.com');
      setCopyFeedback('Email kopiert!');
      setTimeout(() => setCopyFeedback(''), 2000);
    } catch {
      setCopyFeedback('Fehler beim Kopieren');
      setTimeout(() => setCopyFeedback(''), 2000);
    }
  };
  useEffect(() => {
    if (!contactButtonRef.current) return;
    const button = contactButtonRef.current;
    const handleMouseEnter = () => setIsContactHovering(true);
    const handleMouseLeave = () => setIsContactHovering(false);
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [contactButtonRef]);
  useEffect(() => {
    const randomColor = () => {
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 100%, 60%)`;
    };
    let interval: NodeJS.Timeout;
    if (isContactHovering && contactButtonRef.current) {
      interval = setInterval(() => {
        const rect = contactButtonRef.current!.getBoundingClientRect();
        const newStars: Star[] = Array.from({ length: 3 }).map((_, i) => {
          const angle = Math.random() * 2 * Math.PI;
          const distance = Math.random() * 66 + 11;
          const baseLifetime = 1111;
          const variance = 0.2;
          const lifetime = baseLifetime * (1 + (Math.random() * 2 - 1) * variance);
          return {
            id: i + Date.now(),
            x: rect.width / 2,
            y: rect.height / 2,
            size: Math.random() > 0.5 ? 10 : 6,
            dx: Math.cos(angle) * distance,
            dy: Math.sin(angle) * distance,
            color: randomColor(),
            lifetime,
            createdAt: Date.now(),
          };
        });
        setStars((prev) => [...prev, ...newStars]);
      }, 444);
    }
    return () => clearInterval(interval);
  }, [isContactHovering, contactButtonRef]);
  useEffect(() => {
    let animationId: number;
    const tick = () => {
      const now = Date.now();
      setStars((prev) =>
        prev.filter((star) => now - star.createdAt < star.lifetime)
      );
      animationId = requestAnimationFrame(tick);
    };
    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, []);
  return (
    <section className="contact" id="contact" aria-labelledby="Contact me">
      <div className="max-width">
        <h2 className="title" id="animated">
          Contact me
        </h2>
        <div className="contact-content">
          <div className="column left">
            <div className="text reveal fade-bottom">
              Verlieren wir nicht den Kontakt
            </div>
            <p className="reveal fade-right">
              Melde dich gerne – ich freue mich auf den Austausch ✍️
              <br />
              Füll dazu das Formular aus und klick auf{" "}
              <a href="#submit" className="neonred">
                <b className="glow-on-hover">Send message</b>
              </a>{" "}
              <br />
              <br />
              <em>
                <b>
                  &apos;Wer sich selbst recht kennt,<br />kann sehr bald alle anderen Menschen kennenlernen.&apos;
                </b>
                &nbsp;🤗
              </em>{" "}
              <br />
              <span className="quote-author">
                <em>~Georg Christoph Lichtenberg~</em>
              </span>
            </p>
            <div className="icons reveal fade-left" id="icon">
              <ul>
                <li className="contact-item">
                  <div className="row">
                    <div onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} >
                      <a href="#" aria-label="Name" >
                        <i className="fas fa-user-graduate" />
                      </a>
                    </div>
                    <div className="info">
                      <div className="head">
                        &nbsp;&nbsp;<b>Name</b>
                      </div>
                      <div className="sub-title">
                        &nbsp;&nbsp;Tomakin Mücahid Emin
                      </div>
                    </div>
                  </div>
                </li>
                <li className="contact-item" id="map">
                  <div className="row">
                    <div onClick={() => { window.open('https://maps.google.com/?q=1220+Wien,+Austria', '_blank', 'noopener,noreferrer'); }} >
                      <a href="#" aria-label="Address" >
                        <i className="fas fa-map-marked-alt" />
                      </a>
                    </div>
                    <div className="info">
                      <div className="head">
                        <b>Address</b>
                      </div>
                      <div className="sub-title">1220 Wien, Austria</div>
                    </div>
                  </div>
                </li>
                <li className="contact-item" id="mail">
                  <div className="row">
                    <div onClick={(e) => { e.preventDefault(); handleCopyEmail(); }} >
                      <a href="#" aria-label="Email" >
                        <i className="fas fa-mail-bulk" />
                      </a>
                    </div>
                    {copyFeedback && ( <div className="copy-feedback"> {copyFeedback} </div> )}
                    <div className="info">
                      <div className="head">
                        <b>Email</b>
                      </div>
                      <div className="sub-title">me.tomakin00@gmail.com</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="column right reveal fade-bottom">
            <form
              action="https://formsubmit.co/a5fd78814a0b8ca5f27b74b66764dd82"
              method="POST"
              noValidate
              onSubmit={handleContactSubmit}>
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="box" />
              <input type="hidden" name="_next" value="about:blank" />
              <div className="text">Message me</div>
              <div className="fields">
                <div className="field name">
                  <input name="NAME" type="text" placeholder="Name" required minLength={2} maxLength={50} autoComplete="name" />
                </div>
                <div className="field">
                  <input name="SUBJECT" type="text" placeholder="Subject" required minLength={3} maxLength={100} autoComplete="off" />
                </div>
              </div>
              <div className="field email">
                <input name="E-MAIL" type="email" placeholder="Email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" autoComplete="email" />
              </div>
              <div className="field textarea">
                <textarea name="MESSAGE" cols={30} rows={6} placeholder="Message.." required minLength={10} maxLength={1000} autoComplete="off" defaultValue={""} />
              </div>   
              <div className="button-area">
                <button id="submit" ref={contactButtonRef} type="submit" disabled={isSubmitting || showSuccess}>
                  {isSubmitting ? "Sending..." : "Send message"}
                </button>
                <div className="star-particles-overlay">
                  {stars.map((star) => {
                    const now = Date.now();
                    const age = now - star.createdAt;
                    const progress = age / star.lifetime;
                    const calculateOpacity = (progress: number) => {
                      if (progress < 0.3) {
                        return progress / 0.3;
                      } else if (progress > 0.7) {
                        return 1 - (progress - 0.7) / 0.3;
                      }
                      return 1;
                    };
                    return (
                      <div
                        key={star.id}
                        className="star-particle"
                        style={{
                          '--star-size': `${star.size}px`,
                          '--star-dx': `${star.dx}px`,
                          '--star-dy': `${star.dy}px`,
                          '--star-color': star.color,
                          '--star-opacity': calculateOpacity(progress),
                          '--star-scale': 1 + progress * 0.5,
                        } as React.CSSProperties}
                      />
                    );
                  })}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showSuccess && (
        <>
          <div className="success-overlay">
            <div className="success-message">
              <div className="success-check">✓</div>
              <p className="success-title">🥳 Suppi! 🎉</p>
              <p className="success-text">Deine Nachricht sollte bei mir bald ankommen 🚀<br/>Ich antworte dir so schnell wie möglich!<br/>Bis bald in deinem Postfach 🙃</p>
              <button className="success-button" onClick={handleCloseSuccess} >
                Alles klar 👍
              </button>
            </div>
          </div>
          <div className="page-blur"></div>
        </>
      )}
    </section>
  );
}