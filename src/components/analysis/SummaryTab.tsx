
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, TrendingUp, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const SummaryTab = () => {
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
    { label: 'Documents Analyzed', value: '12', icon: FileText, color: 'text-blue-400' },
    { label: 'Key Insights', value: '23', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Stakeholders Mentioned', value: '15', icon: Users, color: 'text-purple-400' },
    { label: 'Time Period Covered', value: '18 months', icon: Calendar, color: 'text-cyan-400' }
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
                  <p>
                    The analyzed documents reveal a comprehensive research initiative spanning multiple domains 
                    with significant implications for strategic decision-making.
                  </p>
                  <p>
                    Key findings indicate strong convergence around emerging technologies, with particular 
                    emphasis on artificial intelligence applications and their potential market impact.
                  </p>
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
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <h4 className="text-cyan-400 font-semibold mb-2">Market Opportunity</h4>
                    <p className="text-gray-300 text-sm">
                      Documentation suggests a $2.3B market opportunity in the analyzed sector
                    </p>
                  </div>
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <h4 className="text-green-400 font-semibold mb-2">Technology Readiness</h4>
                    <p className="text-gray-300 text-sm">
                      Multiple sources confirm technology maturity reaching commercial viability
                    </p>
                  </div>
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <h4 className="text-purple-400 font-semibold mb-2">Competitive Landscape</h4>
                    <p className="text-gray-300 text-sm">
                      Analysis reveals 3 major competitors with distinct strategic approaches
                    </p>
                  </div>
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
                  <span>Common Themes</span>
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
                  {['Artificial Intelligence', 'Market Growth', 'Innovation', 'Sustainability', 'Digital Transformation', 'Risk Management'].map((theme, index) => (
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
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <p className="text-gray-300 text-sm">
                      Prioritize investment in AI capabilities to maintain competitive advantage
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <p className="text-gray-300 text-sm">
                      Develop strategic partnerships to accelerate market entry
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <p className="text-gray-300 text-sm">
                      Focus on sustainability initiatives to align with market trends
                    </p>
                  </div>
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
