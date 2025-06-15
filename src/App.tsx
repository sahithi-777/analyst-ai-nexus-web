
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/contexts/AuthContext';
import Landing from '@/pages/Landing';
import Auth from '@/pages/Auth';
import RealIndex from '@/pages/RealIndex';
import Profile from '@/pages/Profile';

function App() {
  const { user, demoMode, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route 
            path="/" 
            element={
              user || demoMode ? <Navigate to="/dashboard" replace /> : <Landing />
            } 
          />
          <Route 
            path="/auth" 
            element={
              user || demoMode ? <Navigate to="/dashboard" replace /> : <Auth />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              user || demoMode ? <RealIndex /> : <Navigate to="/auth" replace />
            } 
          />
          <Route 
            path="/profile" 
            element={
              user || demoMode ? <Profile /> : <Navigate to="/auth" replace />
            } 
          />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
