import { Button } from '@/components/ui/button';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface RomanticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'default' | 'lg';
}

export const RomanticButton = forwardRef<HTMLButtonElement, RomanticButtonProps>(
  ({ children, className = '', size = 'default', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size={size}
        className={`romantic-button bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${className}`}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

RomanticButton.displayName = 'RomanticButton';
