
import React, { useState } from 'react';
import { Brain, Play, Download, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AnalysisResults from './AnalysisResults';

interface AnalysisInterfaceProps {
  hasUploadedFiles: boolean;
}

const AnalysisInterface = ({ hasUploadedFiles }: AnalysisInterfaceProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showResults, setShowResults] = useState(false);

  const progressMessages = [
    'Processing documents...',
    'Extracting key insights...',
    'Finding connections...',
    'Analyzing patterns...',
    'Identifying contradictions...',
    'Building timeline...',
    'Finalizing analysis...'
  ];

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setShowResults(false);
    
    // Simulate analysis progress
    for (let i = 0; i < progressMessages.length; i++) {
      setCurrentMessage(progressMessages[i]);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAnalysisProgress(((i + 1) / progressMessages.length) * 100);
    }
    
    setIsAnalyzing(false);
    setShowResults(true);
  };

  return (
    <div className="space-y-6">
      {/* Analysis Controls */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Document Analysis</h3>
            <p className="text-gray-400">
              Analyze uploaded documents to extract insights, find connections, and identify patterns
            </p>
          </div>
          
          {showResults && (
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Analysis
              </Button>
            </div>
          )}
        </div>

        {/* Analysis Button */}
        <div className="flex justify-center">
          <Button
            onClick={startAnalysis}
            disabled={!hasUploadedFiles || isAnalyzing}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            {isAnalyzing ? (
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <Play className="h-5 w-5 mr-2" />
            )}
            {isAnalyzing ? 'Analyzing...' : 'Analyze All Documents'}
          </Button>
        </div>

        {/* Progress Section */}
        {isAnalyzing && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Brain className="h-5 w-5 text-cyan-400 animate-pulse" />
              <span className="text-white font-medium">{currentMessage}</span>
            </div>
            <div className="max-w-md mx-auto">
              <Progress 
                value={analysisProgress} 
                className="h-3 bg-gray-700"
              />
              <div className="text-center mt-2">
                <span className="text-sm text-gray-400">{Math.round(analysisProgress)}% Complete</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {showResults && <AnalysisResults />}
    </div>
  );
};

export default AnalysisInterface;
