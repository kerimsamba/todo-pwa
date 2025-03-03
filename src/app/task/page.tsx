'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Task {
  id: string;
  text: string;
  dueDate: string | null;
}

export default function Task() {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load tasks from localStorage
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        const tasks: Task[] = JSON.parse(storedTasks);
        if (tasks.length > 0) {
          // Pick a random task
          const randomIndex = Math.floor(Math.random() * tasks.length);
          setTask(tasks[randomIndex]);
        }
      } catch (e) {
        console.error('Error parsing stored tasks:', e);
      }
    }
    setLoading(false);
  }, []);

  const handleComplete = () => {
    if (!task) return;
    
    // Remove the completed task
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        const tasks: Task[] = JSON.parse(storedTasks);
        const updatedTasks = tasks.filter(t => t.id !== task.id);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      } catch (e) {
        console.error('Error updating tasks:', e);
      }
    }
    
    // Go back to home
    router.push('/');
  };
  
  const handleDefer = (days: number) => {
    if (!task) return;
    
    // Update the task's due date
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        const tasks: Task[] = JSON.parse(storedTasks);
        const updatedTasks = tasks.map(t => {
          if (t.id === task.id) {
            const newDueDate = new Date();
            newDueDate.setDate(newDueDate.getDate() + days);
            return { ...t, dueDate: newDueDate.toISOString() };
          }
          return t;
        });
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      } catch (e) {
        console.error('Error updating tasks:', e);
      }
    }
    
    // Go back to home
    router.push('/');
  };
  
  const handleDelete = () => {
    if (!task) return;
    
    // Remove the task
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        const tasks: Task[] = JSON.parse(storedTasks);
        const updatedTasks = tasks.filter(t => t.id !== task.id);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      } catch (e) {
        console.error('Error updating tasks:', e);
      }
    }
    
    // Go back to home
    router.push('/');
  };

  return (
    <div className="bg-[#131925] text-white min-h-screen flex flex-col">
      <header className="p-6">
        <button 
          onClick={() => router.push('/')}
          className="text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        {loading ? (
          <div className="animate-pulse">Loading...</div>
        ) : !task ? (
          <div className="text-center">
            <p className="text-2xl mb-6">No tasks available</p>
            <button 
              onClick={() => router.push('/new')}
              className="px-6 py-3 bg-indigo-600 rounded-lg text-white"
            >
              Create a task
            </button>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <div className="text-3xl font-semibold text-center mb-12">
              {task.text}
            </div>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleComplete}
                className="w-full py-4 bg-green-600 rounded-lg font-semibold"
              >
                Complete
              </button>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleDefer(1)}
                  className="flex-1 py-3 bg-gray-700 rounded-lg"
                >
                  Tomorrow
                </button>
                <button 
                  onClick={() => handleDefer(7)}
                  className="flex-1 py-3 bg-gray-700 rounded-lg"
                >
                  Next week
                </button>
                <button 
                  onClick={() => handleDefer(30)}
                  className="flex-1 py-3 bg-gray-700 rounded-lg"
                >
                  Next month
                </button>
              </div>
              
              <button 
                onClick={handleDelete}
                className="w-full py-3 mt-6 border border-red-600 text-red-600 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
