import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties; // Add style prop
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(({ children, className, style }, ref) => {
  return (
    <div
      ref={ref} // Pass the forwarded ref to the div element
      style={style} // Apply the style prop
      className={`relative rounded-lg p-6 bg-surface backdrop-blur-md border border-opacity-20 border-white-500 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
});

GlassCard.displayName = 'GlassCard'; // Add display name for better debugging

export default GlassCard;
