'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addTask } from '@/lib/tasks';

export default function NewTask() {
  const [taskText, setTaskText] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskText.trim()) return;
    
    // Add the new task
    addTask(taskText);
    
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
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-8 text-center">Add a new task</h1>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <textarea
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="What needs to be done?"
              rows={4}
              className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:outline-none resize-none"
              required
            />
            
            <button 
              type="submit"
              className="w-full py-4 bg-indigo-600 rounded-lg font-semibold"
            >
              Add Task
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
