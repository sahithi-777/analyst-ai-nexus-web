
import React, { useState } from 'react';
import { Brain, Play, Download, Loader2, CheckCircle, AlertCircle, TrendingUp, Network, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { SmartProcessedFile, IntelligentAnalysis, IntelligentAnalyzer } from '@/utils/intelligentFileProcessor';

interface IntelligentAnalysisInterfaceProps {
  processedFiles: SmartProcessedFile[];
  onAnalysisComplete?: (results: IntelligentAnalysis) => void;
}

const IntelligentAnalysisInterface = ({ processedFiles, onAnalysisComplete }: IntelligentAnalysisInterfaceProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [analysisResults, setAnalysisResults] = useState<IntelligentAnalysis | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const { toast } = useToast();

  const advancedProgressMessages = [
    'Initializing intelligent analysis engine...',
    'Extracting document metadata and context...',
    'Analyzing semantic relationships between documents...',
    'Identifying thematic patterns and trends...',
    'Cross-referencing data sources and citations...',
    'Detecting logical inconsistencies and contradictions...',
    'Generating contextual insights and recommendations...',
    'Building comprehensive analysis report...',
    'Finalizing intelligent analysis results...'
  ];

  const hasValidFiles = processedFiles.filter(f => f.status === 'completed').length > 0;

  const startIntelligentAnalysis = async () => {
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
      // Simulate advanced progress updates
      for (let i = 0; i < advancedProgressMessages.length; i++) {
        setCurrentMessage(advancedProgressMessages[i]);
        setAnalysisProgress(((i + 1) / advancedProgressMessages.length) * 90);
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 800));
      }

      // Perform intelligent AI analysis
      const validFiles = processedFiles.filter(f => f.status === 'completed');
      const results = await IntelligentAnalyzer.analyzeDocuments(validFiles);
      
      setAnalysisProgress(100);
      setCurrentMessage('Intelligent analysis complete!');
      setAnalysisResults(results);
      onAnalysisComplete?.(results);
      
      toast({
        title: "Intelligent Analysis Complete",
        description: `Successfully analyzed ${validFiles.length} documents with ${results.summary.keyInsights.length} key insights and ${results.connections.length} connections discovered.`,
      });

    } catch (error) {
      setAnalysisError(error instanceof Error ? error.message : 'Analysis failed');
      toast({
        title: "Analysis Failed",
        description: "An error occurred during intelligent analysis. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => {
        setCurrentMessage('');
        setAnalysisProgress(0);
      }, 3000);
    }
  };

  const exportIntelligentResults = () => {
    if (!analysisResults) return;
    
    const exportData = {
      timestamp: new Date().toISOString(),
      analysis: analysisResults,
      files: processedFiles.map(f => ({
        name: f.name,
        metadata: f.metadata,
        status: f.status
      }))
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `intelligent-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Analysis Exported",
      description: "Intelligent analysis results downloaded successfully.",
    });
  };

  const getInsightIcon = (category: string) => {
    switch (category) {
      case 'trend': return TrendingUp;
      case 'finding': return CheckCircle;
      case 'recommendation': return Brain;
      case 'risk': return AlertTriangle;
      default: return Brain;
    }
  };

  const getInsightColor = (category: string) => {
    switch (category) {
      case 'trend': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'finding': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'recommendation': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'risk': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Intelligent Analysis Controls */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-6 w-6 mr-3 text-cyan-400" />
              <div>
                <h3 className="text-xl font-semibold">Intelligent Document Analysis</h3>
                <p className="text-sm text-gray-400 font-normal mt-1">
                  {hasValidFiles 
                    ? `Ready to analyze ${processedFiles.filter(f => f.status === 'completed').length} documents with AI-powered insights`
                    : 'Upload documents to begin intelligent analysis'
                  }
                </p>
              </div>
            </div>
            
            {analysisResults && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportIntelligentResults}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Analysis
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* File Status with Enhanced Metadata */}
          {processedFiles.length > 0 && (
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
              <h4 className="text-white font-medium mb-3">Document Overview</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {processedFiles.filter(f => f.status === 'completed').length}
                  </div>
                  <div className="text-xs text-gray-400">Ready for Analysis</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {Math.round(processedFiles.reduce((sum, f) => sum + (f.metadata?.confidenceScore || 0), 0) / processedFiles.length)}%
                  </div>
                  <div className="text-xs text-gray-400">Avg Confidence</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {[...new Set(processedFiles.map(f => f.metadata?.category).filter(Boolean))].length}
                  </div>
                  <div className="text-xs text-gray-400">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">
                    {processedFiles.reduce((sum, f) => sum + (f.metadata?.wordCount || 0), 0).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">Total Words</div>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Button */}
          <div className="flex justify-center">
            <Button
              onClick={startIntelligentAnalysis}
              disabled={!hasValidFiles || isAnalyzing}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Brain className="h-5 w-5 mr-2" />
              )}
              {isAnalyzing ? 'Analyzing with AI...' : 'Start Intelligent Analysis'}
            </Button>
          </div>

          {/* Advanced Progress Display */}
          {isAnalyzing && (
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-600">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Brain className="h-6 w-6 text-cyan-400 animate-pulse" />
                <span className="text-white font-medium text-lg">{currentMessage}</span>
              </div>
              <div className="max-w-2xl mx-auto">
                <Progress 
                  value={analysisProgress} 
                  className="h-3 bg-gray-700"
                />
                <div className="text-center mt-3">
                  <span className="text-gray-400">
                    {Math.round(analysisProgress)}% Complete • Advanced AI Processing
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
        </CardContent>
      </Card>

      {/* Intelligent Analysis Results */}
      {analysisResults && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              <div className="flex items-center justify-between">
                <span>Intelligent Analysis Results</span>
                <Badge className="bg-green-400/10 text-green-400 border-green-400/20">
                  {analysisResults.summary.avgConfidenceScore}% Overall Confidence
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="insights" className="space-y-6">
              <TabsList className="bg-gray-900 border-gray-700 grid w-full grid-cols-4">
                <TabsTrigger value="insights" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500">
                  Key Insights
                </TabsTrigger>
                <TabsTrigger value="connections" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500">
                  Connections
                </TabsTrigger>
                <TabsTrigger value="timeline" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500">
                  Timeline
                </TabsTrigger>
                <TabsTrigger value="issues" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600">
                  Issues
                </TabsTrigger>
              </TabsList>

              <TabsContent value="insights" className="space-y-4">
                {analysisResults.summary.keyInsights.map((insight, idx) => {
                  const IconComponent = getInsightIcon(insight.category);
                  return (
                    <Card key={idx} className={`border ${getInsightColor(insight.category)}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <IconComponent className="h-5 w-5 mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className="text-xs">
                                {insight.category}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {insight.confidence}% confidence
                              </Badge>
                            </div>
                            <p className="text-white font-medium mb-2">{insight.insight}</p>
                            <div className="text-xs text-gray-400">
                              <span>Sources: </span>
                              {insight.sourceDocuments.slice(0, 2).map((doc, i) => (
                                <span key={i} className="text-gray-300">
                                  {doc}{i < insight.sourceDocuments.length - 1 && i < 1 ? ', ' : ''}
                                </span>
                              ))}
                              {insight.sourceDocuments.length > 2 && (
                                <span className="text-gray-400"> +{insight.sourceDocuments.length - 2} more</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>

              <TabsContent value="connections" className="space-y-4">
                {analysisResults.connections.map((connection, idx) => (
                  <Card key={idx} className="bg-gray-700/50 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Network className="h-5 w-5 text-purple-400 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs text-purple-400 border-purple-400/30">
                              {connection.relationshipType}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {connection.strength}% strength
                            </Badge>
                          </div>
                          <p className="text-white font-medium mb-2">{connection.description}</p>
                          <div className="text-sm text-gray-300 mb-2">
                            <span className="font-medium">Documents: </span>
                            {connection.documents.join(', ')}
                          </div>
                          <div className="text-xs text-gray-400">
                            <span className="font-medium">Evidence: </span>
                            {connection.evidence.join(' • ')}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="timeline" className="space-y-4">
                {analysisResults.timeline.map((event, idx) => (
                  <Card key={idx} className="bg-gray-700/50 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-green-400 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs text-green-400 border-green-400/30">
                              {event.date}
                            </Badge>
                            <Badge variant="outline" className={`text-xs ${
                              event.importance === 'high' ? 'text-red-400 border-red-400/30' :
                              event.importance === 'medium' ? 'text-yellow-400 border-yellow-400/30' :
                              'text-gray-400 border-gray-400/30'
                            }`}>
                              {event.importance} importance
                            </Badge>
                          </div>
                          <p className="text-white font-medium mb-1">{event.event}</p>
                          <p className="text-sm text-gray-300">Category: {event.category}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="issues" className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Contradictions Found</h4>
                  {analysisResults.contradictions.map((contradiction, idx) => (
                    <Card key={idx} className="bg-red-500/10 border-red-500/20">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="h-5 w-5 text-red-400 mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className="text-xs text-red-400 border-red-400/30">
                                {contradiction.severity}
                              </Badge>
                            </div>
                            <p className="text-white font-medium mb-2">{contradiction.issue}</p>
                            <p className="text-sm text-gray-300 mb-2">{contradiction.description}</p>
                            <div className="bg-gray-800/50 rounded p-2">
                              <p className="text-xs text-gray-400 mb-1">Recommendation:</p>
                              <p className="text-sm text-gray-200">{contradiction.recommendation}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-medium">Research Gaps</h4>
                  {analysisResults.gaps.map((gap, idx) => (
                    <Card key={idx} className="bg-yellow-500/10 border-yellow-500/20">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="h-5 w-5 text-yellow-400 mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-white font-medium">{gap.area}</h5>
                              <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400/30">
                                {gap.priority} priority
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-300 mb-2">{gap.description}</p>
                            <div className="text-xs text-gray-400">
                              <span className="font-medium">Suggested sources: </span>
                              {gap.suggestedSources.join(', ')}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IntelligentAnalysisInterface;
