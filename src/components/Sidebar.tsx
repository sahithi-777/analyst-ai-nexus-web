
import React, { useState } from 'react';
import { BarChart3, FileText, Home, Settings, Users, Clock, ChevronDown, ChevronRight, Plus, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedSections, setExpandedSections] = useState<string[]>(['history']);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'documents', label: 'Documents', icon: FileText, gradient: 'from-green-500 to-emerald-500' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, gradient: 'from-purple-500 to-pink-500' },
    { id: 'settings', label: 'Settings', icon: Settings, gradient: 'from-orange-500 to-red-500' },
  ];

  const analysisHistory = [
    { id: 1, name: 'Q4 Market Analysis', date: '2 hours ago', docs: 5, status: 'completed', accuracy: 94 },
    { id: 2, name: 'Competitor Research', date: '1 day ago', docs: 3, status: 'completed', accuracy: 91 },
    { id: 3, name: 'Industry Trends Study', date: '3 days ago', docs: 8, status: 'completed', accuracy: 96 },
    { id: 4, name: 'Customer Behavior Analysis', date: '1 week ago', docs: 12, status: 'completed', accuracy: 89 },
  ];

  const quickStats = {
    totalDocuments: 142,
    analysesCompleted: 23,
    activeProjects: 3,
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-900/80 to-gray-900/95 backdrop-blur-sm">
      {/* Enhanced Header */}
      <div className="p-6 border-b border-gray-800/50">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Research Hub</h2>
            <p className="text-xs text-gray-400">AI-Powered Analysis</p>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>

        {/* Enhanced Quick Stats */}
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-300 font-medium">Documents</p>
                <p className="text-xl font-bold text-white">{quickStats.totalDocuments}</p>
              </div>
              <FileText className="h-6 w-6 text-blue-400" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-purple-300 font-medium">Analyses</p>
                <p className="text-xl font-bold text-white">{quickStats.analysesCompleted}</p>
              </div>
              <BarChart3 className="h-6 w-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation */}
      <div className="p-6 border-b border-gray-800/50">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                group w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden
                ${activeTab === item.id 
                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-blue-500/25` 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }
              `}
            >
              <item.icon className="h-5 w-5 relative z-10" />
              <span className="font-medium relative z-10">{item.label}</span>
              
              {/* Hover effect */}
              {activeTab !== item.id && (
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`} />
              )}
            </button>
          ))}
        </nav>
      </div>

      <ScrollArea className="flex-1 p-6">
        {/* Enhanced Analysis History */}
        <div>
          <button
            onClick={() => toggleSection('history')}
            className="flex items-center space-x-2 text-sm text-gray-400 uppercase tracking-wide w-full hover:text-gray-300 transition-colors mb-4 group"
          >
            {expandedSections.includes('history') ? (
              <ChevronDown className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
            ) : (
              <ChevronRight className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
            )}
            <Clock className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
            <span>Analysis History</span>
            <Badge variant="secondary" className="ml-auto bg-gray-700 text-gray-300">{analysisHistory.length}</Badge>
          </button>
          
          {expandedSections.includes('history') && (
            <div className="space-y-3 animate-fade-in">
              {analysisHistory.map((analysis) => (
                <div
                  key={analysis.id}
                  className="group p-4 rounded-xl hover:bg-gray-800/50 cursor-pointer transition-all duration-300 border border-transparent hover:border-gray-700/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                        {analysis.name}
                      </p>
                      <div className="flex items-center space-x-3 mt-2">
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-400">{analysis.docs} docs</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-green-400">{analysis.accuracy}% accurate</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{analysis.date}</p>
                    </div>
                    <Badge 
                      variant="default"
                      className="text-xs bg-green-600/20 text-green-400 border-green-600/30"
                    >
                      {analysis.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
