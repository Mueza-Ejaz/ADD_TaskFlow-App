import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer'; // For animating when in view
import { animate } from 'framer-motion';

interface StatisticsCardProps {
  label: string;
  value: number;
  className?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ label, value, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger animation once when it comes into view
    threshold: 0.5, // Trigger when 50% of the component is visible
  });

  const nodeRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (inView) {
      const node = nodeRef.current;
      if (!node) return;

      const controls = animate(0, value, {
        duration: 1.5,
        onUpdate(latest) {
          node.textContent = latest.toFixed(0); // Display as integer
        }
      });

      return () => controls.stop();
    }
  }, [value, inView]);

  return (
    <motion.div
      ref={ref}
      className={`glassmorphic-card flex flex-col items-center justify-center p-4 text-center ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-4xl font-bold text-text-DEFAULT mb-2">
        <span ref={nodeRef}>{0}</span>
      </div>
      <p className="text-lg text-text-DEFAULT text-opacity-80">{label}</p>
    </motion.div>
  );
};

export default StatisticsCard;
