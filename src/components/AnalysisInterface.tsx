
import React, { useState } from 'react';
import { Brain, Play, Download, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      {/* Analysis Controls Card */}
      <Card className="bg-gray-800 border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-6 w-6 mr-3 text-cyan-400" />
              <div>
                <h3 className="text-xl font-semibold">AI Document Analysis</h3>
                <p className="text-sm text-gray-400 font-normal mt-1">
                  Analyze uploaded documents to extract insights, find connections, and identify patterns
                </p>
              </div>
            </div>
            
            {showResults && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Analysis Button */}
          <div className="flex justify-center">
            <Button
              onClick={startAnalysis}
              disabled={!hasUploadedFiles || isAnalyzing}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              size="lg"
            >
              {isAnalyzing ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Play className="h-5 w-5 mr-2" />
              )}
              {isAnalyzing ? 'Analyzing Documents...' : 'Start AI Analysis'}
            </Button>
          </div>

          {/* Progress Section */}
          {isAnalyzing && (
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-600">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Brain className="h-6 w-6 text-cyan-400 animate-pulse" />
                <span className="text-white font-medium text-lg">{currentMessage}</span>
              </div>
              <div className="max-w-md mx-auto">
                <Progress 
                  value={analysisProgress} 
                  className="h-3 bg-gray-700"
                />
                <div className="text-center mt-3">
                  <span className="text-sm text-gray-400 font-medium">
                    {Math.round(analysisProgress)}% Complete
                  </span>
                </div>
              </div>
            </div>
          )}

          {!hasUploadedFiles && !isAnalyzing && (
            <div className="text-center py-8 bg-gray-900 rounded-lg border border-gray-600">
              <Brain className="h-12 w-12 text-gray-600 mx-auto mb-3" />
              <h4 className="text-lg font-medium text-white mb-2">Ready to Analyze</h4>
              <p className="text-gray-400">Upload documents above to begin AI-powered analysis</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {showResults && (
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardContent className="p-0">
            <AnalysisResults />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalysisInterface;
