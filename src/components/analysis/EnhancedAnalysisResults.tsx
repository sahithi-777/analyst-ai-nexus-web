
import React, { useState } from 'react';
import { Brain, FileText, MessageCircle, TrendingUp, AlertTriangle, Clock, Target, Network, Download, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DeepAnalysisResult } from '@/utils/enhancedAiProcessor';

interface EnhancedAnalysisResultsProps {
  results: DeepAnalysisResult;
}

const EnhancedAnalysisResults = ({ results }: EnhancedAnalysisResultsProps) => {
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-6 w-6 mr-3 text-cyan-400" />
              Enhanced Analysis Results
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                Confidence: {results.confidence}%
              </Badge>
              <Button size="sm" variant="outline" className="text-gray-300 border-gray-600">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">{results.summary}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Brain className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="text-white font-medium">{results.insights.length}</div>
                  <div className="text-gray-400 text-sm">Key Insights</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Network className="h-5 w-5 text-green-400" />
                <div>
                  <div className="text-white font-medium">{results.relationships.length}</div>
                  <div className="text-gray-400 text-sm">Relationships</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <div>
                  <div className="text-white font-medium">{results.issues.length}</div>
                  <div className="text-gray-400 text-sm">Issues Found</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Target className="h-5 w-5 text-purple-400" />
                <div>
                  <div className="text-white font-medium">{results.actionableInsights.length}</div>
                  <div className="text-gray-400 text-sm">Action Items</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-gray-800 border border-gray-700">
          <TabsTrigger value="insights" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
            💡 Insights
          </TabsTrigger>
          <TabsTrigger value="themes" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
            🎯 Themes
          </TabsTrigger>
          <TabsTrigger value="relationships" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
            🔗 Relations
          </TabsTrigger>
          <TabsTrigger value="issues" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
            ⚠️ Issues
          </TabsTrigger>
          <TabsTrigger value="timeline" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
            ⏰ Timeline
          </TabsTrigger>
          <TabsTrigger value="actions" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
            🚀 Actions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {results.insights.map((insight) => (
              <Card key={insight.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer"
                    onClick={() => setSelectedInsight(selectedInsight === insight.id ? null : insight.id)}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white text-sm mb-2">{insight.insight}</CardTitle>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="text-xs">
                          {insight.category}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-xs">Impact:</span>
                          <Progress value={insight.impact} className="w-16 h-2" />
                          <span className="text-gray-400 text-xs">{insight.impact}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-xs">Confidence:</span>
                          <Progress value={insight.confidence} className="w-16 h-2" />
                          <span className="text-gray-400 text-xs">{insight.confidence}%</span>
                        </div>
                      </div>
                    </div>
                    <Eye className="h-4 w-4 text-gray-400" />
                  </div>
                </CardHeader>
                {selectedInsight === insight.id && (
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <h4 className="text-white text-sm font-medium">Supporting Evidence:</h4>
                      <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                        {insight.supportingEvidence.map((evidence, idx) => (
                          <li key={idx}>{evidence}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="themes" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.themes.map((theme) => (
              <Card key={theme.id} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-sm">{theme.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-xs">Prevalence:</span>
                    <Progress value={theme.prevalence} className="flex-1 h-2" />
                    <span className="text-gray-400 text-xs">{theme.prevalence}%</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-300 text-sm">{theme.description}</p>
                  <div>
                    <h5 className="text-white text-xs font-medium mb-2">Related Concepts:</h5>
                    <div className="flex flex-wrap gap-2">
                      {theme.relatedConcepts.map((concept, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {concept}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="relationships" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {results.relationships.map((rel) => (
              <Card key={rel.id} className="bg-gray-800 border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="text-blue-400 border-blue-400">
                        {rel.concept1}
                      </Badge>
                      <div className="text-gray-400 text-sm">
                        {rel.relationship === 'causal' ? '→' : 
                         rel.relationship === 'correlational' ? '↔' : 
                         rel.relationship === 'conflicting' ? '⚡' : '↔'}
                      </div>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        {rel.concept2}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-xs">Strength:</span>
                      <Progress value={rel.strength} className="w-16 h-2" />
                      <span className="text-gray-400 text-xs">{rel.strength}%</span>
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm">
                    <span className="font-medium">Type:</span> {rel.relationship}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="issues" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {results.issues.map((issue) => (
              <Card key={issue.id} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-white text-sm">{issue.issue}</CardTitle>
                    <Badge variant={issue.severity === 'high' ? 'destructive' : 
                                  issue.severity === 'medium' ? 'default' : 'secondary'}>
                      {issue.severity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-gray-400 text-sm font-medium">Category:</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {issue.category}
                    </Badge>
                  </div>
                  {issue.mitigation.length > 0 && (
                    <div>
                      <h5 className="text-white text-xs font-medium mb-2">Mitigation Strategies:</h5>
                      <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                        {issue.mitigation.map((strategy, idx) => (
                          <li key={idx}>{strategy}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <div className="space-y-4">
            {results.timeline.map((event) => (
              <Card key={event.id} className="bg-gray-800 border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-white font-medium">{event.event}</h3>
                        <Badge variant="outline" className="text-xs">
                          {event.date}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {event.category}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm">{event.context}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-gray-400 text-xs">Significance:</span>
                        <Progress value={event.significance} className="w-20 h-2" />
                        <span className="text-gray-400 text-xs">{event.significance}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="actions" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {results.actionableInsights.map((action) => (
              <Card key={action.id} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-white text-sm">{action.insight}</CardTitle>
                    <Badge variant={action.priority === 'high' ? 'destructive' : 
                                  action.priority === 'medium' ? 'default' : 'secondary'}>
                      {action.priority} priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="text-white text-xs font-medium mb-2">Actions:</h5>
                    <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                      {action.actions.map((actionItem, idx) => (
                        <li key={idx}>{actionItem}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Timeline: {action.timeline}</span>
                  </div>
                  {action.outcomes.length > 0 && (
                    <div>
                      <h5 className="text-white text-xs font-medium mb-2">Expected Outcomes:</h5>
                      <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                        {action.outcomes.map((outcome, idx) => (
                          <li key={idx}>{outcome}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedAnalysisResults;
