import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    // ─── Problem 4B: Hide custom cursor on mobile ───
    if (window.innerWidth < 768) return;

    // Also respect prefers-reduced-motion for cursor animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      // Show cursor on first mouse move
      if (!visibleRef.current) {
        visibleRef.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (circleRef.current) circleRef.current.style.opacity = '1';
      }
    };

    const onHoverIn = () => { isHoveringRef.current = true; };
    const onHoverOut = () => { isHoveringRef.current = false; };

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, [data-cursor-hover]');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', onHoverIn);
        el.addEventListener('mouseleave', onHoverOut);
      });
      return interactives;
    };

    let interactives = addHoverListeners();
    const observer = new MutationObserver(() => {
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });
      interactives = addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const lerp = prefersReducedMotion ? 1 : 0.15; // Instant follow if reduced motion

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp;

      const hovering = isHoveringRef.current;

      // ─── Default state: 8px solid dot ───
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;
        dotRef.current.style.opacity = hovering ? '0' : '1';
      }

      // ─── Hover state: 32px outlined circle (1px border, no fill) ───
      if (circleRef.current) {
        const size = hovering ? 32 : 8;
        circleRef.current.style.transform = `translate(${posRef.current.x - size / 2}px, ${posRef.current.y - size / 2}px)`;
        circleRef.current.style.width = `${size}px`;
        circleRef.current.style.height = `${size}px`;
        circleRef.current.style.borderColor = hovering ? 'rgba(212, 248, 122, 0.9)' : 'transparent';
        circleRef.current.style.backgroundColor = hovering ? 'transparent' : 'rgba(212, 248, 122, 1)';
        circleRef.current.style.borderWidth = hovering ? '1px' : '0px';
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });
    };
  }, []);

  return (
    <>
      {/* Default state: 8px solid dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#D4F87A',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0, // Hidden until first mouse move
          transition: 'opacity 300ms ease',
          mixBlendMode: 'difference',
        }}
      />
      {/* Hover state: expands to 32px outlined circle */}
      <div
        ref={circleRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          border: '1px solid transparent',
          backgroundColor: '#D4F87A',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0, // Hidden until first mouse move
          transition: 'width 200ms ease, height 200ms ease, border-color 200ms ease, background-color 200ms ease, opacity 300ms ease',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
