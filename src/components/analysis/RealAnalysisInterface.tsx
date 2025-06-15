
import React, { useState } from 'react';
import { Brain, Play, Download, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { RealProcessedFile, RealAnalysisResult, RealAiProcessor } from '@/utils/realAiProcessor';
import RealAnalysisResults from './RealAnalysisResults';

interface RealAnalysisInterfaceProps {
  processedFiles: RealProcessedFile[];
  onAnalysisComplete?: (results: RealAnalysisResult) => void;
}

const RealAnalysisInterface = ({ processedFiles, onAnalysisComplete }: RealAnalysisInterfaceProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [analysisResults, setAnalysisResults] = useState<RealAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const { toast } = useToast();

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
      setCurrentMessage('Initializing Claude AI analysis...');
      setAnalysisProgress(10);

      setCurrentMessage('Sending documents to Claude for processing...');
      setAnalysisProgress(30);

      const validFiles = processedFiles.filter(f => f.status === 'completed');
      
      setCurrentMessage('Claude is analyzing document content and relationships...');
      setAnalysisProgress(60);

      const results = await RealAiProcessor.analyzeDocuments(validFiles);
      
      setAnalysisProgress(90);
      setCurrentMessage('Finalizing analysis results...');

      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAnalysisProgress(100);
      setCurrentMessage('AI analysis complete!');
      setAnalysisResults(results);
      onAnalysisComplete?.(results);
      
      toast({
        title: "AI Analysis Complete",
        description: `Claude successfully analyzed ${validFiles.length} documents with ${results.summary.keyInsights.length} insights generated.`,
      });

    } catch (error) {
      setAnalysisError(error instanceof Error ? error.message : 'AI analysis failed');
      toast({
        title: "Analysis Failed",
        description: "An error occurred during AI analysis. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => {
        setCurrentMessage('');
        setAnalysisProgress(0);
      }, 2000);
    }
  };

  const exportResults = () => {
    if (!analysisResults) return;
    
    const exportData = {
      timestamp: new Date().toISOString(),
      aiModel: 'claude-3-5-sonnet-20241022',
      analysis: analysisResults,
      files: processedFiles.map(f => ({
        name: f.name,
        wordCount: f.metadata.wordCount,
        topic: f.metadata.topic,
        category: f.metadata.category,
        status: f.status
      }))
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `claude-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Results Exported",
      description: "AI analysis results have been downloaded.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-5 w-5 mr-3 text-cyan-400" />
              <div>
                <h3 className="text-lg font-semibold">Claude AI Document Analysis</h3>
                <p className="text-sm text-gray-400 font-normal mt-1">
                  {hasValidFiles 
                    ? `Ready to analyze ${processedFiles.filter(f => f.status === 'completed').length} documents with Claude`
                    : 'Upload documents to begin AI analysis'
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
          {processedFiles.length > 0 && (
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
              <h4 className="text-white font-medium mb-3">Document Status</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">
                    {processedFiles.filter(f => f.status === 'completed').length} Ready for AI
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

          <div className="flex justify-center space-x-3">
            <Button
              onClick={startAnalysis}
              disabled={!hasValidFiles || isAnalyzing}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              {isAnalyzing ? 'Analyzing with Claude...' : 'Start Claude AI Analysis'}
            </Button>
          </div>

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

          {analysisError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <span className="text-red-300 font-medium">AI Analysis Error</span>
              </div>
              <p className="text-red-200 text-sm mt-1">{analysisError}</p>
            </div>
          )}

          {!hasValidFiles && !isAnalyzing && (
            <div className="text-center py-6 bg-gray-900 rounded-lg border border-gray-600">
              <Brain className="h-10 w-10 text-gray-600 mx-auto mb-3" />
              <h4 className="text-white font-medium mb-2">Ready for Claude AI Analysis</h4>
              <p className="text-gray-400 text-sm">Upload and process documents to begin real AI analysis</p>
            </div>
          )}
        </CardContent>
      </Card>

      {analysisResults && (
        <RealAnalysisResults results={analysisResults} />
      )}
    </div>
  );
};

export default RealAnalysisInterface;
