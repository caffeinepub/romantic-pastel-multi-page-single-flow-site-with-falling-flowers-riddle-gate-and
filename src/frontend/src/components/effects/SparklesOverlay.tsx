import { useEffect, useRef } from 'react';

export function SparklesOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Array<{ x: number; y: number; size: number; opacity: number; speed: number }>>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
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

    // Initialize sparkles
    for (let i = 0; i < 20; i++) {
      sparklesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 2 + Math.random() * 3,
        opacity: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparklesRef.current.forEach((sparkle) => {
        ctx.save();
        ctx.globalAlpha = sparkle.opacity;
        ctx.fillStyle = '#fce7f3';
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Twinkle effect
        sparkle.opacity += sparkle.speed;
        if (sparkle.opacity > 1 || sparkle.opacity < 0) {
          sparkle.speed *= -1;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-5" />;
}
