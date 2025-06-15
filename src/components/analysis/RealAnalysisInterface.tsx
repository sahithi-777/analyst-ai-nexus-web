
import React, { useState } from 'react';
import { Brain, Play, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { RealProcessedFile, RealAnalysisResult, RealAiProcessor } from '@/utils/realAiProcessor';
import RealAnalysisResults from './RealAnalysisResults';

interface RealAnalysisInterfaceProps {
  processedFiles: RealProcessedFile[];
  onAnalysisComplete: (results: RealAnalysisResult) => void;
}

const RealAnalysisInterface = ({ processedFiles, onAnalysisComplete }: RealAnalysisInterfaceProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<RealAnalysisResult | null>(null);
  const { toast } = useToast();

  const completedFiles = processedFiles.filter(f => f.status === 'completed');

  const handleAnalyze = async () => {
    if (completedFiles.length === 0) {
      toast({
        title: "No Documents",
        description: "Please upload and process documents first",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    console.log('Starting Claude analysis of documents:', completedFiles.length);

    try {
      const results = await RealAiProcessor.analyzeDocuments(completedFiles);
      console.log('Analysis completed:', results);
      
      setAnalysisResults(results);
      onAnalysisComplete(results);
      
      toast({
        title: "Analysis Complete",
        description: `Generated ${results.summary.keyInsights.length} insights from your documents`,
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze documents. Please check the console for details.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (analysisResults) {
    return <RealAnalysisResults results={analysisResults} />;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-6 w-6 mr-3 text-cyan-400" />
            Claude AI Document Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="text-white font-medium">{completedFiles.length}</div>
                  <div className="text-gray-400 text-sm">Documents Ready</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-5 w-5 text-green-400" />
                <div>
                  <div className="text-white font-medium">
                    {completedFiles.reduce((sum, file) => sum + (file.metadata?.wordCount || 0), 0).toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">Total Words</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Brain className="h-5 w-5 text-purple-400" />
                <div>
                  <div className="text-white font-medium">Claude AI</div>
                  <div className="text-gray-400 text-sm">Ready to Analyze</div>
                </div>
              </div>
            </div>
          </div>

          {completedFiles.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-white font-medium">Documents to Analyze:</h4>
              <div className="grid grid-cols-1 gap-2">
                {completedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between bg-gray-900 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-white text-sm">{file.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs border-green-400 text-green-400">
                        {file.metadata?.wordCount || 0} words
                      </Badge>
                      <Badge variant="outline" className="text-xs border-blue-400 text-blue-400">
                        {file.metadata?.topic || 'Unknown'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || completedFiles.length === 0}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          >
            {isAnalyzing ? (
              <>
                <Brain className="h-4 w-4 mr-2 animate-spin" />
                Analyzing with Claude AI...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Claude Analysis
              </>
            )}
          </Button>

          {completedFiles.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Upload and process documents first to enable analysis</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RealAnalysisInterface;
