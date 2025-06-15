
import React, { useState } from 'react';
import { Brain, Play, Download, Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ProcessedFile, AIAnalyzer, AnalysisResult } from '@/utils/fileProcessor';
import AnalysisResults from './AnalysisResults';

interface AnalysisInterfaceProps {
  processedFiles: ProcessedFile[];
  onAnalysisComplete?: (results: AnalysisResult) => void;
}

const AnalysisInterface = ({ processedFiles, onAnalysisComplete }: AnalysisInterfaceProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const { toast } = useToast();

  const progressMessages = [
    'Initializing analysis engine...',
    'Reading document contents...',
    'Extracting key concepts and themes...',
    'Identifying relationships and connections...',
    'Analyzing timeline and chronology...',
    'Detecting contradictions and inconsistencies...',
    'Generating insights and recommendations...',
    'Finalizing analysis results...'
  ];

  const hasValidFiles = processedFiles.filter(f => f.status === 'completed').length > 0;

  const startAnalysis = async () => {
    if (!hasValidFiles) {
      toast({
        title: "No Files Ready",
        description: "Please upload and process files before starting analysis.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisError(null);
    setAnalysisResults(null);
    
    try {
      // Simulate progress updates
      for (let i = 0; i < progressMessages.length; i++) {
        setCurrentMessage(progressMessages[i]);
        setAnalysisProgress(((i + 1) / progressMessages.length) * 90); // Leave 10% for final processing
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
      }

      // Perform actual AI analysis
      const validFiles = processedFiles.filter(f => f.status === 'completed');
      const results = await AIAnalyzer.analyzeDocuments(validFiles);
      
      setAnalysisProgress(100);
      setCurrentMessage('Analysis complete!');
      setAnalysisResults(results);
      onAnalysisComplete?.(results);
      
      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${validFiles.length} documents with ${results.summary.keyInsights.length} key insights found.`,
      });

    } catch (error) {
      setAnalysisError(error instanceof Error ? error.message : 'Analysis failed');
      toast({
        title: "Analysis Failed",
        description: "An error occurred during analysis. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
      // Clear progress message after a delay
      setTimeout(() => {
        setCurrentMessage('');
        setAnalysisProgress(0);
      }, 2000);
    }
  };

  const cancelAnalysis = () => {
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    setCurrentMessage('');
    toast({
      title: "Analysis Cancelled",
      description: "Document analysis has been cancelled.",
    });
  };

  const exportResults = () => {
    if (!analysisResults) return;
    
    const exportData = {
      timestamp: new Date().toISOString(),
      analysis: analysisResults,
      files: processedFiles.map(f => ({
        name: f.name,
        wordCount: f.metadata.wordCount,
        status: f.status
      }))
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analysis-results-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Results Exported",
      description: "Analysis results have been downloaded as JSON file.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Analysis Controls Card */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-5 w-5 mr-3 text-cyan-400" />
              <div>
                <h3 className="text-lg font-semibold">AI Document Analysis</h3>
                <p className="text-sm text-gray-400 font-normal mt-1">
                  {hasValidFiles 
                    ? `Ready to analyze ${processedFiles.filter(f => f.status === 'completed').length} documents`
                    : 'Upload documents to begin analysis'
                  }
                </p>
              </div>
            </div>
            
            {analysisResults && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportResults}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* File Status Summary */}
          {processedFiles.length > 0 && (
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
              <h4 className="text-white font-medium mb-3">Document Status</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">
                    {processedFiles.filter(f => f.status === 'completed').length} Ready
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">
                    {processedFiles.filter(f => f.status === 'processing').length} Processing
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <span className="text-sm text-gray-300">
                    {processedFiles.filter(f => f.status === 'error').length} Failed
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Button */}
          <div className="flex justify-center space-x-3">
            <Button
              onClick={startAnalysis}
              disabled={!hasValidFiles || isAnalyzing}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              {isAnalyzing ? 'Analyzing...' : 'Start AI Analysis'}
            </Button>
            
            {isAnalyzing && (
              <Button
                onClick={cancelAnalysis}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
            )}
          </div>

          {/* Progress Section */}
          {isAnalyzing && (
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <Brain className="h-5 w-5 text-cyan-400 animate-pulse" />
                <span className="text-white font-medium">{currentMessage}</span>
              </div>
              <div className="max-w-md mx-auto">
                <Progress 
                  value={analysisProgress} 
                  className="h-2 bg-gray-700"
                />
                <div className="text-center mt-2">
                  <span className="text-sm text-gray-400">
                    {Math.round(analysisProgress)}% Complete
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {analysisError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <span className="text-red-300 font-medium">Analysis Error</span>
              </div>
              <p className="text-red-200 text-sm mt-1">{analysisError}</p>
            </div>
          )}

          {/* Empty State */}
          {!hasValidFiles && !isAnalyzing && (
            <div className="text-center py-6 bg-gray-900 rounded-lg border border-gray-600">
              <Brain className="h-10 w-10 text-gray-600 mx-auto mb-3" />
              <h4 className="text-white font-medium mb-2">Ready to Analyze</h4>
              <p className="text-gray-400 text-sm">Upload and process documents to begin AI analysis</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResults && (
        <AnalysisResults results={analysisResults} />
      )}
    </div>
  );
};

export default AnalysisInterface;
