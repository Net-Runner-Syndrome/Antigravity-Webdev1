import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Included from './sections/Included';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // ─── Problem 4A: Lenis Smooth Scroll with production config ───
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
     //smooth: true,
     // smoothTouch: false, // Mobile keeps native scroll for performance
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const scrollFn = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(scrollFn);
    };

    requestAnimationFrame(scrollFn);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div>
      <CustomCursor />
      <Navigation />
      <Hero />

      {/* Gradient transition from hero to dark sections */}
      <div
        style={{
          height: 150,
          background: 'linear-gradient(180deg, transparent 0%, #0A0A0A 100%)',
          marginTop: -150,
          position: 'relative',
          zIndex: 10,
        }}
      />

      <About />
      <Included />
      <Contact />
      <Footer />
    </div>
  );
}
