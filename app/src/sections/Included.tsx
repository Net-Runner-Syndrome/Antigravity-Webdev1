import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="8" r="3" />
        <path d="M9 11v2a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3v-2" />
        <path d="M6 21v-2a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v2" />
      </svg>
    ),
    title: 'Guides',
    body: '2 awesome guides who know everything about Japan!',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20" />
        <path d="M2 12l5-5" />
        <path d="M2 12l5 5" />
        <path d="M22 12l-5-5" />
        <path d="M22 12l-5 5" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Flights',
    body: 'Routes: Moscow — Osaka, Tokyo — Moscow',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M6 18v2" />
        <path d="M18 18v2" />
        <path d="M3 10h18" />
        <circle cx="7.5" cy="14" r="1" fill="currentColor" />
        <circle cx="16.5" cy="14" r="1" fill="currentColor" />
      </svg>
    ),
    title: 'Transfers',
    body: 'From the airport to the hotels',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4 8 4v14" />
        <path d="M9 21v-6h6v6" />
        <path d="M10 9h4" />
        <path d="M10 13h4" />
      </svg>
    ),
    title: 'Hotels',
    body: 'Comfortable accommodation, 2 people per room (breakfasts included)',
  },
];

export default function Included() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="included"
      style={{
        background: '#0A0A0A',
        padding: '120px 40px',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Section Heading */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 64,
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#FAFAFA',
              whiteSpace: 'nowrap',
            }}
          >
            WHAT'S INCLUDED
          </h2>
          <div
            style={{
              width: 24,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              height: 1,
              background: 'rgba(250, 250, 250, 0.12)',
              flex: 1,
            }}
          />
        </div>

        {/* Bento Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {cards.map((card, i) => (
            <div
              key={card.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="glass-card"
              data-cursor-hover
              style={{
                padding: 32,
                minHeight: 200,
                transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'none',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-4px)';
                el.style.borderColor = 'rgba(212, 248, 122, 0.4)';
                el.style.boxShadow = '0 8px 40px rgba(212, 248, 122, 0.08)';
                const icon = el.querySelector('.card-icon');
                if (icon) (icon as HTMLElement).style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.borderColor = 'rgba(250, 250, 250, 0.08)';
                el.style.boxShadow = 'none';
                const icon = el.querySelector('.card-icon');
                if (icon) (icon as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              <div
                className="card-icon"
                style={{
                  width: 24,
                  height: 24,
                  color: '#D4F87A',
                  marginBottom: 16,
                  transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {card.icon}
              </div>
              <h3
                className="label-style"
                style={{
                  color: '#FAFAFA',
                  marginBottom: 12,
                }}
              >
                {card.title}
              </h3>
              <p
                className="font-sans"
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: 'rgba(250, 250, 250, 0.7)',
                }}
              >
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
