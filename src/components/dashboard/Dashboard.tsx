
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Home, FileText, BarChart3, Settings, Sparkles, Upload, Brain, MessageSquare, TrendingUp, BookOpen, X, Plus, Activity, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WelcomeGuide from './WelcomeGuide';

const Dashboard = () => {
  const [showExploreGuide, setShowExploreGuide] = useState(true);
  const [showWelcomeGuide, setShowWelcomeGuide] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Navigation handler
  const handleNavigation = (section: string) => {
    setActiveSection(section);
    console.log(`Navigating to ${section}`);
  };

  // Simple sidebar content with functional navigation
  const sidebar = (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-semibold">AI Research Hub</span>
      </div>
      
      <nav className="space-y-2">
        <button
          onClick={() => handleNavigation('dashboard')}
          className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
            activeSection === 'dashboard' 
              ? 'bg-blue-600/20 text-blue-400' 
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }`}
        >
          <Home className="h-4 w-4" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => handleNavigation('documents')}
          className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
            activeSection === 'documents' 
              ? 'bg-green-600/20 text-green-400' 
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Documents</span>
        </button>
        <button
          onClick={() => handleNavigation('analytics')}
          className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
            activeSection === 'analytics' 
              ? 'bg-purple-600/20 text-purple-400' 
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Analytics</span>
        </button>
        <button
          onClick={() => handleNavigation('settings')}
          className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
            activeSection === 'settings' 
              ? 'bg-orange-600/20 text-orange-400' 
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }`}
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );

  // Enhanced Explore Guide Component
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
          <div className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">Upload Documents</h3>
              <p className="text-gray-400 text-sm mt-1">Start by uploading research papers, reports, or any documents you want to analyze</p>
              <Badge className="mt-2 bg-green-600/20 text-green-400 border-green-600/30">Step 1</Badge>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">AI Analysis</h3>
              <p className="text-gray-400 text-sm mt-1">Get intelligent insights, theme extraction, and contradiction detection</p>
              <Badge className="mt-2 bg-purple-600/20 text-purple-400 border-purple-600/30">Step 2</Badge>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">Research Chat</h3>
              <p className="text-gray-400 text-sm mt-1">Ask questions about your documents and get instant AI-powered answers</p>
              <Badge className="mt-2 bg-cyan-600/20 text-cyan-400 border-cyan-600/30">Step 3</Badge>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button 
            onClick={() => setShowWelcomeGuide(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Take Full Tour
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Render different content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'documents':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Documents</h1>
              <p className="text-gray-400">Manage and analyze your research documents</p>
            </div>
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-green-400" />
                  <span>Document Library</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No documents uploaded yet</p>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
              <p className="text-gray-400">View insights and analytics from your research</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-400" />
                    <span>Analysis Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">0</p>
                    <p className="text-gray-400 text-sm">Analyses this month</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    <span>Success Rate</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">--</p>
                    <p className="text-gray-400 text-sm">Average accuracy</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-purple-400" />
                    <span>Processing Time</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">--</p>
                    <p className="text-gray-400 text-sm">Average time</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
              <p className="text-gray-400">Configure your AI Research Hub preferences</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-400" />
                    <span>Account Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Display Name</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white" 
                      placeholder="Your display name"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email Notifications</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <input type="checkbox" className="rounded" />
                      <span className="text-white text-sm">Enable email notifications</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-purple-400" />
                    <span>AI Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Analysis Depth</label>
                    <select className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white">
                      <option>Standard</option>
                      <option>Deep Analysis</option>
                      <option>Quick Scan</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Auto-save Results</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-white text-sm">Automatically save analysis results</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome to AI Research Hub</h1>
              <p className="text-gray-400">Analyze documents with artificial intelligence</p>
            </div>
            
            {showExploreGuide && <ExploreGuide />}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer" onClick={() => handleNavigation('documents')}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-green-400" />
                    <span>Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">0</p>
                    <p className="text-gray-400 text-sm">Documents uploaded</p>
                    <Button variant="ghost" className="mt-2 text-green-400 hover:text-green-300">
                      Manage Documents →
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer" onClick={() => handleNavigation('analytics')}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-purple-400" />
                    <span>Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">0</p>
                    <p className="text-gray-400 text-sm">Analyses completed</p>
                    <Button variant="ghost" className="mt-2 text-purple-400 hover:text-purple-300">
                      View Analytics →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer" onClick={() => handleNavigation('settings')}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-orange-400" />
                    <span>Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">⚙️</p>
                    <p className="text-gray-400 text-sm">Configure preferences</p>
                    <Button variant="ghost" className="mt-2 text-orange-400 hover:text-orange-300">
                      Open Settings →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <DashboardLayout sidebar={sidebar}>
        {renderContent()}
      </DashboardLayout>
      
      <WelcomeGuide
        isOpen={showWelcomeGuide}
        onClose={() => setShowWelcomeGuide(false)}
        onGetStarted={() => {
          setShowWelcomeGuide(false);
          setShowExploreGuide(true);
        }}
      />
    </>
  );
};

export default Dashboard;
