'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPWA() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const promptEvent = e as BeforeInstallPromptEvent;
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(promptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
    promptInstall.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  };

  if (!supportsPWA) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-0 right-0 mx-auto w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-white">Install App</h3>
          <p className="text-sm text-gray-400">Install this app for quick access when offline.</p>
        </div>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
          onClick={handleInstallClick}
        >
          Install
        </button>
      </div>
    </div>
  );
}