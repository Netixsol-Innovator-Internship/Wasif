import { useEffect, useMemo, useState } from "react";
import type { Task } from "./types";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial tasks from API
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();
        setTasks(data);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addTask = async () => {
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Task title is required");
      return;
    }
    try {
      setError(null);
      const created = await createTask(trimmed);
      setTasks(prev => [created, ...prev]);
      setTitle("");
    } catch (e: any) {
      setError(e?.response?.data?.message ?? e?.message ?? "Failed to add task");
    }
  };

  const toggleTask = async (task: Task) => {
    try {
      const updated = await updateTask(task.id, { completed: !task.completed });
      setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    } catch (e: any) {
      setError(e?.response?.data?.message ?? e?.message ?? "Failed to update task");
    }
  };

  const removeTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (e: any) {
      setError(e?.response?.data?.message ?? e?.message ?? "Failed to delete task");
    }
  };

  const stats = useMemo(() => {
    const completed = tasks.filter(t => t.completed).length;
    const pending = tasks.length - completed;
    return { completed, pending, total: tasks.length };
  }, [tasks]);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Daily Life Companion</h1>

      {/* Input section */}
      <div className="flex gap-3 mb-4">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          onKeyDown={e => e.key === "Enter" && addTask()}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={addTask}
          className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Add
        </button>
      </div>

      {/* Error message */}
      {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

      {/* Stats */}
      <div className="mb-6 text-gray-600 text-center">
        <span className="font-semibold">{stats.completed}</span> completed ·{" "}
        <span className="font-semibold">{stats.pending}</span> pending ·{" "}
        <span className="font-semibold">{stats.total}</span> total
      </div>

      {/* Task list */}
      {loading ? (
        <div className="text-center text-gray-500">Loading…</div>
      ) : tasks.length === 0 ? (
        <div className="text-center text-gray-400">No tasks yet. Add your first task above.</div>
      ) : (
        <ul className="grid gap-3">
          {tasks.map(t => (
            <li
              key={t.id}
              className="flex items-center justify-between gap-4 p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleTask(t)}
                  className="w-5 h-5 accent-indigo-600"
                />
                <span className={`text-gray-900 ${t.completed ? "line-through text-gray-400" : ""}`}>
                  {t.title}
                </span>
              </div>
              <button
                onClick={() => removeTask(t.id)}
                title="Delete"
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg text-red-600 hover:bg-red-50 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
