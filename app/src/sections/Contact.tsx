import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission
    alert('Thank you! We will contact you soon.');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(250, 250, 250, 0.12)',
    padding: '12px 0',
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    color: '#FAFAFA',
    outline: 'none',
    transition: 'border-color 200ms ease',
    borderRadius: 0,
  };

  const focusStyle = {
    borderBottomColor: '#D4F87A',
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <img
          src="./images/contact-cherry-blossoms.jpg"
          alt="Cherry blossoms with Mount Fuji"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(0deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0) 50%)',
          }}
        />
      </div>

      {/* Frosted Glass Form Panel */}
      <div
        ref={formRef}
        className="glass-panel"
        style={{
          position: 'relative',
          zIndex: 1,
          width: 420,
          maxWidth: 'calc(100vw - 80px)',
          padding: 48,
          marginLeft: 48,
        }}
      >
        <h2
          className="font-serif"
          style={{
            fontSize: 24,
            lineHeight: 1.4,
            color: '#FAFAFA',
            marginBottom: 12,
          }}
        >
          Want to join us, but still have questions?
        </h2>
        <p
          className="label-style"
          style={{
            color: 'rgba(250, 250, 250, 0.6)',
            marginBottom: 32,
          }}
        >
          Leave a request
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 24 }}>
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(250, 250, 250, 0.12)'; }}
              required
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <input
              type="tel"
              placeholder="Phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(250, 250, 250, 0.12)'; }}
              required
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <textarea
              placeholder="Comment"
              rows={3}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              style={{
                ...inputStyle,
                resize: 'none',
              }}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(250, 250, 250, 0.12)'; }}
            />
          </div>

          <button
            type="submit"
            className="liquid-fill button-style"
            data-cursor-hover
            style={{
              width: '100%',
              height: 52,
              background: 'rgba(245, 232, 211, 0.9)',
              borderRadius: 12,
              border: 'none',
              color: '#1A1A1A',
              marginTop: 24,
              transition: 'color 300ms ease',
            }}
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
