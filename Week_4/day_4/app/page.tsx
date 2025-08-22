"use client";
import { useState } from "react";
import { 
  FaCheckCircle, 
  FaClock, 
  FaChartBar, 
  FaPlus, 
  FaTrash, 
  FaCheck, 
  FaExclamationCircle,
  FaClipboardList 
} from "react-icons/fa";
import {
  useFetchTasksQuery,
  useAddTaskMutation,
  useToggleTaskMutation,
  useRemoveTaskMutation,
} from "../app/services/taskApi";

export default function HomePage() {
  const { data: tasks = [], error, isLoading } = useFetchTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [toggleTask] = useToggleTaskMutation();
  const [removeTask] = useRemoveTaskMutation();
  const [title, setTitle] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addTask(title);
    setTitle("");
  };

  const stats = {
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
    total: tasks.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto pt-12 pb-20 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <FaCheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Your Daily Life Companion
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Stay organized and productive with your personal task manager
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Input Section */}
          <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What needs to be done today?"
                  onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                  className="w-full p-4 pl-5 pr-4 text-gray-800 placeholder-gray-500 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm transition-all duration-200 text-lg"
                />
              </div>
              <button
                onClick={handleAdd}
                disabled={!title.trim()}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-2xl hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                <FaPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Task</span>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
              <div className="flex items-center">
                <FaExclamationCircle className="w-5 h-5 text-red-500 mr-3" />
                <span className="text-red-700 font-medium">Failed to load tasks</span>
              </div>
            </div>
          )}

          {/* Stats Section */}
          <div className="p-8 border-b border-gray-100">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-2xl mb-3">
                  <FaCheck className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stats.completed}</div>
                <div className="text-sm text-gray-500 font-medium">Completed</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-2xl mb-3">
                  <FaClock className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stats.pending}</div>
                <div className="text-sm text-gray-500 font-medium">Pending</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-2xl mb-3">
                  <FaChartBar className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stats.total}</div>
                <div className="text-sm text-gray-500 font-medium">Total</div>
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="p-8">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mr-3"></div>
                  <span className="text-gray-600 font-medium">Loading your tasks...</span>
                </div>
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                  <FaClipboardList className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks yet</h3>
                <p className="text-gray-500">Add your first task above to get started on your productivity journey!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((t) => (
                  <div
                    key={t.id}
                    className={`group flex items-center justify-between p-5 border-2 rounded-2xl transition-all duration-200 ${
                      t.completed 
                        ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                        : 'border-gray-200 bg-white hover:border-indigo-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <label className="relative flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={t.completed}
                          onChange={() => toggleTask(t)}
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                          t.completed 
                            ? 'border-green-500 bg-green-500' 
                            : 'border-gray-300 group-hover:border-indigo-400'
                        }`}>
                          {t.completed && (
                            <FaCheck className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </label>
                      <span
                        className={`text-lg font-medium transition-all duration-200 truncate ${
                          t.completed 
                            ? "line-through text-gray-500" 
                            : "text-gray-800"
                        }`}
                      >
                        {t.title}
                      </span>
                    </div>
                    <button
                      onClick={() => removeTask(t.id)}
                      className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                      title="Delete task"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {tasks.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">Progress</span>
              <span className="text-sm font-semibold text-gray-600">
                {Math.round((stats.completed / stats.total) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(stats.completed / stats.total) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}