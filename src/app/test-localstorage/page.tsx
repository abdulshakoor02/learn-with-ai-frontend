'use client';

import { useEffect, useState } from 'react';

export default function TestLocalStoragePage() {
  const [localStorageData, setLocalStorageData] = useState<{ [key: string]: string | null }>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check all localStorage data
    const data: { [key: string]: string | null } = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        data[key] = localStorage.getItem(key);
      }
    }
    setLocalStorageData(data);
  }, []);

  const clearAllLocalStorage = () => {
    localStorage.clear();
    setLocalStorageData({});
  };

  const checkSpecificKeys = () => {
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    alert(`accessToken: ${accessToken ? 'Found' : 'Not found'}\nuser: ${user ? 'Found' : 'Not found'}`);
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">LocalStorage Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-primary p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-4">All LocalStorage Data</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {Object.keys(localStorageData).length === 0 ? (
                <p className="text-white/70">No data in localStorage</p>
              ) : (
                Object.entries(localStorageData).map(([key, value]) => (
                  <div key={key} className="p-3 bg-white/10 rounded-lg">
                    <div className="font-mono text-sm text-purple-300">{key}</div>
                    <div className="text-xs text-white/80 break-all mt-1">
                      {value || 'null'}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="glass-primary p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={checkSpecificKeys}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Check accessToken & user keys
              </button>
              
              <button
                onClick={clearAllLocalStorage}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Clear All LocalStorage
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 glass-primary p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-4">Expected Keys</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-600/20 rounded-lg border border-green-500/30">
              <div className="font-mono text-green-300">accessToken</div>
              <div className="text-sm text-white/70 mt-1">JWT token from backend</div>
            </div>
            <div className="text-center p-4 bg-blue-600/20 rounded-lg border border-blue-500/30">
              <div className="font-mono text-blue-300">user</div>
              <div className="text-sm text-white/70 mt-1">User object (JSON string)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
