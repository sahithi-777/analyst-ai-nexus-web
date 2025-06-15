
import React, { useState } from 'react';
import { Brain, TrendingUp, AlertTriangle, Clock, Target, Download, Eye, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DeepAnalysisResult } from '@/utils/enhancedAiProcessor';

interface EnhancedAnalysisResultsProps {
  results: DeepAnalysisResult;
  onExport?: () => void;
}

const EnhancedAnalysisResults = ({ results, onExport }: EnhancedAnalysisResultsProps) => {
  const [expandedInsights, setExpandedInsights] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState('overview');

  const toggleInsight = (id: string) => {
    setExpandedInsights(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-400';
    if (confidence >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.6) return 'Medium';
    return 'Low';
  };

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-cyan-400" />
              <span>Enhanced Analysis Results</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${getConfidenceColor(results.confidence)}`}>
                {getConfidenceLabel(results.confidence)} Confidence
              </span>
              <Badge variant="outline" className="border-cyan-400 text-cyan-400">
                {Math.round(results.confidence * 100)}%
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">{results.summary}</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-cyan-400 text-2xl font-bold">{results.insights.length}</div>
              <div className="text-gray-400 text-sm">Deep Insights</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-green-400 text-2xl font-bold">{results.relationships.length}</div>
              <div className="text-gray-400 text-sm">Relationships</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-yellow-400 text-2xl font-bold">{results.issues.length}</div>
              <div className="text-gray-400 text-sm">Issues Found</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-purple-400 text-2xl font-bold">{results.actionableInsights.length}</div>
              <div className="text-gray-400 text-sm">Action Items</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800 border border-gray-700">
          <TabsTrigger value="overview" className="text-gray-300 data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="insights" className="text-gray-300 data-[state=active]:text-white">Insights</TabsTrigger>
          <TabsTrigger value="relationships" className="text-gray-300 data-[state=active]:text-white">Relations</TabsTrigger>
          <TabsTrigger value="issues" className="text-gray-300 data-[state=active]:text-white">Issues</TabsTrigger>
          <TabsTrigger value="timeline" className="text-gray-300 data-[state=active]:text-white">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Key Themes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {results.themes.map((theme, index) => (
                    <Badge key={index} variant="outline" className="border-blue-400 text-blue-400">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Actionable Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.actionableInsights.slice(0, 3).map((insight) => (
                    <div key={insight.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{insight.title}</div>
                        <div className="text-gray-400 text-sm">{insight.category}</div>
                      </div>
                      <Badge variant={insight.priority === 'high' ? 'destructive' : insight.priority === 'medium' ? 'default' : 'secondary'}>
                        {insight.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="mt-4">
          <div className="space-y-4">
            {results.insights.map((insight) => (
              <Card key={insight.id} className="bg-gray-800 border-gray-700">
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => toggleInsight(insight.id)}
                >
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {expandedInsights.includes(insight.id) ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                      }
                      <span>{insight.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-cyan-400 text-cyan-400">
                        {insight.category}
                      </Badge>
                      <Badge variant={insight.impact === 'high' ? 'destructive' : 'default'}>
                        {insight.impact} impact
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                {expandedInsights.includes(insight.id) && (
                  <CardContent>
                    <p className="text-gray-300 mb-4">{insight.content}</p>
                    <div className="space-y-2">
                      <h4 className="text-white font-medium">Supporting Evidence:</h4>
                      <ul className="list-disc list-inside text-gray-400 space-y-1">
                        {insight.supportingEvidence.map((evidence, index) => (
                          <li key={index}>{evidence}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="relationships" className="mt-4">
          <div className="space-y-4">
            {results.relationships.map((rel) => (
              <Card key={rel.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="border-blue-400 text-blue-400">
                        {rel.concept1}
                      </Badge>
                      <div className={`text-sm ${
                        rel.relationshipType === 'supporting' ? 'text-green-400' :
                        rel.relationshipType === 'contradictory' ? 'text-red-400' :
                        rel.relationshipType === 'complementary' ? 'text-blue-400' :
                        'text-yellow-400'
                      }`}>
                        {rel.relationshipType}
                      </div>
                      <Badge variant="outline" className="border-purple-400 text-purple-400">
                        {rel.concept2}
                      </Badge>
                    </div>
                    <Progress value={rel.strength * 100} className="w-24" />
                  </div>
                  <p className="text-gray-300 text-sm">{rel.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="issues" className="mt-4">
          <div className="space-y-4">
            {results.issues.map((issue) => (
              <Card key={issue.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-medium">{issue.title}</h3>
                    <Badge variant={
                      issue.severity === 'high' ? 'destructive' :
                      issue.severity === 'moderate' ? 'default' : 'secondary'
                    }>
                      {issue.severity} severity
                    </Badge>
                  </div>
                  <p className="text-gray-300 mb-3">{issue.description}</p>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <h4 className="text-green-400 font-medium mb-2">Suggested Mitigation:</h4>
                    <p className="text-gray-300 text-sm">{issue.mitigation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <div className="space-y-4">
            {results.timeline.map((event) => (
              <Card key={event.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-500 rounded-full p-2">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-medium">{event.event}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-gray-400">
                            {event.date}
                          </Badge>
                          <Badge variant={event.importance === 'high' ? 'destructive' : event.importance === 'medium' ? 'default' : 'secondary'}>
                            {event.importance} importance
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-2">{event.description}</p>
                      <div className="text-sm text-gray-400">
                        <span className="font-medium">Context:</span> {event.context}
                      </div>
                      <div className="text-sm text-gray-400">
                        <span className="font-medium">Significance:</span> {event.significance}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Items */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-400" />
              <span>Actionable Insights</span>
            </div>
            {onExport && (
              <Button onClick={onExport} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.actionableInsights.map((insight) => (
              <div key={insight.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium">{insight.title}</h3>
                  <Badge variant={insight.priority === 'high' ? 'destructive' : insight.priority === 'medium' ? 'default' : 'secondary'}>
                    {insight.priority} priority
                  </Badge>
                </div>
                <p className="text-gray-300 mb-3">{insight.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-blue-400 font-medium mb-2">Recommended Actions:</h4>
                    <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                      {insight.actions.map((action, index) => (
                        <li key={index}>{action}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-green-400 font-medium mb-2">Expected Outcomes:</h4>
                    <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                      {insight.outcomes.map((outcome, index) => (
                        <li key={index}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAnalysisResults;
