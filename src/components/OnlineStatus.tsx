'use client';

import { useState, useEffect } from 'react';

export default function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set initial status
    setIsOnline(navigator.onLine);
    
    // Only show the indicator when status changes
    if (!navigator.onLine) {
      setIsVisible(true);
    }

    // Add event listeners for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      setIsVisible(true);
      
      // Hide the indicator after 3 seconds when going back online
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setIsVisible(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  if (isOnline) {
    return (
      <div className="fixed top-4 right-4 px-3 py-1 bg-green-900 text-green-300 rounded-full text-sm font-medium flex items-center animate-fade-in-out">
        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
        Online
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 px-3 py-1 bg-red-900 text-red-300 rounded-full text-sm font-medium flex items-center">
      <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
      Offline
    </div>
  );
}