
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
