'use client';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
export default function SCROLLBAR() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    import('smoothscroll-polyfill').then((module) => {
      module.polyfill();
    });
  }, []);
  const smoothScrollTo = (position: number) => {
    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem('isRefreshing', 'true');
    const search = searchParams.toString();
    const routeKey = `scrollPos_${pathname}${search ? `?${search}` : ''}`;
    const savedPosition = sessionStorage.getItem(routeKey);
    if (savedPosition && savedPosition !== '0') {
      const position = parseInt(savedPosition);
      const scrollInterval = setInterval(() => {
        smoothScrollTo(position);
      }, 50);
      setTimeout(() => {
        clearInterval(scrollInterval);
        sessionStorage.removeItem('isRefreshing');
      }, 3000);
      sessionStorage.removeItem(routeKey);
    } else {
      setTimeout(() => {
        sessionStorage.removeItem('isRefreshing');
      }, 2000);
    }
  }, [pathname, searchParams]);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let scrollTimeout: NodeJS.Timeout;
    let isInitialLoad = true;
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progressHeight = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setProgress(progressHeight);
      if (!isInitialLoad && window.scrollY > 0) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const routeKey = `scrollPos_${pathname}`;
          sessionStorage.setItem(routeKey, window.scrollY.toString());
        }, 200);
      }
    };
    const handleBeforeUnload = () => {
      if (window.scrollY > 0) {
        const routeKey = `scrollPos_${pathname}`;
        sessionStorage.setItem(routeKey, window.scrollY.toString());
      }
    };
    const initTimer = setTimeout(() => {
      isInitialLoad = false;
    }, 2000);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      clearTimeout(scrollTimeout);
      clearTimeout(initTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (!isInitialLoad && window.scrollY > 0) {
        const routeKey = `scrollPos_${pathname}`;
        sessionStorage.setItem(routeKey, window.scrollY.toString());
      }
    };
  }, [pathname]);
  return (
    <>
      <div id="scrollPath" />
      <div id="progressBar" style={{height: `${progress}%`}} />
    </>
  );
}