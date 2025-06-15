
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, TrendingUp, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AnalysisResult } from '@/utils/fileProcessor';

interface SummaryTabProps {
  results: AnalysisResult;
}

const SummaryTab = ({ results }: SummaryTabProps) => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    overview: true,
    insights: false,
    themes: false,
    recommendations: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const keyStats = [
    { 
      label: 'Documents Analyzed', 
      value: results.statistics.totalDocuments.toString(), 
      icon: FileText, 
      color: 'text-blue-400' 
    },
    { 
      label: 'Key Insights', 
      value: results.summary.keyInsights.length.toString(), 
      icon: TrendingUp, 
      color: 'text-green-400' 
    },
    { 
      label: 'Main Themes', 
      value: results.summary.mainThemes.length.toString(), 
      icon: Users, 
      color: 'text-purple-400' 
    },
    { 
      label: 'Total Words', 
      value: results.statistics.totalWords.toLocaleString(), 
      icon: Calendar, 
      color: 'text-cyan-400' 
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyStats.map((stat, index) => (
          <Card key={index} className="bg-gray-700 border-gray-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-full bg-gray-800 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Expandable Sections */}
      <div className="space-y-4">
        {/* Executive Overview */}
        <Collapsible open={openSections.overview} onOpenChange={() => toggleSection('overview')}>
          <Card className="bg-gray-700 border-gray-600">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="hover:bg-gray-600 transition-colors cursor-pointer">
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Executive Overview</span>
                  {openSections.overview ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="text-gray-300 space-y-3">
                  <p>{results.summary.executiveSummary}</p>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Key Insights */}
        <Collapsible open={openSections.insights} onOpenChange={() => toggleSection('insights')}>
          <Card className="bg-gray-700 border-gray-600">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="hover:bg-gray-600 transition-colors cursor-pointer">
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Key Insights</span>
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
                <div className="space-y-3">
                  {results.summary.keyInsights.map((insight, index) => (
                    <div key={index} className="p-3 bg-gray-800 rounded-lg">
                      <p className="text-gray-300 text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Common Themes */}
        <Collapsible open={openSections.themes} onOpenChange={() => toggleSection('themes')}>
          <Card className="bg-gray-700 border-gray-600">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="hover:bg-gray-600 transition-colors cursor-pointer">
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Main Themes</span>
                  {openSections.themes ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {results.summary.mainThemes.map((theme, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      {theme}
                    </span>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Recommendations */}
        <Collapsible open={openSections.recommendations} onOpenChange={() => toggleSection('recommendations')}>
          <Card className="bg-gray-700 border-gray-600">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="hover:bg-gray-600 transition-colors cursor-pointer">
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Strategic Recommendations</span>
                  {openSections.recommendations ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {results.summary.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <p className="text-gray-300 text-sm">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </div>
  );
};

export default SummaryTab;
