
import React, { useState } from 'react';
import { Brain, FileText, BarChart3, Settings, Upload, Network, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import WelcomeGuide from './WelcomeGuide';
import RealUploadArea from '@/components/upload/RealUploadArea';
import RealAnalysisInterface from '@/components/analysis/RealAnalysisInterface';
import RealChatInterface from '@/components/chat/RealChatInterface';
import IntelligentKnowledgeGraph from '@/components/knowledge/IntelligentKnowledgeGraph';
import { RealProcessedFile, RealAnalysisResult } from '@/utils/realAiProcessor';

const RealDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [showGuide, setShowGuide] = useState(true);
  const [processedFiles, setProcessedFiles] = useState<RealProcessedFile[]>([]);
  const [analysisResults, setAnalysisResults] = useState<RealAnalysisResult | null>(null);

  const handleFilesProcessed = (files: RealProcessedFile[]) => {
    setProcessedFiles(files);
  };

  const handleAnalysisComplete = (results: RealAnalysisResult) => {
    setAnalysisResults(results);
  };

  const handleGetStarted = () => {
    setActiveSection('documents');
  };

  const completedFiles = processedFiles.filter(f => f.status === 'completed');
  const avgConfidence = completedFiles.length > 0 
    ? Math.round(completedFiles.reduce((sum, f) => sum + f.metadata.confidenceScore, 0) / completedFiles.length)
    : 0;

  const stats = [
    {
      title: 'Documents Analyzed',
      value: completedFiles.length.toString(),
      change: completedFiles.length > 0 ? '+100%' : '0%',
      icon: FileText,
      color: 'text-blue-400'
    },
    {
      title: 'Claude AI Confidence',
      value: `${avgConfidence}%`,
      change: avgConfidence > 0 ? '+AI' : '0%',
      icon: Brain,
      color: 'text-green-400'
    },
    {
      title: 'AI Insights Generated',
      value: analysisResults?.summary.keyInsights.length.toString() || '0',
      change: analysisResults?.summary.keyInsights.length ? '+Claude' : '0%',
      icon: TrendingUp,
      color: 'text-purple-400'
    },
    {
      title: 'Knowledge Connections',
      value: analysisResults?.connections.length.toString() || '0',
      change: analysisResults?.connections.length ? '+Smart' : '0%',
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
                <CardTitle className="text-white">Claude AI Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => setActiveSection('documents')}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white h-12"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Upload for AI Analysis
                  </Button>
                  <Button
                    onClick={() => setActiveSection('analytics')}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 h-12"
                  >
                    <Brain className="h-5 w-5 mr-2" />
                    Claude Analysis
                  </Button>
                  <Button
                    onClick={() => setActiveSection('chat')}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 h-12"
                  >
                    <Brain className="h-5 w-5 mr-2" />
                    Chat with Claude
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent AI Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {completedFiles.length > 0 ? (
                  <div className="space-y-3">
                    {completedFiles.slice(0, 3).map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Brain className="h-5 w-5 text-cyan-400" />
                          <div>
                            <p className="text-white font-medium">{file.name}</p>
                            <p className="text-gray-400 text-sm">
                              {file.metadata.wordCount} words • {file.metadata.category}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className="bg-green-400/10 text-green-400">
                            {file.metadata.confidenceScore}% Claude confidence
                          </Badge>
                          <Badge className="bg-blue-400/10 text-blue-400">
                            AI Processed
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No documents analyzed with Claude yet</p>
                    <Button
                      onClick={() => setActiveSection('documents')}
                      className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                    >
                      Start Claude AI Analysis
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
                <h2 className="text-2xl font-bold text-white">Claude AI Document Processing</h2>
                <p className="text-gray-400 mt-1">Upload documents for intelligent analysis with Claude</p>
              </div>
            </div>
            <RealUploadArea 
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
                <h2 className="text-2xl font-bold text-white">Claude AI Analytics</h2>
                <p className="text-gray-400 mt-1">Intelligent document analysis powered by Claude</p>
              </div>
            </div>
            <RealAnalysisInterface 
              processedFiles={processedFiles}
              onAnalysisComplete={handleAnalysisComplete}
            />
          </div>
        );

      case 'chat':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Chat with Claude</h2>
                <p className="text-gray-400 mt-1">Ask Claude anything about your documents</p>
              </div>
            </div>
            <RealChatInterface 
              processedFiles={processedFiles}
              isEmbedded={true}
            />
          </div>
        );

      case 'knowledge':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">AI Knowledge Graph</h2>
                <p className="text-gray-400 mt-1">Visualize connections discovered by Claude</p>
              </div>
            </div>
            <IntelligentKnowledgeGraph processedFiles={processedFiles} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <WelcomeGuide 
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
        onGetStarted={handleGetStarted}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Claude AI Research Assistant</h1>
          <p className="text-gray-400 text-lg">Powered by Anthropic's Claude for intelligent document analysis</p>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'analytics', label: 'Claude Analysis', icon: Brain },
              { id: 'chat', label: 'Chat with Claude', icon: Brain },
              { id: 'knowledge', label: 'Knowledge Graph', icon: Network },
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

export default RealDashboard;
