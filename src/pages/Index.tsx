
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading, demoMode } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user && !demoMode) {
      navigate('/auth');
    }
  }, [user, loading, demoMode, navigate]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if not authenticated and not in demo mode
  if (!user && !demoMode) {
    return null;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <MainContent />
      </div>
    </div>
  );
};

export default Index;
