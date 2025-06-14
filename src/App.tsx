import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { NewLink } from './pages/NewLink';
import { Links } from './pages/Links';
import { LinkDetail } from './pages/LinkDetail';
import { LinkEdit } from './pages/LinkEdit';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { user, loading, isPrivateMode } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ClickSprout...</p>
          {isPrivateMode && (
            <p className="text-sm text-green-600 mt-2">Private Mode - Admin Access</p>
          )}
        </div>
      </div>
    );
  }

  // In private mode, always show the app
  if (isPrivateMode || user) {
    return (
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-link" element={<NewLink />} />
          <Route path="/links" element={<Links />} />
          <Route path="/links/:id" element={<LinkDetail />} />
          <Route path="/links/:id/edit" element={<LinkEdit />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AppLayout>
    );
  }

  // Fallback for public mode when not authenticated
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">ClickSprout</h1>
        <p className="text-gray-600">Authentication required</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;