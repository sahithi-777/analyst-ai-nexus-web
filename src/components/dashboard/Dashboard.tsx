import React, { useState } from 'react';
import { Brain, FileText, BarChart3, Settings, Upload, Network, Eye, TrendingUp, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import WelcomeGuide from './WelcomeGuide';
import EnhancedUploadArea from '@/components/upload/EnhancedUploadArea';
import IntelligentAnalysisInterface from '@/components/analysis/IntelligentAnalysisInterface';
import IntelligentKnowledgeGraph from '@/components/knowledge/IntelligentKnowledgeGraph';
import { SmartProcessedFile, IntelligentAnalysis } from '@/utils/intelligentFileProcessor';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [showGuide, setShowGuide] = useState(true);
  const [processedFiles, setProcessedFiles] = useState<SmartProcessedFile[]>([]);
  const [analysisResults, setAnalysisResults] = useState<IntelligentAnalysis | null>(null);

  const handleFilesProcessed = (files: SmartProcessedFile[]) => {
    setProcessedFiles(files);
  };

  const handleAnalysisComplete = (results: IntelligentAnalysis) => {
    setAnalysisResults(results);
  };

  const stats = [
    {
      title: 'Documents Processed',
      value: processedFiles.length.toString(),
      change: processedFiles.length > 0 ? '+100%' : '0%',
      icon: FileText,
      color: 'text-blue-400'
    },
    {
      title: 'Analysis Confidence',
      value: processedFiles.length > 0 
        ? `${Math.round(processedFiles.reduce((sum, f) => sum + f.metadata.confidenceScore, 0) / processedFiles.length)}%`
        : '0%',
      change: '+5%',
      icon: Brain,
      color: 'text-green-400'
    },
    {
      title: 'Insights Generated',
      value: analysisResults?.summary.keyInsights.length.toString() || '0',
      change: analysisResults?.summary.keyInsights.length ? '+25%' : '0%',
      icon: TrendingUp,
      color: 'text-purple-400'
    },
    {
      title: 'Knowledge Nodes',
      value: processedFiles.length > 0 ? (processedFiles.length * 2 + 5).toString() : '0',
      change: processedFiles.length > 0 ? '+15%' : '0%',
      icon: Network,
      color: 'text-cyan-400'
    }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                        <p className="text-white text-2xl font-bold mt-2">{stat.value}</p>
                        <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
                      </div>
                      <div className={`p-3 rounded-full bg-gray-700 ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => setActiveSection('documents')}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white h-12"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Documents
                  </Button>
                  <Button
                    onClick={() => setActiveSection('analytics')}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 h-12"
                  >
                    <Brain className="h-5 w-5 mr-2" />
                    AI Analysis
                  </Button>
                  <Button
                    onClick={() => setActiveSection('knowledge')}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 h-12"
                  >
                    <Network className="h-5 w-5 mr-2" />
                    Knowledge Graph
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {processedFiles.length > 0 ? (
                  <div className="space-y-3">
                    {processedFiles.slice(0, 3).map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-400" />
                          <div>
                            <p className="text-white font-medium">{file.name}</p>
                            <p className="text-gray-400 text-sm">
                              {file.metadata.wordCount} words • {file.metadata.category}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-green-400/10 text-green-400">
                          {file.metadata.confidenceScore}% confidence
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No documents uploaded yet</p>
                    <Button
                      onClick={() => setActiveSection('documents')}
                      className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                    >
                      Upload Your First Document
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Document Management</h2>
                <p className="text-gray-400 mt-1">Upload and process documents for intelligent analysis</p>
              </div>
            </div>
            <EnhancedUploadArea 
              onFilesProcessed={handleFilesProcessed}
              maxFiles={10}
              maxSize={10 * 1024 * 1024}
            />
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">AI Analytics</h2>
                <p className="text-gray-400 mt-1">Intelligent document analysis and insights</p>
              </div>
            </div>
            <IntelligentAnalysisInterface 
              processedFiles={processedFiles}
              onAnalysisComplete={handleAnalysisComplete}
            />
          </div>
        );

      case 'knowledge':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Knowledge Graph</h2>
                <p className="text-gray-400 mt-1">Visualize relationships and connections between your documents</p>
              </div>
            </div>
            <IntelligentKnowledgeGraph processedFiles={processedFiles} />
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Settings</h2>
                <p className="text-gray-400 mt-1">Configure your AI research assistant</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Analysis Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-gray-300 text-sm font-medium">Analysis Depth</label>
                    <select className="w-full bg-gray-700 border-gray-600 text-white rounded px-3 py-2">
                      <option>Standard Analysis</option>
                      <option>Deep Analysis</option>
                      <option>Quick Overview</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-300 text-sm font-medium">Confidence Threshold</label>
                    <select className="w-full bg-gray-700 border-gray-600 text-white rounded px-3 py-2">
                      <option>High (90%+)</option>
                      <option>Medium (70%+)</option>
                      <option>Low (50%+)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Export Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-gray-300 text-sm font-medium">Default Export Format</label>
                    <select className="w-full bg-gray-700 border-gray-600 text-white rounded px-3 py-2">
                      <option>JSON</option>
                      <option>CSV</option>
                      <option>PDF Report</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-300 text-sm font-medium">Include Raw Data</label>
                    <select className="w-full bg-gray-700 border-gray-600 text-white rounded px-3 py-2">
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {showGuide && (
        <WelcomeGuide onComplete={() => setShowGuide(false)} />
      )}

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">AI Research Assistant</h1>
          <p className="text-gray-400 text-lg">Intelligent document analysis and knowledge discovery</p>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'analytics', label: 'Analytics', icon: Brain },
              { id: 'knowledge', label: 'Knowledge Graph', icon: Network },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all
                  ${activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }
                `}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
