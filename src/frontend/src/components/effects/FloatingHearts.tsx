import { useEffect, useRef } from 'react';

export function FloatingHearts() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hearts = ['💗', '💕', '💖', '💝'];
    const heartElements: HTMLDivElement[] = [];

    for (let i = 0; i < 8; i++) {
      const heart = document.createElement('div');
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.className = 'absolute text-2xl pointer-events-none animate-float-heart';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDelay = `${Math.random() * 3}s`;
      heart.style.animationDuration = `${3 + Math.random() * 2}s`;
      container.appendChild(heart);
      heartElements.push(heart);
    }

    return () => {
      heartElements.forEach((heart) => heart.remove());
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden" />;
}
