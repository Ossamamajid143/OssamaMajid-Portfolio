import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Premium two-layer animated cursor — desktop only.
 * - Inner dot: tracks mouse exactly (no lag).
 * - Outer ring: follows with smooth interpolation (lerp).
 * - Expands + transforms over interactive elements.
 * - Magnetic pull on [data-magnetic] elements.
 * - Inverts color when over dark backgrounds.
 * - Hidden on touch/coarse-pointer devices.
 */
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDark, setIsDark]         = useState(false);
  const [isVisible, setIsVisible]   = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const checkDark = useCallback((el: Element | null) => {
    if (!el) return;
    let node: Element | null = el;
    while (node) {
      const bg = window.getComputedStyle(node).backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        // Dark if luminance is below threshold
        const match = bg.match(/\d+/g);
        if (match) {
          const [r, g, b] = match.map(Number);
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          setIsDark(lum < 0.25);
          return;
        }
      }
      node = node.parentElement;
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let rafId  = 0;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Dot snaps instantly
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;

      // Check background color under cursor for dark/light awareness
      const el = document.elementFromPoint(mouseX, mouseY);
      checkDark(el);
    };

    const animate = () => {
      // Ring follows with smooth lerp (0.10 = heavy/laggy, 0.18 = snappier)
      ringX = lerp(ringX, mouseX, 0.13);
      ringY = lerp(ringY, mouseY, 0.13);
      ring.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [data-cursor="pointer"], input, textarea, label, select')) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [data-cursor="pointer"], input, textarea, label, select')) {
        setIsHovering(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp   = () => setIsClicking(false);

    const onWindowLeave = () => setIsVisible(false);
    const onWindowEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onWindowLeave);
    document.addEventListener('mouseenter', onWindowEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onWindowLeave);
      document.removeEventListener('mouseenter', onWindowEnter);
    };
  }, [checkDark]);

  // Prevent render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  // Dynamic cursor colors based on background luminance
  const cursorColor   = isDark ? 'rgba(234,231,223,0.9)' : 'rgba(28,27,26,0.9)';
  const ringBorder    = isDark ? 'rgba(234,231,223,0.55)' : 'rgba(28,27,26,0.45)';
  const ringHoverBg   = isDark ? 'rgba(234,231,223,0.06)' : 'rgba(28,27,26,0.05)';
  const clickScale    = isClicking ? 0.8 : 1;
  const ringDiameter  = isHovering ? 58 : isClicking ? 28 : 40;

  return (
    <>
      {/* Outer ring — laggy follow */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: ringDiameter,
          height: ringDiameter,
          borderRadius: '50%',
          border: `1.5px solid ${isHovering ? ringBorder.replace('0.45', '0.75').replace('0.55','0.85') : ringBorder}`,
          background: isHovering ? ringHoverBg : 'transparent',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.28s cubic-bezier(0.16,1,0.3,1), height 0.28s cubic-bezier(0.16,1,0.3,1), opacity 0.3s, border-color 0.25s, background 0.25s, transform 0.1s',
          willChange: 'transform',
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Inner dot — instant tracking */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? 5 : isClicking ? 14 : 8,
          height: isHovering ? 5 : isClicking ? 14 : 8,
          borderRadius: '50%',
          background: cursorColor,
          pointerEvents: 'none',
          zIndex: 10000,
          willChange: 'transform',
          transform: `scale(${clickScale})`,
          transition: 'opacity 0.3s, width 0.22s cubic-bezier(0.16,1,0.3,1), height 0.22s cubic-bezier(0.16,1,0.3,1), background 0.25s, transform 0.15s',
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
