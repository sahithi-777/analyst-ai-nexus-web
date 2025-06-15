
import React, { useState } from 'react';
import { TrendingUp, FileText, Download, Share, Eye, BarChart3, Clock, MessageSquare, X, Maximize2, Minimize2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications } from '@/components/ui/notification';
import AdvancedChatInterface from './chat/AdvancedChatInterface';

interface RightPanelProps {
  hasDocuments: boolean;
}

const RightPanel = ({ hasDocuments }: RightPanelProps) => {
  const { addNotification } = useNotifications();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'insights' | 'chat'>('insights');

  const quickInsights = [
    { label: 'Key Themes', value: '12', trend: '+3' },
    { label: 'Contradictions', value: '2', trend: '-1' },
    { label: 'Data Points', value: '89', trend: '+15' },
  ];

  const recentActivity = [
    { type: 'analysis', name: 'Market Research completed', time: '2h ago', icon: BarChart3 },
    { type: 'document', name: 'Q4 Report uploaded', time: '4h ago', icon: FileText },
    { type: 'export', name: 'Data exported to CSV', time: '1d ago', icon: Download },
    { type: 'share', name: 'Analysis shared', time: '2d ago', icon: Share },
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'analysis': return 'text-green-400';
      case 'document': return 'text-blue-400';
      case 'export': return 'text-purple-400';
      case 'share': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  const handleExportReport = () => {
    addNotification({
      type: 'success',
      title: 'Export Started',
      message: 'Your analysis report is being prepared for download'
    });
    console.log('Exporting report...');
  };

  const handleShareAnalysis = () => {
    addNotification({
      type: 'info',
      title: 'Share Analysis',
      message: 'Analysis sharing link has been copied to clipboard'
    });
    console.log('Sharing analysis...');
  };

  return (
    <div className={`h-full bg-gray-950 border-l border-gray-800 flex flex-col transition-all duration-300 ${isExpanded ? 'w-[600px]' : 'w-80'}`}>
      {/* Enhanced Header with Navigation */}
      <div className="p-4 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-white">Research Assistant</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
          <Button
            variant={activeTab === 'insights' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('insights')}
            className={`flex-1 text-xs ${activeTab === 'insights' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <TrendingUp className="h-3 w-3 mr-1" />
            Insights
          </Button>
          <Button
            variant={activeTab === 'chat' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('chat')}
            className={`flex-1 text-xs ${activeTab === 'chat' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            Chat
          </Button>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'insights' ? (
        <>
          {/* Quick Insights */}
          <div className="p-4 border-b border-gray-800 flex-shrink-0">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-white flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-cyan-400" />
                  Quick Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {quickInsights.map((insight, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{insight.label}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-white">{insight.value}</span>
                        <span className={`text-xs ${insight.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {insight.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export Options */}
          <div className="p-4 border-b border-gray-800 flex-shrink-0">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white mb-3">Quick Actions</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportReport}
                className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShareAnalysis}
                className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Share className="h-4 w-4 mr-2" />
                Share Analysis
              </Button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-4 flex-1">
            <h3 className="text-sm font-medium text-white mb-3 flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              Recent Activity
            </h3>
            <ScrollArea className="h-full">
              <div className="space-y-3">
                {recentActivity.map((activity, index) => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <IconComponent className={`h-4 w-4 mt-0.5 ${getActivityColor(activity.type)}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white truncate">{activity.name}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </>
      ) : (
        /* Advanced Chat Interface */
        <div className="flex-1 p-4 min-h-0">
          <div className="h-full">
            <AdvancedChatInterface 
              hasDocuments={hasDocuments} 
              documents={['Research_Methods_2024.pdf', 'Analysis_Framework.docx', 'Implementation_Plan.pdf']}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RightPanel;
