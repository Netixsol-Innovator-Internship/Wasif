import { useEffect, useState, useMemo } from "react";
import { getAllTasks, createTask, updateTask, deleteTask } from "../apis/tasks";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskStats from "./components/TaskStats";
import type { Task } from "./types";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getAllTasks();
      setTasks(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to load tasks");
    }
  };

  const handleAddTask = async (title: string) => {
    try {
      await createTask(title);
      fetchTasks();
    } catch (err: any) {
      setError(err.message || "Failed to add task");
    }
  };

  const handleClearAll = async () => {
    try {
      await Promise.all(tasks.map((t) => deleteTask(t._id)));
      setTasks([]);
    } catch (err: any) {
      setError(err.message || "Failed to clear tasks");
    }
  };

  const handleToggle = async (task: Task) => {
    try {
      await updateTask(task._id, task.title, !task.completed);
      fetchTasks();
    } catch (err: any) {
      setError(err.message || "Failed to update task");
    }
  };

  const handleEdit = async (id: string, title: string, completed: boolean) => {
    try {
      await updateTask(id, title, completed);
      fetchTasks();
    } catch (err: any) {
      setError(err.message || "Failed to edit task");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err: any) {
      setError(err.message || "Failed to delete task");
    }
  };

  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length;
    return { completed, pending: tasks.length - completed, total: tasks.length };
  }, [tasks]);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Todo App</h1>

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      <TaskInput onAdd={handleAddTask} onClearAll={handleClearAll} />

      <TaskStats stats={stats} />

      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
