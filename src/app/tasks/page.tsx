'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Task {
  id: string;
  text: string;
  dueDate: string | null;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load tasks from localStorage
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        const parsedTasks: Task[] = JSON.parse(storedTasks);
        setTasks(parsedTasks);
      } catch (e) {
        console.error('Error parsing stored tasks:', e);
      }
    }
    setLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const formatDueDate = (dateString: string | null) => {
    if (!dateString) return 'No due date';
    
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: today.getFullYear() !== date.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  return (
    <div className="bg-[#131925] text-white min-h-screen flex flex-col">
      <header className="p-6 flex justify-between items-center">
        <button 
          onClick={() => router.push('/')}
          className="text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold">All Tasks</h1>
        <div className="w-6"></div> {/* Spacer for alignment */}
      </header>
      
      <main className="flex-grow p-6">
        {loading ? (
          <div className="animate-pulse flex justify-center">Loading...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">No tasks available</p>
            <button 
              onClick={() => router.push('/new')}
              className="px-6 py-3 bg-indigo-600 rounded-lg text-white"
            >
              Create your first task
            </button>
          </div>
        ) : (
          <ul className="space-y-4">
            {tasks.map(task => (
              <li 
                key={task.id} 
                className="bg-gray-800 rounded-lg p-4 transition-all hover:bg-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p>{task.text}</p>
                    {task.dueDate && (
                      <p className="text-gray-400 text-sm mt-2">
                        {formatDueDate(task.dueDate)}
                      </p>
                    )}
                  </div>
                  <button 
                    onClick={() => handleDelete(task.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      
      <footer className="p-6 flex justify-center">
        <button
          onClick={() => router.push('/new')}
          className="w-12 h-12 flex items-center justify-center bg-indigo-600 rounded-full shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </footer>
    </div>
  );
}
