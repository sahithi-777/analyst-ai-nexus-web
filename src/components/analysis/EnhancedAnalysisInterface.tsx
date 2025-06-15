
import React, { useState } from 'react';
import { Brain, Play, FileText, BarChart3, Clock, Target, AlertTriangle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { RealProcessedFile } from '@/utils/realAiProcessor';
import { EnhancedAiProcessor, DeepAnalysisResult } from '@/utils/enhancedAiProcessor';
import EnhancedAnalysisResults from './EnhancedAnalysisResults';

interface EnhancedAnalysisInterfaceProps {
  processedFiles: RealProcessedFile[];
  onAnalysisComplete: (results: DeepAnalysisResult) => void;
}

const EnhancedAnalysisInterface = ({ processedFiles, onAnalysisComplete }: EnhancedAnalysisInterfaceProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<DeepAnalysisResult | null>(null);
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
    console.log('Starting enhanced Claude analysis of documents:', completedFiles.length);

    try {
      const results = await EnhancedAiProcessor.analyzeDocuments(completedFiles);
      console.log('Enhanced analysis completed:', results);
      
      setAnalysisResults(results);
      onAnalysisComplete(results);
      
      toast({
        title: "Deep Analysis Complete",
        description: `Generated comprehensive insights with ${results.insights.length} key findings`,
      });
    } catch (error) {
      console.error('Enhanced analysis failed:', error);
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
    return <EnhancedAnalysisResults results={analysisResults} />;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-6 w-6 mr-3 text-cyan-400" />
            Enhanced Claude AI Document Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="text-white font-medium">{completedFiles.length}</div>
                  <div className="text-gray-400 text-sm">Documents</div>
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
                <Lightbulb className="h-5 w-5 text-purple-400" />
                <div>
                  <div className="text-white font-medium">Deep Analysis</div>
                  <div className="text-gray-400 text-sm">AI Insights</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Target className="h-5 w-5 text-orange-400" />
                <div>
                  <div className="text-white font-medium">Enhanced</div>
                  <div className="text-gray-400 text-sm">Features</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-cyan-400" />
                  Deep Content Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-gray-400 space-y-1">
                <div>• Key themes and arguments</div>
                <div>• Critical insights extraction</div>
                <div>• Research gaps identification</div>
                <div>• Contradiction detection</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-green-400" />
                  Relationship Mapping
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-gray-400 space-y-1">
                <div>• Concept connections</div>
                <div>• Cause-effect relationships</div>
                <div>• Cross-reference analysis</div>
                <div>• Dependency mapping</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400" />
                  Issue Identification
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-gray-400 space-y-1">
                <div>• Methodological concerns</div>
                <div>• Bias detection</div>
                <div>• Controversial points</div>
                <div>• Investigation areas</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-purple-400" />
                  Timeline & Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-gray-400 space-y-1">
                <div>• Chronological events</div>
                <div>• Historical progression</div>
                <div>• Future projections</div>
                <div>• Actionable insights</div>
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || completedFiles.length === 0}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          >
            {isAnalyzing ? (
              <>
                <Brain className="h-4 w-4 mr-2 animate-spin" />
                Running Enhanced Claude Analysis...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Enhanced Analysis
              </>
            )}
          </Button>

          {completedFiles.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Upload and process documents first to enable enhanced analysis</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAnalysisInterface;
