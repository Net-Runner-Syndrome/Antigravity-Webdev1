import { useEffect, useRef, useState } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 64,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        transition: 'all 400ms ease',
        backgroundColor: scrolled ? 'rgba(245, 232, 211, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      {/* Left - Wordmark */}
      <div
        className="flex items-center gap-2"
        style={{ color: scrolled ? '#1A1A1A' : '#FAFAFA', transition: 'color 400ms ease' }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="10" cy="10" r="9" />
          <ellipse cx="10" cy="10" rx="4" ry="9" />
          <line x1="1" y1="10" x2="19" y2="10" />
          <line x1="10" y1="1" x2="10" y2="19" />
        </svg>
        <span className="label-style">JAPAN TOURS</span>
      </div>

      {/* Center - Nav Links */}
      <div className="hidden md:flex items-center" style={{ gap: 48 }}>
        {[
          { label: 'About', id: 'about' },
          { label: 'Included', id: 'included' },
          { label: 'Contacts', id: 'contact' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="label-style relative group"
            style={{
              color: scrolled ? '#1A1A1A' : '#FAFAFA',
              transition: 'color 400ms ease',
              background: 'none',
              border: 'none',
              padding: 0,
            }}
            data-cursor-hover
          >
            {item.label}
            <span
              className="absolute bottom-0 left-0 w-full"
              style={{
                height: 1,
                backgroundColor: scrolled ? '#1A1A1A' : '#FAFAFA',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
            <style>{`
              button:hover span:last-child { transform: scaleX(1) !important; }
            `}</style>
          </button>
        ))}
      </div>

      {/* Right - Book Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => scrollTo('contact')}
          className="liquid-fill button-style"
          style={{
            width: 80,
            height: 36,
            borderRadius: 9999,
            border: `1px solid ${scrolled ? 'rgba(26,26,26,0.15)' : 'rgba(250,250,250,0.3)'}`,
            backgroundColor: scrolled ? 'transparent' : 'transparent',
            color: scrolled ? '#1A1A1A' : '#FAFAFA',
            transition: 'color 400ms ease, border-color 400ms ease',
          }}
          data-cursor-hover
        >
          Book
        </button>
      </div>

      {/* Far Right - Vertical Social Icons */}
      <div
        className="hidden lg:flex flex-col items-center"
        style={{
          position: 'fixed',
          right: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          gap: 12,
        }}
      >
        {['instagram', 'facebook', 'telegram'].map((social) => (
          <a
            key={social}
            href="#"
            style={{
              width: 28,
              height: 28,
              color: scrolled ? 'rgba(26,26,26,0.4)' : 'rgba(250,250,250,0.4)',
              transition: 'color 300ms ease',
            }}
            data-cursor-hover
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = scrolled ? '#1A1A1A' : '#FAFAFA';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = scrolled ? 'rgba(26,26,26,0.4)' : 'rgba(250,250,250,0.4)';
            }}
          >
            {social === 'instagram' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            )}
            {social === 'facebook' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            )}
            {social === 'telegram' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.2 3.2L2.5 10.8c-.7.3-.7 1.1 0 1.4l4.7 1.8 1.8 5.6c.2.5.9.7 1.3.3l2.6-2.5 5.1 3.8c.6.4 1.4.1 1.5-.6L22.5 4c.1-.7-.6-1.2-1.3-.8z" />
                <path d="M8.5 14.5l7-5.5" />
              </svg>
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}
