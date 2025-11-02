function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
function initScrollDist() {
  const appElement = document.getElementById('app');
  if (!appElement) {
    setTimeout(initScrollDist, 100);
    return;
  }
  if (appElement.dataset.initialized) {
    return;
  }
  appElement.dataset.initialized = "true";
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.trigger === '.projects') {
      trigger.kill();
    }
  });
  function initSVGPaths() {
    document.querySelectorAll('#txt1 path, #txt2 path').forEach(path => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });
  }
  initSVGPaths();
  gsap.set("#scrollDist", {
    width: "100%",
    height: "100vh"
  });
  gsap.set("#app, #imgGroup", {
    opacity: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    perspective: 333
  });
  gsap.set("#app img", {
    position: "absolute",
    attr: {
      id: (i, t, a) => {
        initImg(i, t);
        return "img" + i;
      }
    }
  });
  gsap.set("#txt1", { 
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transformOrigin: "center center"
  });
  gsap.set("#txt2", { 
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transformOrigin: "center center"
  });
  const timeline = gsap.timeline({
    defaults: { duration: 1 },
    onUpdate: () => {
      if (gsap.getProperty("#cursorClose", "opacity") == 1) closeDetail();
    }
  })
  .to(
    ".projects-title-section", 
    {
      duration: 0.8,
      opacity: 0,
      ease: "power2.out"
    }, 
    0
  )
  .fromTo(
    "#txt1",
    { scale: 0.6, transformOrigin: "50% 50%" },
    { scale: 1, ease: "power1.in" },
    0.3
  )
  .to(
    "#txt1 path",
    { 
      duration: 0.6, 
      strokeDashoffset: 0,
      stagger: 0.05, 
      ease: "power1.in" 
    },
    0.3
  )
  .to(
    "#txt1",
    { 
      duration: 0.6, 
      opacity: 0, 
      ease: "power2.out" 
    },
    0.9
  );
  timeline.to(".imgBox, .imgBox img, .image-caption", {
    duration: 0,
    opacity: 1
  }, 0.85);
  const imageWrappers = document.querySelectorAll('.image-wrapper');
  const totalImages = imageWrappers.length;
  const baseDelay = 0.9;
  const delayPerImage = 0.55;
  imageWrappers.forEach((wrapper, index) => {
    const delay = baseDelay + (index * delayPerImage);
    timeline
      .fromTo(wrapper,
        { z: -5000, opacity: 0 },
        { z: 350, opacity: 1.2, duration: 0.8, ease: "none" },
        delay
      )
      .fromTo(wrapper.querySelector('.imgBox img'),
        { scale: 0.1, opacity: 0, filter: "blur(66px)" },
        { scale: 1.15, opacity: 1.2, duration: 0.8, ease: "power2.out", filter: "blur(0px)" },
        delay
      )
      .fromTo(wrapper.querySelector('.image-caption'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        delay + 0.2
      )
      .to(wrapper.querySelector('.imgBox'),
        { duration: 0, pointerEvents: "auto" },
        delay + 0.3
      )
      .to(wrapper.querySelector('.imgBox img'),
        { duration: 0.3, opacity: 0, ease: "expo.inOut" },
        delay + 0.63
      )
      .to(wrapper.querySelector('.imgBox'),
        { duration: 0.3, opacity: 0, ease: "expo.inOut" },
        delay + 0.63
      )
      .to(wrapper.querySelector('.image-caption'),
        { duration: 0.3, opacity: 0, ease: "expo.inOut" },
        delay + 0.63
      )
      .to(wrapper.querySelector('.imgBox'),
        { duration: 0, pointerEvents: "none" },
        delay + 1
      );
  });
  const imagesEndTime = baseDelay + (totalImages * delayPerImage) + 1;
  timeline
  .fromTo(
    "#txt2",
    { scale: 0.6, transformOrigin: "50% 50%" },
    { scale: 3, ease: "power1.in" },
    imagesEndTime - 1
  )
  .to(
    "#txt2 path",
    { 
      duration: 0.6, 
      strokeDashoffset: 0,
      stagger: 0.05, 
      ease: "power1.in" 
    },
    imagesEndTime - 1
  )
  .to(
    "#txt2",
    { 
      duration: 0.6, 
      opacity: 0, 
      ease: "power2.out" 
    },
    imagesEndTime - 0.6
  )
  .to(
    ".projects-title-section", 
    {
      duration: 0.2,
      opacity: 1,
      ease: "power1.in"
    }, 
    imagesEndTime - 0.4
  )
  .to(".imgBox, .imgBox img, .image-caption", {
    duration: 0,
    opacity: 1
  }, imagesEndTime + 0.5);
  gsap.set(".projects", { 
    overflow: "hidden" 
  });
  const timelineDuration = timeline.duration();
  const scrollDistance = timelineDuration * 1000;
  const scrollTrigger = ScrollTrigger.create({
    trigger: ".projects",
    start: "top top",
    end: () => `+=${timeline.duration() * 1000 + 333}px`,
    scrub: 0.5,
    pin: ".projects",
    markers: false,
    animation: timeline,
    onEnter: self => {
      handleProjectsEnter();
    },
    onLeave: self => {
      handleProjectsLeave();
    },
    onEnterBack: self => {
      handleProjectsEnter();
    },
    onLeaveBack: self => {
      handleProjectsLeave();
    }
  });
  function handleProjectsEnter() {
    const vh = window.innerHeight;
    gsap.to(".projects", { 
      height: `${vh}px`,
      minHeight: `${vh}px`,
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(".projects-scroll-container", { 
      height: `${vh}px`,
      overflow: "hidden",
      duration: 0.3,
      ease: "power2.out"
    });
    document.querySelector(".projects").classList.add("is-pinned");
    document.querySelectorAll('section:not(.projects)').forEach(section => {
      gsap.to(section, {
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
        duration: 0.3,
        ease: "power2.out"
      });
    });
    const footer = document.querySelector('footer');
    if (footer) {
      gsap.to(footer, {
        opacity: 0,
        visibility: 'hidden',
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }
  function handleProjectsLeave() {
    gsap.to(".projects", { height: "auto", minHeight: "auto", duration: 0.3, ease: "power2.out" });
    gsap.to(".projects-scroll-container", { height: "auto", duration: 0.3, ease: "power2.out" });
    document.querySelector(".projects").classList.remove("is-pinned");
    document.querySelectorAll('section:not(.projects)').forEach(section => {
      gsap.to(section, {
        opacity: 1,
        visibility: 'visible',
        pointerEvents: 'auto',
        duration: 0.3,
        delay: 0.1,
        ease: "power2.out"
      });
    });
    const footer = document.querySelector('footer');
    if (footer) {
      gsap.to(footer, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.3,
        delay: 0.1,
        ease: "power2.out"
      });
    }
  }
  let resizeTimeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (scrollTrigger && scrollTrigger.animation) {
        ScrollTrigger.refresh();
      }
    }, 250);
  };
  window.addEventListener('resize', handleResize);
  window.cleanupScrollDist = function() {
    window.removeEventListener('resize', handleResize);
    if (scrollTrigger) scrollTrigger.kill();
    appElement.removeAttribute('data-initialized');
  };
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 1000);
  gsap.from("#app", {
    duration: 1.4,
    opacity: 0,
    ease: "power2.in"
  });
  function initImg(i, t) {
    const wrapper = document.createElement("div");
    wrapper.className = "image-wrapper";
    wrapper.setAttribute('role', 'figure');
    wrapper.setAttribute('aria-label', t.alt || 'Project image');
    const box = document.createElement("div");
    box.className = "imgBox";
    box.setAttribute('role', 'button');
    box.setAttribute('aria-label', `View details for ${t.dataset.caption}`);
    box.setAttribute('tabindex', '0');
    box.dataset.imageSrc = t.src;
    box.dataset.imageAlt = t.alt;
    box.dataset.imageCaption = t.dataset.caption;
    gsap.set(box, {
      pointerEvents: "none",
      opacity: 0
    });
    box.appendChild(t);
    wrapper.appendChild(box);
    const caption = document.createElement("div");
    caption.className = "image-caption";
    caption.textContent = t.dataset.caption;
    wrapper.appendChild(caption);
    document.getElementById("imgGroup").appendChild(wrapper);
    gsap.set(wrapper, {
      pointerEvents: "none",
      position: "absolute",
      attr: { id: "wrapper" + i },
      width: t.width,
      height: t.height,
      overflow: "visible",
      top: "50%",
      left: "50%",
      x: t.dataset.x,
      y: t.dataset.y,
      xPercent: -50,
      yPercent: -50,
      opacity: 1
    });
    gsap.set(box, {
      position: "relative",
      width: "100%",
      height: "100%",
      opacity: 0
    });
    gsap.set(box.querySelector('img'), {
      opacity: 0
    });
    gsap.set(caption, {
      opacity: 0
    });
    box.onmouseover = () => {
      if (gsap.getProperty(box, "pointerEvents") === "auto") {
        gsap.to("#cursorCircle", {
          duration: 0.2,
          attr: { r: 30, "stroke-width": 4 }
        });
      }
    };
    box.onmousedown = () => {
      if (gsap.getProperty(box, "pointerEvents") === "auto") {
        gsap.to(box, { z: -25, ease: "power2" });
        gsap.to("#cursorCircle", { attr: { r: 40 }, ease: "power3" });
      }
    };
    box.onmouseup = () => {
      if (gsap.getProperty(box, "pointerEvents") === "auto") {
        gsap.to(box, { z: 0, ease: "power1.inOut" });
      }
    };
    box.onmouseout = () => {
      gsap.to("#cursorCircle", {
        duration: 0.2,
        attr: { r: 11, "stroke-width": 3 }
      });
    };
    box.onclick = (e) => {
      const isClickable = gsap.getProperty(box, "pointerEvents") === "auto";
      const isVisible = gsap.getProperty(box, "opacity") > 0.1;
      console.log(`Image ${i}: clickable=${isClickable}, visible=${isVisible}`);
      if (isClickable && isVisible) {
        showDetailFromBox(box);
        e.stopPropagation();
      }
    };
  }
  function showDetailFromBox(box) {
    const imageCaption = box.dataset.imageCaption;
    if (imageCaption === "Diplomarbeit - ESPigurator") {
      const event = new Event('openPDF');
      window.dispatchEvent(event);
      return;
    }
    if (gsap.getProperty("#detail", "top") === 0) {
      closeDetail();
      return;
    }
    const imageSrc = box.dataset.imageSrc;
    const imageAlt = box.dataset.imageAlt;
    let detailHTML = `
      <div id="detailImg"></div>
      <div class="text-border-container">
        <div class="animated-border">
          <div class="border-element"></div>
          <div class="text-content">
            <div id="detailTxt">${imageAlt}</div>
          </div>
        </div>
        <div class="blitz-effect"></div>
        <div class="wave-effect"></div>
      </div>
    `;
    const detailElement = document.getElementById("detail");
    detailElement.innerHTML = detailHTML;
    const detailImg = document.getElementById("detailImg");
    detailImg.style.background = "url(" + imageSrc + ") center no-repeat";
    detailImg.style.backgroundSize = "contain";
    gsap.set("#headlines, #imgGroup", {
      opacity: 0,
      pointerEvents: "none"
    });
    const timeline = gsap.timeline();
    timeline.fromTo("#detail", 
      { top: "100%", opacity: 0 }, 
      { top: 0, opacity: 1, ease: "expo.inOut", duration: 0.8 }, 
      0
    )
    .fromTo(
      "#detailImg",
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, ease: "expo.out", duration: 0.7 },
      0.2
    )
    .fromTo(
      ".text-border-container",
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, ease: "back.out(1.7)", duration: 0.6 },
      0.4
    )
    .fromTo(
      "#detailTxt",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ease: "power2.out", duration: 0.5 },
      0.6
    )
    .to("#cursorCircle", { duration: 0.2, opacity: 0 }, 0.2)
    .to("#cursorClose", { duration: 0.2, opacity: 1 }, 0.4);
  }
  function closeDetail() {
    if (gsap.getProperty("#detail", "top") !== 0) return;
    const hasIframe = document.querySelector("#detail iframe") !== null;
    gsap
      .timeline()
      .to("#detailTxt", { duration: 0.2, opacity: 0 }, 0)
      .to(".text-border-container", 
        { scale: 0.8, opacity: 0, y: 50, ease: "back.in(1.7)", duration: 0.4 }, 
        0.1
      )
      .to(hasIframe ? "#detail iframe" : "#detailImg", 
        { 
          y: hasIframe ? "100%" : "-100%", 
          opacity: 0, 
          ease: "power1.in", 
          duration: 0.4 
        }, 
        0.1
      )
      .to("#detail", 
        { top: "100%", opacity: 0, ease: "expo.in", duration: 0.5 }, 
        0.2
      )
      .to("#cursorClose", { duration: 0.1, opacity: 0 }, 0)
      .to("#cursorCircle", { duration: 0.2, opacity: 1 }, 0.3)
      .set("#headlines, #imgGroup", {
        opacity: 1,
        pointerEvents: "auto"
      })
      .call(() => {
        const detailElement = document.getElementById("detail");
        detailElement.innerHTML = `
          <div id="detailImg"></div>
          <div id="detailTxt"></div>
        `;
      });
  }
  document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
      if (e.target.closest('#detail') && gsap.getProperty("#detail", "top") === 0) {
        closeDetail();
      }
    });
  });
  if (ScrollTrigger.isTouch == 1) {
    gsap.set("#cursor", { opacity: 0 });
    gsap.set(".imgBox", { x: 0, y: 0 });
  } else {
    let cursorX = gsap.quickTo("#cursor", "x", { duration: 0.3, ease: "power2" });
    let cursorY = gsap.quickTo("#cursor", "y", { duration: 0.3, ease: "power2" });
    window.onmousemove = (e) => {
      document.querySelectorAll(".image-wrapper").forEach((wrapper, index) => {
        const positionOffset = index % 2 === 0 ? -33 : 88;
        const baseTilt = positionOffset > 0 ? -11 : 11;
        gsap.to(wrapper, {
          xPercent: (-e.clientX / innerWidth) * 200 + positionOffset,
          yPercent: -25 - (e.clientY / innerHeight) * 50,
          rotateX: 8 - (e.clientY / innerHeight) * 16,
          rotateY: baseTilt
        });
      });
      gsap.to(".imgBox img", {
        xPercent: (-e.clientX / innerWidth) * 11,
        yPercent: -5 - (e.clientY / innerHeight) * 11
      });
      cursorX(e.clientX);
      cursorY(e.clientY);
    };
  }
}
Promise.all([
  loadScript('/js/scrollDist-gsap.min.js'),
  loadScript('/js/scrollDist-ScrollTrigger.min.js'),
  loadScript('/js/scrollDist-ScrollToPlugin.min.js')
]).then(() => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollDist);
  } else {
    initScrollDist();
  }
});