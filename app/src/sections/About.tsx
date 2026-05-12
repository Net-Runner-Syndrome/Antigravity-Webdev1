import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    days: 'Days 1–3',
    city: 'Osaka',
    photos: ['/images/osaka-castle.jpg', '/images/osaka-skyline.jpg'],
  },
  {
    days: 'Days 4–6',
    city: 'Kyoto',
    photos: ['/images/kyoto-pagoda.jpg', '/images/kyoto-shrine.jpg'],
  },
  {
    days: 'Days 7–10',
    city: 'Tokyo',
    photos: ['/images/tokyo-shibuya.jpg', '/images/tokyo-street.jpg'],
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          },
        }
      );

      // Text paragraphs reveal
      gsap.fromTo(
        textRef.current?.querySelectorAll('.reveal-text') || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
          },
        }
      );

      // ─── PROBLEM 3: Sequential viewport-triggered reveal for each city ───
      // Each city cluster gets its OWN ScrollTrigger so they animate
      // independently as they enter the viewport — like turning pages
      // of a travel journal.
      if (!prefersReducedMotion) {
        nodesRef.current.filter(Boolean).forEach((node, i) => {
          gsap.fromTo(
            node,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.2, // Osaka 0ms, Kyoto 200ms, Tokyo 400ms
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
              scrollTrigger: {
                trigger: node,
                start: 'top 70%', // ~30% of element in view
                once: true,
              },
            }
          );
        });
      } else {
        // If reduced motion, just show everything immediately
        nodesRef.current.filter(Boolean).forEach((node) => {
          if (node) {
            node.style.opacity = '1';
            node.style.transform = 'translateY(0)';
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        background: '#0A0A0A',
        paddingTop: 160,
        paddingBottom: 120,
        position: 'relative',
      }}
    >
      {/* Section Heading with hairline */}
      <div
        ref={headingRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 40px',
          marginBottom: 80,
        }}
      >
        <div className="hairline-dark flex-1" />
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 400,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#FAFAFA',
            margin: '0 24px',
            whiteSpace: 'nowrap',
          }}
        >
          ABOUT THE TOUR
        </h2>
        <div className="hairline-dark flex-1" />
      </div>

      {/* Two-Column Layout */}
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          gap: 80,
          flexWrap: 'wrap',
        }}
      >
        {/* Left Column - Text */}
        <div ref={textRef} style={{ flex: '1 1 400px', minWidth: 300 }}>
          <div className="reveal-text" style={{ marginBottom: 32 }}>
            <p
              className="font-serif"
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: '#FAFAFA',
                letterSpacing: '0.01em',
              }}
            >
              We've planned a simple and convenient 10-day itinerary for your trip to Japan. You'll visit three cities:{' '}
              <span style={{ color: '#D4F87A' }}>Osaka, Kyoto, and Tokyo</span>.
            </p>
          </div>
          <div className="reveal-text">
            <p
              className="font-serif"
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: '#FAFAFA',
                letterSpacing: '0.01em',
              }}
            >
              No need to worry about routes, schedules, or finding places — everything is already organized. We'll show you where to go, what to see, and where to eat, so you can simply{' '}
              <span style={{ color: '#D4F87A' }}>enjoy the journey</span>.
            </p>
          </div>
        </div>

        {/* Right Column - Timeline */}
        <div
          className="timeline-container"
          style={{
            flex: '1 1 500px',
            minWidth: 350,
            position: 'relative',
            paddingLeft: 40,
          }}
        >
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: 45,
              top: 0,
              bottom: 0,
              width: 1,
              background: 'rgba(250, 250, 250, 0.12)',
            }}
          />

          {/* Timeline Nodes — each city triggers independently */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 100 }}>
            {timelineData.map((item, i) => (
              <div
                key={item.city}
                ref={(el) => { nodesRef.current[i] = el; }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 24,
                  opacity: 0,
                  transform: 'translateY(40px)',
                }}
              >
                {/* Node dot */}
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#D4F87A',
                    flexShrink: 0,
                    marginTop: 6,
                    marginLeft: -6,
                    position: 'relative',
                    zIndex: 2,
                  }}
                />

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <span
                    className="label-style"
                    style={{ color: '#FAFAFA', display: 'block', marginBottom: 4 }}
                  >
                    {item.days}
                  </span>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: 24,
                      fontWeight: 400,
                      color: '#FAFAFA',
                      marginBottom: 16,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {item.city}
                  </h3>

                  {/* Photo cluster */}
                  <div
                    className="photo-cluster"
                    data-cursor-hover
                    style={{
                      display: 'flex',
                      gap: 0,
                      position: 'relative',
                      height: 100,
                    }}
                    onMouseEnter={(e) => {
                      const photos = e.currentTarget.querySelectorAll('img');
                      photos[0]?.setAttribute('style', 'width: 120px; height: 90px; object-fit: cover; border-radius: 4px; border: 3px solid #FAFAFA; box-shadow: 0 4px 16px rgba(0,0,0,0.3); position: absolute; transform: rotate(-5deg) translateX(-12px); transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);');
                      photos[1]?.setAttribute('style', 'width: 120px; height: 90px; object-fit: cover; border-radius: 4px; border: 3px solid #FAFAFA; box-shadow: 0 4px 16px rgba(0,0,0,0.3); position: absolute; left: 60px; transform: rotate(5deg) translateX(12px); transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);');
                    }}
                    onMouseLeave={(e) => {
                      const photos = e.currentTarget.querySelectorAll('img');
                      photos[0]?.setAttribute('style', 'width: 120px; height: 90px; object-fit: cover; border-radius: 4px; border: 3px solid #FAFAFA; box-shadow: 0 4px 16px rgba(0,0,0,0.3); position: absolute; transform: rotate(-3deg) translateX(-8px); transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);');
                      photos[1]?.setAttribute('style', 'width: 120px; height: 90px; object-fit: cover; border-radius: 4px; border: 3px solid #FAFAFA; box-shadow: 0 4px 16px rgba(0,0,0,0.3); position: absolute; left: 60px; transform: rotate(3deg) translateX(8px); transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);');
                    }}
                  >
                    <img
                      src={item.photos[0]}
                      alt={`${item.city} 1`}
                      style={{
                        width: 120,
                        height: 90,
                        objectFit: 'cover',
                        borderRadius: 4,
                        border: '3px solid #FAFAFA',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                        position: 'absolute',
                        transform: 'rotate(-3deg) translateX(-8px)',
                        transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                    <img
                      src={item.photos[1]}
                      alt={`${item.city} 2`}
                      style={{
                        width: 120,
                        height: 90,
                        objectFit: 'cover',
                        borderRadius: 4,
                        border: '3px solid #FAFAFA',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                        position: 'absolute',
                        left: 60,
                        transform: 'rotate(3deg) translateX(8px)',
                        transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
