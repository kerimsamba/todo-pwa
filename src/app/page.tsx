import dynamic from "next/dynamic";

// Dynamically import client components with no SSR
const InstallPWA = dynamic(() => import("@/components/InstallPWA"), {
  ssr: false,
});

const OnlineStatus = dynamic(() => import("@/components/OnlineStatus"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="bg-[#131925] text-white flex flex-col min-h-screen">
      <OnlineStatus />
      
      <main className="flex flex-col items-center justify-center flex-grow">
        <button 
          className="text-6xl font-bold py-8 px-16 hover:text-gray-300 transition-colors"
          onClick={() => window.location.href = '/task'}
        >
          Do it!
        </button>
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 p-6 flex justify-between">
        <button 
          className="w-12 h-12 flex items-center justify-center"
          onClick={() => window.location.href = '/tasks'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        
        <button
          className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full"
          onClick={() => window.location.href = '/new'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </footer>
      
      <InstallPWA />
    </div>
  );
}
