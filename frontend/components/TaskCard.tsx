import React from 'react';
import GlassCard from './ui/GlassCard'; // Use GlassCard component
import AnimatedButton from './ui/AnimatedButton'; // Use AnimatedButton
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion'; // Import motion
import { fadeAnimation, scaleAnimation } from '@/lib/animations'; // Import animations

interface TaskRead {
  id: number;
  title: string;
  description?: string;
  priority?: number;
  due_date?: string;
  status: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface TaskCardProps extends TaskRead {
  onEditTask: (task: TaskRead) => void;
  onDeleteTask: (taskId: number) => void; // Add onDeleteTask prop
  isDragging: boolean; // Added isDragging prop
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  priority,
  due_date,
  status,
  user_id,
  created_at,
  updated_at,
  onEditTask,
  onDeleteTask, // Destructure onDeleteTask
  isDragging, // Destructure isDragging
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto', // Ensure dragged item is on top
    opacity: isDragging ? 0.8 : 1, // Slight opacity change when dragging
    boxShadow: isDragging ? '0px 10px 30px rgba(0, 0, 0, 0.3)' : '0px 5px 15px rgba(0, 0, 0, 0.15)', // Enhanced shadow
  };

  const formattedDueDate = due_date ? new Date(due_date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }) : null;

  return (
    <motion.div
      layout // Enable layout animations
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeAnimation}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <GlassCard
        ref={setNodeRef}
        style={style} // Apply our custom style including isDragging effects
        {...attributes}
        {...listeners}
        className="mb-3 cursor-grab"
      >
        <div className="pb-4 border-b border-gray-200 mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-lg text-text-DEFAULT">{title}</h3>
          {priority !== undefined && priority !== null && (
            <span
              className={`inline-block w-3 h-3 rounded-full ${
                priority === 1 ? 'bg-red-500' : priority === 2 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              title={`Priority: ${priority}`}
            ></span>
          )}
        </div>
        <div className="pt-4 text-text-DEFAULT text-opacity-80">
          <p className="text-sm mb-1">{description}</p>
          <p><strong>Status:</strong> {status}</p>
          {priority && <p><strong>Priority:</strong> {priority}</p>}
          {formattedDueDate && <p><strong>Due Date:</strong> {formattedDueDate}</p>}
          <div className="flex space-x-2 mt-2">
            <AnimatedButton
              onClick={() => onEditTask({ id, title, description, priority, due_date, status, user_id, created_at, updated_at })}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
              aria-label={`Edit task: ${title}`}
            >
              Edit
            </AnimatedButton>
            <AnimatedButton
              onClick={() => onDeleteTask(id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
              aria-label={`Delete task: ${title}`}
            >
              Delete
            </AnimatedButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

