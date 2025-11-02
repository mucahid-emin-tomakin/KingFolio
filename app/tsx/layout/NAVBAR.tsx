'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function NAVBAR() {
  const [navOpen, setNavOpen] = useState(false);
  useEffect(() => {
    const body = document.body;
    body.classList.toggle('nav-active', navOpen);
    return () => body.classList.remove('nav-active');
  }, [navOpen]);
  const toggleNav = () => setNavOpen(v => !v);
  const closeNav = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    setNavOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };
  return (
    <>
      <header className="cd-header">
        <div className="header-wrapper">
          <div className="logo">
            <Link className="hover-target" id="logoBlack" style={{ fontFamily: '"BlackChancery", sans-serif', fontSize: 50 }} href="/" onClick={(e) => closeNav(e, 'home')}>K</Link>
            <Link className="hover-target" id="logoBlack" href="/" onClick={(e) => closeNav(e, 'home')}>ing<span>folio</span></Link>
          </div>
          <div className="nav-but-wrap">
            <div className="menu-icon hover-target" onClick={toggleNav}>
              <span className="menu-icon__line menu-icon__line-left" />
              <span className="menu-icon__line" />
              <span className="menu-icon__line menu-icon__line-right" />
            </div>
          </div>
        </div>
      </header>
      <nav className="nav">
        <div className="nav__content">
          <ul className="nav__list">
            <li className="nav__list-item active-nav">
              <Link href="/" className="hover-target" onClick={(e) => closeNav(e, 'home')}>Home</Link>
            </li>
            <li className="nav__list-item">
              <Link href="/" className="hover-target" onClick={(e) => closeNav(e, 'about')}>About me</Link>
            </li>
            <li className="nav__list-item">
              <Link href="/" className="hover-target" onClick={(e) => closeNav(e, 'projects')}>My Projects</Link>
            </li>
            <li className="nav__list-item">
              <Link href="/" className="hover-target" onClick={(e) => closeNav(e, 'skills')}>My Skills</Link>
            </li>
            <li className="nav__list-item">
              <Link href="/" className="hover-target" onClick={(e) => closeNav(e, 'mycareer')}>My Career Journey</Link>
            </li>
            <li className="nav__list-item">
              <Link href="/" className="hover-target" onClick={(e) => closeNav(e, 'contact')}>Contact me</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}