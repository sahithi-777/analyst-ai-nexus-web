
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, TrendingUp, Users, AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { RealAnalysisResult } from '@/utils/realAiProcessor';
import ExportResults from './ExportResults';

interface RealAnalysisResultsProps {
  results: RealAnalysisResult;
}

const RealAnalysisResults = ({ results }: RealAnalysisResultsProps) => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    summary: true,
    insights: false,
    connections: false,
    contradictions: false,
    gaps: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'moderate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'minor': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRelationshipColor = (type: string) => {
    switch (type) {
      case 'complementary': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'contradictory': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'sequential': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'supporting': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <Collapsible open={openSections.summary} onOpenChange={() => toggleSection('summary')}>
        <Card className="bg-gray-800 border-gray-700">
          <CollapsibleTrigger className="w-full">
            <CardHeader className="hover:bg-gray-700/50 transition-colors cursor-pointer">
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-3 text-cyan-400" />
                  <span>Executive Summary</span>
                </div>
                {openSections.summary ? (
                  <ChevronDown className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="text-cyan-400 text-2xl font-bold">{results.summary.totalDocuments}</div>
                  <div className="text-gray-400 text-sm">Documents Analyzed</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="text-green-400 text-2xl font-bold">{results.summary.keyInsights.length}</div>
                  <div className="text-gray-400 text-sm">Key Insights</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="text-blue-400 text-2xl font-bold">{results.summary.totalWords.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">Total Words</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="text-purple-400 text-2xl font-bold">{Math.round(results.summary.avgConfidenceScore)}%</div>
                  <div className="text-gray-400 text-sm">Avg Confidence</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Primary Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.summary.primaryTopics.map((topic, index) => (
                      <Badge key={index} className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Document Types</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(results.summary.documentTypes).map(([type, count]) => (
                      <Badge key={type} variant="outline" className="border-gray-600 text-gray-300">
                        {type}: {count}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Key Insights */}
      <Collapsible open={openSections.insights} onOpenChange={() => toggleSection('insights')}>
        <Card className="bg-gray-800 border-gray-700">
          <CollapsibleTrigger className="w-full">
            <CardHeader className="hover:bg-gray-700/50 transition-colors cursor-pointer">
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-green-400" />
                  <span>Key Insights ({results.summary.keyInsights.length})</span>
                </div>
                {openSections.insights ? (
                  <ChevronDown className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {results.summary.keyInsights.map((insight, index) => (
                  <div key={index} className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium">{insight.insight}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs ${
                          insight.category === 'trend' ? 'bg-blue-500/20 text-blue-400' :
                          insight.category === 'finding' ? 'bg-green-500/20 text-green-400' :
                          insight.category === 'recommendation' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {insight.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {insight.confidence}% confidence
                        </Badge>
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm">
                      Sources: {insight.sourceDocuments.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Document Connections */}
      <Collapsible open={openSections.connections} onOpenChange={() => toggleSection('connections')}>
        <Card className="bg-gray-800 border-gray-700">
          <CollapsibleTrigger className="w-full">
            <CardHeader className="hover:bg-gray-700/50 transition-colors cursor-pointer">
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-3 text-purple-400" />
                  <span>Document Connections ({results.connections.length})</span>
                </div>
                {openSections.connections ? (
                  <ChevronDown className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {results.connections.map((connection, index) => (
                  <div key={index} className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium">{connection.description}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className={getRelationshipColor(connection.relationshipType)}>
                          {connection.relationshipType}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {connection.strength}% strength
                        </Badge>
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm mb-2">
                      Documents: {connection.documents.join(', ')}
                    </div>
                    <div className="text-gray-500 text-xs">
                      Evidence: {connection.evidence.join('; ')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Contradictions */}
      {results.contradictions.length > 0 && (
        <Collapsible open={openSections.contradictions} onOpenChange={() => toggleSection('contradictions')}>
          <Card className="bg-gray-800 border-gray-700">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="hover:bg-gray-700/50 transition-colors cursor-pointer">
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <XCircle className="h-5 w-5 mr-3 text-red-400" />
                    <span>Contradictions Found ({results.contradictions.length})</span>
                  </div>
                  {openSections.contradictions ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {results.contradictions.map((contradiction, index) => (
                    <div key={index} className="bg-gray-900 rounded-lg p-4 border-l-4 border-red-500">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-medium">{contradiction.issue}</h4>
                        <Badge className={getSeverityColor(contradiction.severity)}>
                          {contradiction.severity}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{contradiction.description}</p>
                      <div className="text-gray-400 text-sm mb-2">
                        Documents: {contradiction.documents.join(', ')}
                      </div>
                      <div className="text-blue-300 text-sm">
                        <strong>Recommendation:</strong> {contradiction.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Research Gaps */}
      <Collapsible open={openSections.gaps} onOpenChange={() => toggleSection('gaps')}>
        <Card className="bg-gray-800 border-gray-700">
          <CollapsibleTrigger className="w-full">
            <CardHeader className="hover:bg-gray-700/50 transition-colors cursor-pointer">
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-3 text-yellow-400" />
                  <span>Research Gaps ({results.gaps.length})</span>
                </div>
                {openSections.gaps ? (
                  <ChevronDown className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {results.gaps.map((gap, index) => (
                  <div key={index} className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium">{gap.area}</h4>
                      <Badge className={getPriorityColor(gap.priority)}>
                        {gap.priority} priority
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{gap.description}</p>
                    <div className="text-gray-400 text-sm">
                      <strong>Suggested Sources:</strong> {gap.suggestedSources.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Export Options */}
      <ExportResults 
        analysisResults={results} 
        processedFiles={[]} 
      />
    </div>
  );
};

export default RealAnalysisResults;
