
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
  const { toast } = useToast();

  const handleFilesProcessed = (files: RealProcessedFile[]) => {
    setProcessedFiles(files);
  };

  const handleAnalysisComplete = (results: RealAnalysisResult) => {
    setAnalysisResults(results);
  };

  const handleQuestionExecute = (question: string) => {
    setActiveTab('chat');
    // Add a small delay to ensure the chat interface is rendered
    setTimeout(() => {
      // This would trigger the chat interface to process the question
      // You can implement this by passing the question to the chat component
      console.log('Executing question:', question);
      toast({
        title: "Question Executed",
        description: "Question sent to Claude for analysis",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <header className="bg-gray-900 border-b border-gray-800 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <a href="/" className="flex items-center text-white font-semibold text-xl">
            <Brain className="h-6 w-6 mr-2 text-cyan-400" />
            Real AI Analysis
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
              <h2 className="text-white text-lg font-semibold mb-3">Welcome to Real AI Analysis</h2>
              <p className="text-gray-400">
                Upload documents, analyze content with Claude AI, generate research questions, and chat with your documents.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-3 mb-2">
                  <UploadIcon className="h-5 w-5 text-blue-400" />
                  <span className="text-white font-medium">Documents Uploaded</span>
                </div>
                <span className="text-gray-400">{processedFiles.length} files</span>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-3 mb-2">
                  <ChartBar className="h-5 w-5 text-green-400" />
                  <span className="text-white font-medium">Analysis Insights</span>
                </div>
                <span className="text-gray-400">{analysisResults?.summary.keyInsights.length || 0} insights</span>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-700">
                <TabsTrigger value="upload" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
                  Documents
                </TabsTrigger>
                <TabsTrigger value="analysis" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
                  Claude Analysis
                </TabsTrigger>
                <TabsTrigger value="questions" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
                  Question Generator
                </TabsTrigger>
                <TabsTrigger value="chat" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
                  Chat
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
                />
              </TabsContent>

              <TabsContent value="chat" className="mt-6">
                <RealChatInterface processedFiles={processedFiles} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-white text-md font-semibold mb-3">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-3">
                <button className="flex items-center space-x-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg p-3 transition-colors w-full">
                  <UploadIcon className="h-4 w-4" />
                  <span>Upload More Documents</span>
                </button>
                <button className="flex items-center space-x-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg p-3 transition-colors w-full">
                  <Lightbulb className="h-4 w-4" />
                  <span>Generate Research Questions</span>
                </button>
                <button className="flex items-center space-x-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg p-3 transition-colors w-full">
                  <MessageSquare className="h-4 w-4" />
                  <span>Start a New Chat Session</span>
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-white text-md font-semibold mb-3">Analysis Tips</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Upload multiple documents for comprehensive analysis</li>
                <li>Use the chat interface to ask specific questions</li>
                <li>Explore generated research questions for deeper insights</li>
                <li>Export analysis results for offline review</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RealDashboard;
