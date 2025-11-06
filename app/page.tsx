"use client";
import { useEffect } from "react";
import { HOME } from "./tsx/sections/HOME";
import { ABOUT } from "./tsx/sections/ABOUT";
import { PROJECTS } from "./tsx/sections/PROJECTS";
import { SKILLS } from "./tsx/sections/SKILLS";
import { CAREER } from "./tsx/sections/CAREER";
import { CONTACT } from "./tsx/sections/CONTACT";
export default function Page() {
  useEffect(() => {
    const initObservers = () => {
      const revealElements = document.querySelectorAll(".reveal");
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio >= 0.01) {
              entry.target.classList.add("active");
            }
          });
        },
        { threshold: [0, 0.01], rootMargin: "-1% 0px -1% 0px" }
      );
      revealElements.forEach((el) => revealObserver.observe(el));
      const sections = document.querySelectorAll("section");
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("section-active");
              
              sections.forEach(section => {
                if (section !== entry.target) {
                  section.classList.remove("section-active");
                }
              });
            }
          });
        },
        { 
          threshold: 0.3,
          rootMargin: "0px 0px -10% 0px"
        }
      );
      sections.forEach((section) => sectionObserver.observe(section));
      return () => {
        revealElements.forEach((el) => revealObserver.unobserve(el));
        sections.forEach((section) => sectionObserver.unobserve(section));
      };
    };
    const timer = setTimeout(initObservers, 100);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <HOME />
      <ABOUT />
      <PROJECTS />
      <SKILLS />
      <CAREER />
      <CONTACT />
    </>
  );
}