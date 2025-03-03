import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import client components with no SSR
const InstallPWA = dynamic(() => import("@/components/InstallPWA"), {
  ssr: false,
});

const OnlineStatus = dynamic(() => import("@/components/OnlineStatus"), {
  ssr: false,
});

const TodoApp = dynamic(() => import("@/components/TodoApp"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <OnlineStatus />
      
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-md">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold mb-2">Todo PWA</h1>
          <p className="text-gray-600 dark:text-gray-400">
            A Todo List Progressive Web App
          </p>
        </div>
        
        <TodoApp />
        
        <div className="text-sm text-center opacity-75 mt-6">
          <p>This app works offline! Try turning off your internet connection.</p>
          <p className="mt-2">You can install this app on your device for quick access.</p>
        </div>
      </main>
      
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-500">
        <span>Built with Next.js</span>
        <span>•</span>
        <span>Works Offline</span>
        <span>•</span>
        <span>Installable</span>
      </footer>
      
      <InstallPWA />
    </div>
  );
}
