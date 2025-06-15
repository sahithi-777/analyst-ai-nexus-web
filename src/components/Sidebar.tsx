
import React, { useState } from 'react';
import { BarChart3, FileText, Home, Settings, Users, Clock, ChevronDown, ChevronRight, Plus } from 'lucide-react';
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
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const analysisHistory = [
    { id: 1, name: 'Q4 Market Analysis', date: '2 hours ago', docs: 5, status: 'completed' },
    { id: 2, name: 'Competitor Research', date: '1 day ago', docs: 3, status: 'completed' },
    { id: 3, name: 'Industry Trends Study', date: '3 days ago', docs: 8, status: 'completed' },
    { id: 4, name: 'Customer Behavior Analysis', date: '1 week ago', docs: 12, status: 'completed' },
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
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed xl:relative top-0 left-0 h-full w-80 bg-gray-900 border-r border-gray-800 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Research Hub</h2>
          </div>

          <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white mb-4">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Documents</p>
                  <p className="text-lg font-semibold text-white">{quickStats.totalDocuments}</p>
                </div>
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Analyses</p>
                  <p className="text-lg font-semibold text-white">{quickStats.analysesCompleted}</p>
                </div>
                <BarChart3 className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6 border-b border-gray-800">
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                  ${activeTab === item.id 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <ScrollArea className="flex-1 p-6">
          {/* Analysis History */}
          <div>
            <button
              onClick={() => toggleSection('history')}
              className="flex items-center space-x-2 text-sm text-gray-400 uppercase tracking-wide w-full hover:text-gray-300 transition-colors mb-3"
            >
              {expandedSections.includes('history') ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <Clock className="h-4 w-4" />
              <span>Analysis History</span>
              <Badge variant="secondary" className="ml-auto">{analysisHistory.length}</Badge>
            </button>
            
            {expandedSections.includes('history') && (
              <div className="space-y-2">
                {analysisHistory.map((analysis) => (
                  <div
                    key={analysis.id}
                    className="group p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                          {analysis.name}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-400">{analysis.docs} docs</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-400">{analysis.date}</span>
                        </div>
                      </div>
                      <Badge 
                        variant="default"
                        className="text-xs bg-green-600"
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
      </aside>
    </>
  );
};

export default Sidebar;
