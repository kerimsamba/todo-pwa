'use client';

import { useRouter } from 'next/navigation';
import TaskList from '@/components/task-list';

export default function Tasks() {
  const router = useRouter();

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
        <TaskList />
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
