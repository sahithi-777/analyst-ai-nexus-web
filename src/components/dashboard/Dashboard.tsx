
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Home, FileText, BarChart3, Settings, Sparkles, Upload, Brain, MessageSquare, TrendingUp, BookOpen, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const [showExploreGuide, setShowExploreGuide] = useState(true);

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

  // Explore Guide Component
  const ExploreGuide = () => (
    <Card className="mb-6 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-blue-500/30">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            <span>Explore AI Research Hub</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExploreGuide(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Upload className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">Upload Documents</h3>
              <p className="text-gray-400 text-xs mt-1">Start by uploading research papers, reports, or any documents you want to analyze</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">AI Analysis</h3>
              <p className="text-gray-400 text-xs mt-1">Get intelligent insights, theme extraction, and contradiction detection</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">Research Chat</h3>
              <p className="text-gray-400 text-xs mt-1">Ask questions about your documents and get instant AI-powered answers</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
            <BookOpen className="h-4 w-4 mr-2" />
            Get Started
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Main dashboard content
  const children = (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to AI Research Hub</h1>
        <p className="text-gray-400">Analyze documents with artificial intelligence</p>
      </div>
      
      {showExploreGuide && <ExploreGuide />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-sm">No recent activity yet. Start by uploading your first document!</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-400" />
              <span>Documents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-gray-400 text-sm">Documents uploaded</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-400" />
              <span>Analyses</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-gray-400 text-sm">Analyses completed</p>
            </div>
          </CardContent>
        </Card>
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
