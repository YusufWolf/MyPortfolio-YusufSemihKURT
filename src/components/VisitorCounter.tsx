import { useEffect, useState } from 'react';
import { ref, onValue, set, serverTimestamp, get } from 'firebase/database';
import { database } from '../firebase/config';
import { Users } from 'lucide-react';

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const totalRef = ref(database, 'visitorCount/total');
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Check if this is a new visitor (using sessionStorage)
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      // Mark as visited in this session
      sessionStorage.setItem('hasVisited', 'true');
      
      // Add new visitor entry
      const newVisitorRef = ref(database, `visitors/${sessionId}`);
      set(newVisitorRef, {
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        language: navigator.language
      });

      // Increment total count
      get(totalRef).then((snapshot) => {
        const currentTotal = snapshot.exists() ? snapshot.val() : 0;
        set(totalRef, currentTotal + 1);
      });
    }

    // Listen for real-time updates
    const unsubscribe = onValue(totalRef, (snapshot) => {
      if (snapshot.exists()) {
        setVisitorCount(snapshot.val());
      } else {
        setVisitorCount(0);
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <Users className="h-4 w-4" />
        <span>...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
      <Users className="h-4 w-4" />
      <span className="font-medium">{visitorCount.toLocaleString()}</span>
      <span className="text-xs">visitors</span>
    </div>
  );
}

