export default function Footer() {
  const scrollTo = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: '#0A0A0A',
        padding: '0 40px',
      }}
    >
      {/* Top hairline */}
      <div className="hairline-dark" />

      {/* Footer Content */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '40px 0',
          flexWrap: 'wrap',
          gap: 20,
        }}
      >
        {/* Left - Wordmark */}
        <div className="flex items-center gap-2" style={{ color: '#FAFAFA' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="10" cy="10" r="9" />
            <ellipse cx="10" cy="10" rx="4" ry="9" />
            <line x1="1" y1="10" x2="19" y2="10" />
            <line x1="10" y1="1" x2="10" y2="19" />
          </svg>
          <span className="label-style">JAPAN TOURS</span>
        </div>

        {/* Center - Nav Links */}
        <div className="flex items-center" style={{ gap: 32 }}>
          {[
            { label: 'Home', id: 'home' },
            { label: 'About', id: 'about' },
            { label: 'Included', id: 'included' },
            { label: 'Contacts', id: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="label-style"
              style={{
                color: 'rgba(250, 250, 250, 0.5)',
                background: 'none',
                border: 'none',
                padding: 0,
                transition: 'color 300ms ease',
              }}
              data-cursor-hover
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#FAFAFA';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(250, 250, 250, 0.5)';
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right - Book + Social */}
        <div className="flex items-center" style={{ gap: 16 }}>
          <button
            onClick={() => scrollTo('contact')}
            className="liquid-fill button-style"
            style={{
              width: 80,
              height: 36,
              borderRadius: 9999,
              border: '1px solid rgba(250, 250, 250, 0.12)',
              background: 'transparent',
              color: '#FAFAFA',
              transition: 'color 300ms ease',
            }}
            data-cursor-hover
          >
            Book
          </button>

          {/* Social Icons */}
          <div className="flex items-center" style={{ gap: 12 }}>
            {['instagram', 'facebook', 'telegram'].map((social) => (
              <a
                key={social}
                href="#"
                style={{
                  width: 20,
                  height: 20,
                  color: 'rgba(250, 250, 250, 0.4)',
                  transition: 'color 300ms ease',
                }}
                data-cursor-hover
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#FAFAFA';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'rgba(250, 250, 250, 0.4)';
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
        </div>
      </div>
    </footer>
  );
}
