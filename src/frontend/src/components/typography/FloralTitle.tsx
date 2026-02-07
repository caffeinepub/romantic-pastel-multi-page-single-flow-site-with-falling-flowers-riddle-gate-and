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
        background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 25%, #fb7185 50%, #f472b6 75%, #ec4899 100%)',
        backgroundSize: '200% 200%',
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
