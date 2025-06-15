
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Home, FileText, BarChart3, Settings, Sparkles, Upload, Brain, MessageSquare, TrendingUp, BookOpen, X, Plus, Activity, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WelcomeGuide from './WelcomeGuide';
import EnhancedUploadArea from '@/components/upload/EnhancedUploadArea';
import IntelligentAnalysisInterface from '@/components/analysis/IntelligentAnalysisInterface';
import AdvancedChatInterface from '@/components/chat/AdvancedChatInterface';
import { SmartProcessedFile, IntelligentAnalysis } from '@/utils/intelligentFileProcessor';

const Dashboard = () => {
  const [showExploreGuide, setShowExploreGuide] = useState(true);
  const [showWelcomeGuide, setShowWelcomeGuide] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [processedFiles, setProcessedFiles] = useState<SmartProcessedFile[]>([]);
  const [analysisResults, setAnalysisResults] = useState<IntelligentAnalysis | null>(null);

  // Navigation handler
  const handleNavigation = (section: string) => {
    setActiveSection(section);
    console.log(`Navigating to ${section}`);
  };

  // Handle files processed from upload area
  const handleFilesProcessed = (files: SmartProcessedFile[]) => {
    setProcessedFiles(files);
    console.log('Files processed:', files);
  };

  // Handle analysis completion
  const handleAnalysisComplete = (results: IntelligentAnalysis) => {
    setAnalysisResults(results);
    console.log('Analysis completed:', results);
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
          onClick={() => handleNavigation('chat')}
          className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
            activeSection === 'chat' 
              ? 'bg-cyan-600/20 text-cyan-400' 
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          <span>Research Chat</span>
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
            <span>Intelligent Research Analysis</span>
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
              <h3 className="text-white font-medium">Smart Upload</h3>
              <p className="text-gray-400 text-sm mt-1">Upload documents for intelligent metadata extraction and contextual analysis</p>
              <Badge className="mt-2 bg-green-600/20 text-green-400 border-green-600/30">AI-Powered</Badge>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">Intelligent Analysis</h3>
              <p className="text-gray-400 text-sm mt-1">Advanced AI analysis with contextual insights, contradictions, and connections</p>
              <Badge className="mt-2 bg-purple-600/20 text-purple-400 border-purple-600/30">Advanced AI</Badge>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">Research Assistant</h3>
              <p className="text-gray-400 text-sm mt-1">Chat with AI about your documents with citations and smart suggestions</p>
              <Badge className="mt-2 bg-cyan-600/20 text-cyan-400 border-cyan-600/30">Interactive</Badge>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button 
            onClick={() => setShowWelcomeGuide(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Take Complete Tour
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
              <h1 className="text-3xl font-bold text-white mb-2">Document Management</h1>
              <p className="text-gray-400">Upload and manage your research documents with intelligent processing</p>
            </div>
            
            <EnhancedUploadArea
              onFilesProcessed={handleFilesProcessed}
              maxFiles={10}
              maxSize={10 * 1024 * 1024}
            />

            {processedFiles.length > 0 && (
              <IntelligentAnalysisInterface
                processedFiles={processedFiles}
                onAnalysisComplete={handleAnalysisComplete}
              />
            )}
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
              <p className="text-gray-400">View comprehensive analytics and insights from your research</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-400" />
                    <span>Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">{processedFiles.length}</p>
                    <p className="text-gray-400 text-sm">Total uploaded</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    <span>Confidence Score</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">
                      {processedFiles.length > 0 
                        ? Math.round(processedFiles.reduce((sum, f) => sum + (f.metadata?.confidenceScore || 0), 0) / processedFiles.length)
                        : '--'
                      }%
                    </p>
                    <p className="text-gray-400 text-sm">Average accuracy</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-purple-400" />
                    <span>Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">
                      {analysisResults?.summary.keyInsights.length || 0}
                    </p>
                    <p className="text-gray-400 text-sm">Generated insights</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-orange-400" />
                    <span>Processing</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">
                      {analysisResults?.statistics.processingTime || '--'}
                    </p>
                    <p className="text-gray-400 text-sm">Average time</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {analysisResults && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Analysis Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Document Categories</h4>
                      {Object.entries(analysisResults.summary.documentTypes).map(([type, count]) => (
                        <div key={type} className="flex justify-between items-center py-1">
                          <span className="text-gray-400">{type}</span>
                          <Badge variant="outline" className="text-gray-300">{count}</Badge>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Key Topics</h4>
                      {analysisResults.summary.primaryTopics.slice(0, 4).map((topic, idx) => (
                        <div key={idx} className="py-1">
                          <Badge variant="outline" className="text-gray-300">{topic}</Badge>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Analysis Stats</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Connections:</span>
                          <span className="text-white">{analysisResults.connections.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Contradictions:</span>
                          <span className="text-white">{analysisResults.contradictions.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Research Gaps:</span>
                          <span className="text-white">{analysisResults.gaps.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'chat':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Research Assistant</h1>
              <p className="text-gray-400">Chat with AI about your documents and get intelligent insights</p>
            </div>
            
            <AdvancedChatInterface
              hasDocuments={processedFiles.length > 0}
              documents={processedFiles.map(f => f.name)}
            />
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
              <p className="text-gray-400">Intelligent document analysis powered by advanced AI</p>
            </div>
            
            {showExploreGuide && <ExploreGuide />}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer" onClick={() => handleNavigation('documents')}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-green-400" />
                    <span>Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{processedFiles.length}</p>
                    <p className="text-gray-400 text-sm">Documents processed</p>
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
                    <p className="text-2xl font-bold text-white">{analysisResults?.summary.keyInsights.length || 0}</p>
                    <p className="text-gray-400 text-sm">Insights generated</p>
                    <Button variant="ghost" className="mt-2 text-purple-400 hover:text-purple-300">
                      View Analytics →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer" onClick={() => handleNavigation('chat')}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-cyan-400" />
                    <span>Research Chat</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">🤖</p>
                    <p className="text-gray-400 text-sm">AI assistant ready</p>
                    <Button variant="ghost" className="mt-2 text-cyan-400 hover:text-cyan-300">
                      Start Chatting →
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
