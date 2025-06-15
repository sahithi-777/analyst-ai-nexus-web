
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Home, FileText, BarChart3, Settings } from 'lucide-react';

const Dashboard = () => {
  // Simple sidebar content
  const sidebar = (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-sm opacity-90"></div>
        </div>
        <span className="text-white font-semibold">Dashboard</span>
      </div>
      
      <nav className="space-y-2">
        <div className="flex items-center space-x-3 p-2 rounded-lg bg-blue-600/20 text-blue-400">
          <Home className="h-4 w-4" />
          <span>Home</span>
        </div>
        <div className="flex items-center space-x-3 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 cursor-pointer">
          <FileText className="h-4 w-4" />
          <span>Documents</span>
        </div>
        <div className="flex items-center space-x-3 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 cursor-pointer">
          <BarChart3 className="h-4 w-4" />
          <span>Analytics</span>
        </div>
        <div className="flex items-center space-x-3 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 cursor-pointer">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </div>
      </nav>
    </div>
  );

  // Main dashboard content
  const children = (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to AI Research Hub</h1>
        <p className="text-gray-400">Analyze documents with artificial intelligence</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-2">Quick Upload</h3>
          <p className="text-gray-400 text-sm mb-4">Upload documents for analysis</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
            Upload Files
          </button>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-2">Recent Analysis</h3>
          <p className="text-gray-400 text-sm mb-4">View your latest insights</p>
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm">
            View Results
          </button>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-2">Smart Chat</h3>
          <p className="text-gray-400 text-sm mb-4">Ask questions about your documents</p>
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm">
            Start Chat
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout sidebar={sidebar}>
      {children}
    </DashboardLayout>
  );
};

export default Dashboard;
