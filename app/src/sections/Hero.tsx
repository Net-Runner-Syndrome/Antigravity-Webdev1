import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const polaroids = [
  { video: './videos/polaroid-1.mp4', caption: '3 cities in Japan' },
  { video: './videos/polaroid-2.mp4', caption: '10 days' },
  { video: './videos/polaroid-3.mp4', caption: 'gigabytes of photos' },
  { video: './videos/polaroid-4.mp4', caption: 'eat ramen' },
  { video: './videos/polaroid-5.mp4', caption: 'enjoy the vibe' },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Mountain image: translateY at 0.3x scroll speed (slowest — anchors the scene)
      gsap.to(mountainRef.current, {
        y: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // "JAPAN" typography: translateY at 0.5x scroll speed (mid-depth)
      gsap.to(textRef.current, {
        y: '50%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Polaroid card strip: translateX leftward at 0.4x scroll speed
      gsap.to(stripRef.current, {
        x: '-40%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Kimono figure: stays fixed, no transform (acts as the visual anchor point)
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* ─── Plane 0: Sky Background (z-index: 1) ─── */}
      {/* Provides the warm sky visible behind the JAPAN letters */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          background: 'linear-gradient(180deg, #b8ada0 0%, #c9b99e 20%, #ddd0b8 40%, #e8dac5 60%, #F5E8D3 100%)',
        }}
      />

      {/* ─── Plane 1: "JAPAN" Display Typography (z-index: 2) ─── */}
      {/* Sits BEHIND the mountains — only upper letterforms visible above the peaks */}
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform',
          pointerEvents: 'none',
        }}
      >
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(120px, 20vw, 300px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            WebkitTextStroke: '2px rgba(90, 70, 50, 0.5)',
            color: 'rgba(200, 180, 150, 0.35)',
            marginTop: '-5vh',
            userSelect: 'none',
          }}
        >
          JAPAN
        </h1>
      </div>

      {/* ─── Plane 2: Mountain Landscape (z-index: 3) ─── */}
      {/* Uses CSS mask to make the sky area transparent, revealing JAPAN text behind */}
      <div
        ref={mountainRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '130%',
          zIndex: 3,
          willChange: 'transform',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 15%, rgba(0,0,0,0.15) 22%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.85) 38%, black 45%, black 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 15%, rgba(0,0,0,0.15) 22%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.85) 38%, black 45%, black 100%)',
        }}
      >
        <img
          src="./images/hero-mountains.jpg"
          alt="Japanese mountains at dawn"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
          }}
        />
        {/* Warm overlay gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(245,232,211,0.1) 0%, rgba(245,232,211,0) 30%, rgba(10,10,10,0.15) 100%)',
          }}
        />
      </div>

      {/* ─── Plane 3: Cherry Blossom Branch (z-index: 5) ─── */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '10%',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      >
        <img
          src="./images/hero-cherry-branch.png"
          alt="Cherry blossom branch"
          style={{
            height: '50vh',
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* ─── Plane 4: Kimono Figure (z-index: 6) ─── */}
      {/* NO parallax — stays fixed as the visual anchor */}
      <div
        style={{
          position: 'absolute',
          right: '8%',
          bottom: '15%',
          zIndex: 6,
          pointerEvents: 'none',
        }}
      >
        <img
          src="./images/hero-figure.png"
          alt="Woman in floral kimono"
          style={{
            height: '70vh',
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* ─── Plane 5: Polaroid Card Strip (z-index: 7) ─── */}
      <div
        ref={stripRef}
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          zIndex: 7,
          display: 'flex',
          gap: 12,
          willChange: 'transform',
        }}
      >
        {polaroids.map((p, i) => (
          <div
            key={i}
            className="group"
            data-cursor-hover
            style={{
              width: 100,
              height: 130,
              background: '#FAFAFA',
              padding: 8,
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
              transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 400ms cubic-bezier(0.16, 1, 0.3, 1)',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = `rotate(${i % 2 === 0 ? -2 : 2}deg) translateY(-8px) scale(1.02)`;
              el.style.boxShadow = '0 20px 40px rgba(255, 184, 197, 0.2), 0 12px 32px rgba(0,0,0,0.2)';
              const video = el.querySelector('video');
              if (video) video.playbackRate = 1;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = `rotate(${i % 2 === 0 ? -2 : 2}deg)`;
              el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            }}
          >
            <div style={{ width: '100%', height: 80, overflow: 'hidden', borderRadius: 2 }}>
              <video
                src={p.video}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                color: '#888888',
                paddingTop: 4,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {p.caption}
            </p>
          </div>
        ))}
      </div>

      {/* ─── Hero Book Button (z-index: 7) ─── */}
      <button
        onClick={scrollToContact}
        className="liquid-fill button-style"
        data-cursor-hover
        style={{
          position: 'absolute',
          bottom: '18%',
          left: '52%',
          width: 140,
          height: 52,
          borderRadius: 9999,
          border: '1px solid rgba(250,250,250,0.3)',
          background: 'rgba(245, 232, 211, 0.9)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          color: '#1A1A1A',
          zIndex: 7,
          transition: 'color 400ms ease',
        }}
      >
        Book
      </button>
    </div>
  );
}
