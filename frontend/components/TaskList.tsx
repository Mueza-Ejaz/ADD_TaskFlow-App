import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from './TaskCard'; // Assuming TaskCard is in the same directory
import clsx from 'clsx'; // Import clsx for conditional class names
import { AnimatePresence } from 'framer-motion'; // Import AnimatePresence

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

interface TaskListProps {
  id: string; // Add id for droppable
  title: string;
  tasks: TaskRead[];
  status: string; // The status this column represents
  onEditTask: (task: TaskRead) => void;
  onDeleteTask: (taskId: number) => void; // Add onDeleteTask prop
  activeId: string | number | null; // Added activeId prop
}

export const TaskList: React.FC<TaskListProps> = ({ id, title, tasks, status, onEditTask, onDeleteTask, activeId }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        "bg-surface backdrop-blur-md border border-opacity-20 border-white-500 shadow-lg p-4 rounded-lg w-80 flex-shrink-0", // Glassmorphism styles
        isOver && "ring-2 ring-primary-dark ring-opacity-50" // A more subtle ring for drag-over effect
      )}
    >
      <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-text-DEFAULT">{title} ({tasks.length})</h3>
      <div className="space-y-3">
        <AnimatePresence>
          {tasks.filter(task => task.status === status).map((task) => (
            <TaskCard key={task.id} {...task} onEditTask={onEditTask} onDeleteTask={onDeleteTask} isDragging={task.id === activeId} /> // Pass isDragging
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
