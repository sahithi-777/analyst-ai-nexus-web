
import React, { useState } from 'react';
import { Brain, TrendingUp, AlertTriangle, Target, BarChart3, FileText, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RealAnalysisResult } from '@/utils/realAiProcessor';

interface RealAnalysisResultsProps {
  results: RealAnalysisResult;
}

const RealAnalysisResults = ({ results }: RealAnalysisResultsProps) => {
  const [selectedInsight, setSelectedInsight] = useState<number>(0);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'moderate': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Brain className="h-5 w-5 text-cyan-400" />
              <div>
                <div className="text-2xl font-bold text-white">{results.summary.keyInsights.length}</div>
                <div className="text-sm text-gray-400">Key Insights</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-white">{results.connections.length}</div>
                <div className="text-sm text-gray-400">Connections</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-white">{results.contradictions.length}</div>
                <div className="text-sm text-gray-400">Issues</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Target className="h-5 w-5 text-purple-400" />
              <div>
                <div className="text-2xl font-bold text-white">{results.gaps.length}</div>
                <div className="text-sm text-gray-400">Research Gaps</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Tabs */}
      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="insights" className="data-[state=active]:bg-gray-700">
            Key Insights
          </TabsTrigger>
          <TabsTrigger value="connections" className="data-[state=active]:bg-gray-700">
            Connections
          </TabsTrigger>
          <TabsTrigger value="issues" className="data-[state=active]:bg-gray-700">
            Issues
          </TabsTrigger>
          <TabsTrigger value="gaps" className="data-[state=active]:bg-gray-700">
            Research Gaps
          </TabsTrigger>
          <TabsTrigger value="stats" className="data-[state=active]:bg-gray-700">
            Statistics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Key Insights Discovered</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.summary.keyInsights.map((insight, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-lg p-4 border border-gray-600 cursor-pointer hover:border-gray-500 transition-colors"
                  onClick={() => setSelectedInsight(index)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-white font-medium flex-1">{insight.insight}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${getConfidenceColor(insight.confidence)}`}>
                        {insight.confidence}%
                      </span>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {insight.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Sources: {insight.sourceDocuments.join(', ')}
                    </div>
                    <Progress value={insight.confidence} className="w-24 h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connections" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Document Connections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.connections.map((connection, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="border-blue-400 text-blue-400">
                          {connection.relationshipType}
                        </Badge>
                        <span className="text-sm text-gray-400">
                          Strength: {connection.strength}%
                        </span>
                      </div>
                      <p className="text-white mb-2">{connection.description}</p>
                      <div className="text-sm text-gray-400">
                        Documents: {connection.documents.join(', ')}
                      </div>
                    </div>
                    <Progress value={connection.strength} className="w-24 h-2" />
                  </div>
                  <div className="mt-3">
                    <h5 className="text-sm font-medium text-gray-300 mb-1">Evidence:</h5>
                    <ul className="text-sm text-gray-400 space-y-1">
                      {connection.evidence.map((evidence, evidenceIndex) => (
                        <li key={evidenceIndex}>• {evidence}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Issues & Contradictions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.contradictions.length > 0 ? (
                results.contradictions.map((contradiction, index) => (
                  <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-white font-medium flex-1">{contradiction.issue}</h4>
                      <Badge className={getSeverityColor(contradiction.severity)}>
                        {contradiction.severity}
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-3">{contradiction.description}</p>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-400">
                        <span className="font-medium">Documents:</span> {contradiction.documents.join(', ')}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-green-400">Recommendation:</span>
                        <span className="text-gray-300 ml-2">{contradiction.recommendation}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No contradictions or issues found in the analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gaps" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Research Gaps Identified</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.gaps.map((gap, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-white font-medium flex-1">{gap.area}</h4>
                    <Badge className={getPriorityColor(gap.priority)}>
                      {gap.priority} priority
                    </Badge>
                  </div>
                  <p className="text-gray-300 mb-3">{gap.description}</p>
                  <div className="text-sm text-gray-400">
                    <span className="font-medium">Suggested Sources:</span> {gap.suggestedSources.join(', ')}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Analysis Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total Documents</span>
                    <span className="text-white font-medium">{results.statistics.totalDocuments}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total Words</span>
                    <span className="text-white font-medium">{results.statistics.totalWords.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Analysis Depth</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{results.statistics.avgAnalysisDepth}%</span>
                      <Progress value={results.statistics.avgAnalysisDepth} className="w-20 h-2" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Processing Time</span>
                    <span className="text-white font-medium">{results.statistics.processingTime}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-medium">Overall Themes</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.summary.overallThemes.map((theme, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-cyan-400 text-cyan-400"
                      >
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealAnalysisResults;
