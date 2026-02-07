import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  rotation: number;
  opacity: number;
  size: number;
  vx: number;
  vy: number;
}

export function CursorPetalTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check for touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw a simple petal shape
    const drawPetal = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      // Rose petal - rounded teardrop shape
      ctx.moveTo(0, -size / 2);
      ctx.bezierCurveTo(
        size / 2, -size / 2,
        size / 2, size / 2,
        0, size / 2
      );
      ctx.bezierCurveTo(
        -size / 2, size / 2,
        -size / 2, -size / 2,
        0, -size / 2
      );
      ctx.fillStyle = '#ec4899';
      ctx.fill();
    };

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      const now = Date.now();
      if (now - lastSpawnRef.current > 50) {
        petalsRef.current.push({
          x: e.clientX,
          y: e.clientY,
          rotation: Math.random() * 360,
          opacity: 0.8,
          size: 15 + Math.random() * 15,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 2 + 1,
        });
        lastSpawnRef.current = now;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petalsRef.current = petalsRef.current.filter((petal) => {
        if (petal.opacity <= 0) return false;

        ctx.save();
        ctx.globalAlpha = petal.opacity;
        ctx.translate(petal.x, petal.y);
        ctx.rotate((petal.rotation * Math.PI) / 180);
        drawPetal(ctx, petal.size);
        ctx.restore();

        petal.x += petal.vx;
        petal.y += petal.vy;
        petal.rotation += 2;
        petal.opacity -= 0.015;

        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
}
