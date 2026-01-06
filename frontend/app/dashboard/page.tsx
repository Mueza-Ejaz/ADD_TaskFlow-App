"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, Suspense } from "react"; // Import Suspense
import dynamic from "next/dynamic"; // Import dynamic

import { Button } from "@/components/ui/Button";
// Dynamically import components
const DynamicModal = dynamic(() => import("@/components/ui/Modal").then((mod) => mod.Modal), {
  loading: () => <p>Loading modal...</p>,
  ssr: false,
});
const DynamicConfirmationModal = dynamic(() => import("@/components/ui/ConfirmationModal").then((mod) => mod.ConfirmationModal), {
  loading: () => <p>Loading confirmation...</p>,
  ssr: false,
});
const DynamicTaskForm = dynamic(() => import("@/components/TaskForm").then((mod) => mod.TaskForm), {
  loading: () => <p>Loading form...</p>,
  ssr: false,
});
const DynamicTaskKanban = dynamic(() => import("@/components/TaskKanban").then((mod) => mod.TaskKanban), {
  loading: () => <p>Loading tasks...</p>,
  ssr: false,
});
const DynamicEmptyState = dynamic(() => import("@/components/EmptyState").then((mod) => mod.EmptyState), {
  loading: () => <p>Loading empty state...</p>,
  ssr: false,
});

import { useCreateTask, useTasks, useUpdateTask, useDeleteTask } from "@/hooks/useTasks";
import { TaskRead } from "@/lib/api"; // Import TaskRead from api.ts

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskRead | null>(null); // State for task being edited
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false); // State for confirmation modal
  const [taskIdToDelete, setTaskIdToDelete] = useState<number | null>(null); // State for task ID to delete

  const { data: tasks, isLoading, isError } = useTasks();
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask(); // Initialize delete mutation

  const handleCreateTask = async (values: any) => {
    await createTaskMutation.mutateAsync(values);
    setIsModalOpen(false);
  };

  const handleUpdateTask = async (values: any) => {
    if (editingTask) {
      await updateTaskMutation.mutateAsync({ id: editingTask.id, ...values });
      setIsModalOpen(false);
      setEditingTask(null); // Clear editing task after update
    }
  };

  const handleDeleteTask = async () => {
    if (taskIdToDelete !== null) {
      await deleteTaskMutation.mutateAsync(taskIdToDelete);
      setShowConfirmDeleteModal(false);
      setTaskIdToDelete(null);
    }
  };

  const openEditModal = (task: TaskRead) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const openConfirmDeleteModal = (taskId: number) => {
    setTaskIdToDelete(taskId);
    setShowConfirmDeleteModal(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null); // Clear editing task when modal closes
  };

  const closeConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false);
    setTaskIdToDelete(null);
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading dashboard...</p>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {session.user?.name || session.user?.email}!</h1>
        <div className="flex space-x-4">
          <Button onClick={() => { setEditingTask(null); setIsModalOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm">
            Create New Task
          </Button>
          <Button onClick={() => signOut({ callbackUrl: "/login" })} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-sm">
            Log Out
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* Placeholder for TaskFilters component */}
        <section className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Task Filters (Placeholder)</h2>
          <div className="h-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-500">
            Filters will go here (T043)
          </div>
        </section>

        {/* Task Display */}
        <section className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Your Tasks</h2>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-96">
              <p className="text-lg text-gray-700">Loading tasks...</p>
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center min-h-96">
              <p className="text-lg text-red-500">Error loading tasks.</p>
            </div>
          ) : tasks && tasks.length > 0 ? (
            <Suspense fallback={<p>Loading Kanban...</p>}>
              <DynamicTaskKanban tasks={tasks} onEditTask={openEditModal} onDeleteTask={openConfirmDeleteModal} /> {/* Pass onDeleteTask */}
            </Suspense>
          ) : (
            <Suspense fallback={<p>Loading empty state...</p>}>
              <DynamicEmptyState />
            </Suspense>
          )}
        </section>
      </main>

      <Suspense fallback={<p>Loading task modal...</p>}>
        <DynamicModal isOpen={isModalOpen} onClose={closeModal} title={editingTask ? "Edit Task" : "Create New Task"}>
          <DynamicTaskForm 
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask} 
            defaultValues={editingTask || undefined} // Pass defaultValues for editing
          />
        </DynamicModal>
      </Suspense>

      <Suspense fallback={<p>Loading confirmation modal...</p>}>
        <DynamicConfirmationModal
          isOpen={showConfirmDeleteModal}
          onCancel={closeConfirmDeleteModal}
          onConfirm={handleDeleteTask}
          title="Confirm Delete"
          message="Are you sure you want to delete this task? This action cannot be undone."
          confirmText="Delete"
          isConfirming={deleteTaskMutation.isPending}
        />
      </Suspense>
    </div>
  );
}


