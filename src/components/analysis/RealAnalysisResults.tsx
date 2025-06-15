
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, AlertTriangle, Clock, Network, FileText } from 'lucide-react';
import { RealAnalysisResult } from '@/utils/realAiProcessor';

interface RealAnalysisResultsProps {
  results: RealAnalysisResult;
}

const RealAnalysisResults = ({ results }: RealAnalysisResultsProps) => {
  const getInsightIcon = (category: string) => {
    switch (category) {
      case 'trend': return <TrendingUp className="h-4 w-4" />;
      case 'finding': return <Brain className="h-4 w-4" />;
      case 'recommendation': return <FileText className="h-4 w-4" />;
      case 'risk': return <AlertTriangle className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getRelationshipColor = (type: string) => {
    switch (type) {
      case 'complementary': return 'border-green-400 text-green-400';
      case 'contradictory': return 'border-red-400 text-red-400';
      case 'sequential': return 'border-blue-400 text-blue-400';
      case 'supporting': return 'border-cyan-400 text-cyan-400';
      default: return 'border-gray-400 text-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 text-red-400 bg-red-500/10';
      case 'moderate': return 'border-yellow-500 text-yellow-400 bg-yellow-500/10';
      case 'minor': return 'border-blue-500 text-blue-400 bg-blue-500/10';
      default: return 'border-gray-500 text-gray-400 bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Overview */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-5 w-5 mr-3 text-cyan-400" />
            Claude AI Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Documents</p>
              <p className="text-white text-2xl font-bold">{results.summary.totalDocuments}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Total Words</p>
              <p className="text-white text-2xl font-bold">{results.summary.totalWords.toLocaleString()}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-gray-400 text-sm">AI Confidence</p>
              <p className="text-white text-2xl font-bold">{results.summary.avgConfidenceScore}%</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Key Insights</p>
              <p className="text-white text-2xl font-bold">{results.summary.keyInsights.length}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-white font-medium mb-2">Primary Topics</h4>
              <div className="flex flex-wrap gap-2">
                {results.summary.primaryTopics.map((topic, index) => (
                  <Badge key={index} className="bg-blue-400/10 text-blue-400 border-blue-400">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-2">Document Types</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(results.summary.documentTypes).map(([type, count]) => (
                  <Badge key={type} className="bg-cyan-400/10 text-cyan-400 border-cyan-400">
                    {type}: {count}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          <Tabs defaultValue="insights" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-gray-900 border-b border-gray-700">
              <TabsTrigger value="insights" className="text-gray-400 data-[state=active]:text-white">
                Key Insights
              </TabsTrigger>
              <TabsTrigger value="connections" className="text-gray-400 data-[state=active]:text-white">
                Connections
              </TabsTrigger>
              <TabsTrigger value="timeline" className="text-gray-400 data-[state=active]:text-white">
                Timeline
              </TabsTrigger>
              <TabsTrigger value="contradictions" className="text-gray-400 data-[state=active]:text-white">
                Issues
              </TabsTrigger>
              <TabsTrigger value="gaps" className="text-gray-400 data-[state=active]:text-white">
                Gaps
              </TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="p-6 space-y-4">
              {results.summary.keyInsights.map((insight, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="text-cyan-400">
                        {getInsightIcon(insight.category)}
                      </div>
                      <Badge className="bg-purple-400/10 text-purple-400 border-purple-400">
                        {insight.category}
                      </Badge>
                      <Badge className="bg-green-400/10 text-green-400 border-green-400">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                  <p className="text-white mb-3">{insight.insight}</p>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Source Documents:</p>
                    <div className="flex flex-wrap gap-1">
                      {insight.sourceDocuments.map((doc, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs text-gray-300">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="connections" className="p-6 space-y-4">
              {results.connections.map((connection, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Network className="h-4 w-4 text-cyan-400" />
                      <Badge className={`border ${getRelationshipColor(connection.relationshipType)}`}>
                        {connection.relationshipType}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm">Strength:</span>
                      <Progress value={connection.strength} className="w-20 h-2" />
                      <span className="text-white text-sm">{connection.strength}%</span>
                    </div>
                  </div>
                  <p className="text-white mb-3">{connection.description}</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-400 text-sm">Connected Documents:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {connection.documents.map((doc, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs text-gray-300">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Evidence:</p>
                      <ul className="list-disc list-inside text-gray-300 text-sm mt-1 space-y-1">
                        {connection.evidence.map((evidence, idx) => (
                          <li key={idx}>{evidence}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="timeline" className="p-6 space-y-4">
              {results.timeline.map((event, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-cyan-400" />
                      <span className="text-white font-medium">{event.date}</span>
                      <Badge className={`border ${
                        event.importance === 'high' ? 'border-red-400 text-red-400' :
                        event.importance === 'medium' ? 'border-yellow-400 text-yellow-400' :
                        'border-blue-400 text-blue-400'
                      }`}>
                        {event.importance} importance
                      </Badge>
                    </div>
                    <Badge className="bg-purple-400/10 text-purple-400 border-purple-400">
                      {event.category}
                    </Badge>
                  </div>
                  <p className="text-white mb-3">{event.event}</p>
                  <div>
                    <p className="text-gray-400 text-sm">Source Documents:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {event.documents.map((doc, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs text-gray-300">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="contradictions" className="p-6 space-y-4">
              {results.contradictions.map((contradiction, index) => (
                <div key={index} className={`rounded-lg p-4 border ${getSeverityColor(contradiction.severity)}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium">{contradiction.issue}</span>
                    </div>
                    <Badge className={`border ${getSeverityColor(contradiction.severity)}`}>
                      {contradiction.severity}
                    </Badge>
                  </div>
                  <p className="mb-3">{contradiction.description}</p>
                  <div className="mb-3">
                    <p className="text-gray-400 text-sm mb-1">Affected Documents:</p>
                    <div className="flex flex-wrap gap-1">
                      {contradiction.documents.map((doc, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded p-3">
                    <p className="text-gray-400 text-sm mb-1">Recommendation:</p>
                    <p className="text-sm">{contradiction.recommendation}</p>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="gaps" className="p-6 space-y-4">
              {results.gaps.map((gap, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium">{gap.area}</span>
                    <Badge className={`border ${
                      gap.priority === 'high' ? 'border-red-400 text-red-400' :
                      gap.priority === 'medium' ? 'border-yellow-400 text-yellow-400' :
                      'border-blue-400 text-blue-400'
                    }`}>
                      {gap.priority} priority
                    </Badge>
                  </div>
                  <p className="text-gray-300 mb-3">{gap.description}</p>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Suggested Sources:</p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      {gap.suggestedSources.map((source, idx) => (
                        <li key={idx}>{source}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Analysis Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-gray-900 rounded-lg p-3">
              <p className="text-gray-400 text-sm">Total Documents</p>
              <p className="text-white text-lg font-semibold">{results.statistics.totalDocuments}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3">
              <p className="text-gray-400 text-sm">Total Words</p>
              <p className="text-white text-lg font-semibold">{results.statistics.totalWords.toLocaleString()}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3">
              <p className="text-gray-400 text-sm">Analysis Depth</p>
              <p className="text-white text-lg font-semibold">{results.statistics.avgAnalysisDepth}%</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3">
              <p className="text-gray-400 text-sm">Processing Time</p>
              <p className="text-white text-lg font-semibold">{results.statistics.processingTime}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3">
              <p className="text-gray-400 text-sm">Last Analyzed</p>
              <p className="text-white text-lg font-semibold">
                {new Date(results.statistics.lastAnalyzed).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealAnalysisResults;
