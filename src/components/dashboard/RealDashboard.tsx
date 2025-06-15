
import React, { useState } from 'react';
import { Brain, FileText, MessageSquare, Upload as UploadIcon, ChartBar, Lightbulb } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from '@/hooks/use-toast';
import RealUploadArea from '@/components/upload/RealUploadArea';
import RealAnalysisInterface from '@/components/analysis/RealAnalysisInterface';
import RealChatInterface from '@/components/chat/RealChatInterface';
import { RealProcessedFile, RealAnalysisResult } from '@/utils/realAiProcessor';
import IntelligentQuestionGenerator from '@/components/research/IntelligentQuestionGenerator';
import UserProfileDropdown from '@/components/profile/UserProfileDropdown';

const RealDashboard = () => {
  const [processedFiles, setProcessedFiles] = useState<RealProcessedFile[]>([]);
  const [analysisResults, setAnalysisResults] = useState<RealAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "analysis" | "chat" | "questions">("upload");
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);
  const { toast } = useToast();

  const handleFilesProcessed = (files: RealProcessedFile[]) => {
    setProcessedFiles(files);
    // Auto-switch to analysis tab when files are processed
    if (files.length > 0 && files.some(f => f.status === 'completed')) {
      toast({
        title: "Documents Ready",
        description: "Your documents have been processed and are ready for Claude analysis",
      });
    }
  };

  const handleAnalysisComplete = (results: RealAnalysisResult) => {
    setAnalysisResults(results);
    toast({
      title: "Claude Analysis Complete",
      description: `Generated ${results.summary.keyInsights.length} insights from your documents`,
    });
  };

  const handleQuestionsGenerated = (questions: any[]) => {
    setGeneratedQuestions(questions);
  };

  const handleQuestionExecute = (question: string) => {
    setActiveTab('chat');
    setTimeout(() => {
      console.log('Executing question:', question);
      toast({
        title: "Question Sent to Claude",
        description: "Your research question is being processed",
      });
    }, 100);
  };

  const handleTabChange = (value: string) => {
    if (value === "upload" || value === "analysis" || value === "chat" || value === "questions") {
      setActiveTab(value);
    }
  };

  const handleNavigateToProfile = () => {
    window.location.href = '/profile';
  };

  // Calculate real statistics from actual data
  const totalWords = processedFiles.reduce((sum, file) => sum + (file.metadata?.wordCount || 0), 0);
  const completedFiles = processedFiles.filter(f => f.status === 'completed').length;
  const totalInsights = analysisResults?.summary.keyInsights.length || 0;
  const totalConnections = analysisResults?.connections.length || 0;
  const avgConfidence = processedFiles.length > 0 
    ? Math.round(processedFiles.reduce((sum, file) => sum + (file.metadata?.confidenceScore || 0), 0) / processedFiles.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <header className="bg-gray-900 border-b border-gray-800 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <a href="/" className="flex items-center text-white font-semibold text-xl">
            <Brain className="h-6 w-6 mr-2 text-cyan-400" />
            AI Research Hub
          </a>
          <div className="flex items-center space-x-4">
            <nav className="space-x-4">
              <a href="/" className="text-gray-400 hover:text-gray-300">
                Dashboard
              </a>
              <a href="/about" className="text-gray-400 hover:text-gray-300">
                About
              </a>
              <a href="/contact" className="text-gray-400 hover:text-gray-300">
                Contact
              </a>
            </nav>
            <UserProfileDropdown onNavigateToProfile={handleNavigateToProfile} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-white text-lg font-semibold mb-3">AI-Powered Research Hub</h2>
              <p className="text-gray-400">
                Upload documents for Claude AI analysis, generate intelligent research questions, and get comprehensive insights from your research materials.
              </p>
              {completedFiles > 0 && (
                <div className="mt-4 flex items-center space-x-4 text-sm">
                  <span className="text-green-400">✓ {completedFiles} documents analyzed</span>
                  <span className="text-blue-400">📊 {totalWords.toLocaleString()} words processed</span>
                  {avgConfidence > 0 && (
                    <span className="text-cyan-400">🎯 {avgConfidence}% avg confidence</span>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-3 mb-2">
                  <UploadIcon className="h-5 w-5 text-blue-400" />
                  <span className="text-white font-medium">Documents</span>
                </div>
                <span className="text-2xl font-bold text-blue-400">{completedFiles}</span>
                <p className="text-xs text-gray-500">analyzed by Claude</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-3 mb-2">
                  <ChartBar className="h-5 w-5 text-green-400" />
                  <span className="text-white font-medium">Insights</span>
                </div>
                <span className="text-2xl font-bold text-green-400">{totalInsights}</span>
                <p className="text-xs text-gray-500">key findings</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-3 mb-2">
                  <Brain className="h-5 w-5 text-purple-400" />
                  <span className="text-white font-medium">Connections</span>
                </div>
                <span className="text-2xl font-bold text-purple-400">{totalConnections}</span>
                <p className="text-xs text-gray-500">discovered</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-3 mb-2">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span className="text-white font-medium">Questions</span>
                </div>
                <span className="text-2xl font-bold text-yellow-400">{generatedQuestions.length}</span>
                <p className="text-xs text-gray-500">generated</p>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-700">
                <TabsTrigger value="upload" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
                  📄 Documents
                </TabsTrigger>
                <TabsTrigger value="analysis" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
                  🤖 Claude Analysis
                </TabsTrigger>
                <TabsTrigger value="questions" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
                  💡 Questions
                </TabsTrigger>
                <TabsTrigger value="chat" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
                  💬 Research Chat
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="mt-6">
                <RealUploadArea onFilesProcessed={handleFilesProcessed} />
              </TabsContent>

              <TabsContent value="analysis" className="mt-6">
                <RealAnalysisInterface
                  processedFiles={processedFiles}
                  onAnalysisComplete={handleAnalysisComplete}
                />
              </TabsContent>

              <TabsContent value="questions" className="mt-6">
                <IntelligentQuestionGenerator 
                  processedFiles={processedFiles}
                  onQuestionExecute={handleQuestionExecute}
                  onQuestionsGenerated={handleQuestionsGenerated}
                />
              </TabsContent>

              <TabsContent value="chat" className="mt-6">
                <RealChatInterface processedFiles={processedFiles} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-white text-md font-semibold mb-3">Research Actions</h3>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => setActiveTab('upload')}
                  className="flex items-center space-x-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg p-3 transition-colors w-full"
                >
                  <UploadIcon className="h-4 w-4" />
                  <span>Upload Research Documents</span>
                </button>
                <button 
                  onClick={() => setActiveTab('analysis')}
                  disabled={completedFiles === 0}
                  className="flex items-center space-x-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 rounded-lg p-3 transition-colors w-full"
                >
                  <Brain className="h-4 w-4" />
                  <span>Run Claude Analysis</span>
                </button>
                <button 
                  onClick={() => setActiveTab('questions')}
                  disabled={completedFiles === 0}
                  className="flex items-center space-x-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 rounded-lg p-3 transition-colors w-full"
                >
                  <Lightbulb className="h-4 w-4" />
                  <span>Generate Questions</span>
                </button>
                <button 
                  onClick={() => setActiveTab('chat')}
                  disabled={completedFiles === 0}
                  className="flex items-center space-x-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 rounded-lg p-3 transition-colors w-full"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat with Documents</span>
                </button>
              </div>
            </div>

            {analysisResults && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-white text-md font-semibold mb-3">Latest Analysis</h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="text-gray-400">Key Insights:</span>
                    <span className="text-white ml-2">{analysisResults.summary.keyInsights.length}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Document Connections:</span>
                    <span className="text-white ml-2">{analysisResults.connections.length}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Research Gaps:</span>
                    <span className="text-white ml-2">{analysisResults.gaps.length}</span>
                  </div>
                  {analysisResults.contradictions.length > 0 && (
                    <div className="text-sm">
                      <span className="text-red-400">⚠️ Contradictions Found:</span>
                      <span className="text-white ml-2">{analysisResults.contradictions.length}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-white text-md font-semibold mb-3">Research Tips</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
                <li>Upload multiple documents for comprehensive analysis</li>
                <li>Use Claude's analysis to find hidden connections</li>
                <li>Generate research questions to guide your investigation</li>
                <li>Chat with your documents for specific insights</li>
                <li>Export analysis results for reports and presentations</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RealDashboard;
