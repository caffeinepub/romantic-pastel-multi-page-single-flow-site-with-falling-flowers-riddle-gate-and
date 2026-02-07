import { useEffect, useRef } from 'react';

interface FallingFlowersBackgroundProps {
  variant: 'mixed' | 'roses-only';
  speed: 'normal' | 'slow';
}

interface Flower {
  x: number;
  y: number;
  rotation: number;
  rotationSpeed: number;
  speed: number;
  size: number;
  type: 'rose' | 'tulip';
  opacity: number;
}

export function FallingFlowersBackground({ variant, speed }: FallingFlowersBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flowersRef = useRef<Flower[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const roseImageRef = useRef<HTMLImageElement | undefined>(undefined);
  const tulipImageRef = useRef<HTMLImageElement | undefined>(undefined);
  const imagesLoadedRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Load images
    const roseImg = new Image();
    const tulipImg = new Image();
    
    roseImg.onload = () => {
      imagesLoadedRef.current++;
      roseImageRef.current = roseImg;
    };
    
    tulipImg.onload = () => {
      imagesLoadedRef.current++;
      tulipImageRef.current = tulipImg;
    };
    
    roseImg.src = '/assets/generated/rose-petal-sprite.dim_256x256.png';
    tulipImg.src = '/assets/generated/tulip-petal-sprite.dim_256x256.png';

    // Initialize flowers
    const flowerCount = 30;
    const baseSpeed = speed === 'slow' ? 0.3 : 0.8;
    
    for (let i = 0; i < flowerCount; i++) {
      flowersRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        speed: baseSpeed + Math.random() * baseSpeed,
        size: 20 + Math.random() * 30,
        type: variant === 'roses-only' ? 'rose' : Math.random() > 0.5 ? 'rose' : 'tulip',
        opacity: 0.6 + Math.random() * 0.4,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (imagesLoadedRef.current >= (variant === 'roses-only' ? 1 : 2)) {
        flowersRef.current.forEach((flower) => {
          ctx.save();
          ctx.globalAlpha = flower.opacity;
          ctx.translate(flower.x, flower.y);
          ctx.rotate((flower.rotation * Math.PI) / 180);

          const img = flower.type === 'rose' ? roseImageRef.current : tulipImageRef.current;
          if (img) {
            ctx.drawImage(img, -flower.size / 2, -flower.size / 2, flower.size, flower.size);
          }

          ctx.restore();

          // Update position
          flower.y += flower.speed;
          flower.rotation += flower.rotationSpeed;
          flower.x += Math.sin(flower.y * 0.01) * 0.5;

          // Reset when off screen
          if (flower.y > canvas.height + flower.size) {
            flower.y = -flower.size;
            flower.x = Math.random() * canvas.width;
          }
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [variant, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ background: 'linear-gradient(to bottom right, #fce7f3, #fbcfe8, #fecdd3)' }}
    />
  );
}
