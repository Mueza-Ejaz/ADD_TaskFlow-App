import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onDragExit' | 'onDragEnter' | 'onDragLeave' | 'onDragOver' | 'onDrop' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onTransitionEnd' | 'onTransitionStart'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline'; // Add outline variant
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
  const baseStyles = "relative px-6 py-3 rounded-lg font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out";
  let variantStyles = "";

  switch (variant) {
    case 'primary':
      variantStyles = "bg-gradient-to-r from-primary to-secondary text-white";
      break;
    case 'secondary':
      variantStyles = "bg-gray-600 hover:bg-gray-700 text-white"; // Example secondary style
      break;
    case 'destructive':
      variantStyles = "bg-red-600 hover:bg-red-700 text-white"; // Example destructive style
      break;
    case 'outline':
      variantStyles = "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white"; // Outline style
      break;
    default:
      variantStyles = "bg-gradient-to-r from-primary to-secondary text-white"; // Default to primary
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }} // Fine-tune framer-motion transitions
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
