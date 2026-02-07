import { ReactNode } from 'react';

interface FloralTitleProps {
  children: ReactNode;
  className?: string;
}

export function FloralTitle({ children, className = '' }: FloralTitleProps) {
  return (
    <h1
      className={`text-7xl md:text-9xl font-bold floral-title ${className}`}
      style={{
        backgroundImage: 'url(/assets/generated/floral-texture-seamless.dim_1024x1024.png)',
        backgroundSize: '400px 400px',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))',
      }}
    >
      {children}
    </h1>
  );
}
