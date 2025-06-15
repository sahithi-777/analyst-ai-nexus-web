
import React, { useState } from 'react';
import { FileText, Folder, Search, Plus, X, BarChart3, Clock, Users, Settings, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['recent']);

  const documents = [
    { id: 1, name: 'Market Research Q4 2024.pdf', type: 'pdf', size: '2.4 MB', date: '2 hours ago' },
    { id: 2, name: 'Competitor Analysis.docx', type: 'doc', size: '1.8 MB', date: '1 day ago' },
    { id: 3, name: 'Industry Trends Report.xlsx', type: 'excel', size: '3.2 MB', date: '3 days ago' },
    { id: 4, name: 'Customer Survey Results.pdf', type: 'pdf', size: '1.5 MB', date: '1 week ago' },
    { id: 5, name: 'Financial Projections.xlsx', type: 'excel', size: '2.1 MB', date: '2 weeks ago' },
  ];

  const recentAnalyses = [
    { id: 1, name: 'Q4 Market Analysis', docs: 5, date: '2 hours ago', status: 'completed' },
    { id: 2, name: 'Competitor Research', docs: 3, date: '1 day ago', status: 'completed' },
    { id: 3, name: 'Industry Trends Study', docs: 8, date: '3 days ago', status: 'completed' },
  ];

  const projectFolders = [
    { id: 1, name: 'Market Research 2024', docs: 12, analyses: 3 },
    { id: 2, name: 'Competitor Analysis', docs: 8, analyses: 2 },
    { id: 3, name: 'Customer Insights', docs: 15, analyses: 5 },
  ];

  const stats = {
    totalDocuments: 142,
    analysesCompleted: 23,
    activeProjects: 3,
    lastActivity: '2 hours ago'
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed md:relative top-0 left-0 h-full w-80 bg-gray-900 border-r border-gray-800 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Research Hub</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-800 md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-blue-400" />
                <div>
                  <p className="text-xs text-gray-400">Documents</p>
                  <p className="text-sm font-semibold text-white">{stats.totalDocuments}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-green-400" />
                <div>
                  <p className="text-xs text-gray-400">Analyses</p>
                  <p className="text-sm font-semibold text-white">{stats.analysesCompleted}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {/* Recent Analyses */}
            <div>
              <button
                onClick={() => toggleFolder('recent')}
                className="flex items-center space-x-2 text-sm text-gray-400 uppercase tracking-wide w-full hover:text-gray-300 transition-colors"
              >
                {expandedFolders.includes('recent') ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <Clock className="h-4 w-4" />
                <span>Recent Analyses</span>
                <Badge variant="secondary" className="ml-auto">{recentAnalyses.length}</Badge>
              </button>
              
              {expandedFolders.includes('recent') && (
                <div className="mt-3 space-y-2">
                  {recentAnalyses.map((analysis) => (
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
                          variant={analysis.status === 'completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {analysis.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Project Folders */}
            <div>
              <button
                onClick={() => toggleFolder('projects')}
                className="flex items-center space-x-2 text-sm text-gray-400 uppercase tracking-wide w-full hover:text-gray-300 transition-colors"
              >
                {expandedFolders.includes('projects') ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <Folder className="h-4 w-4" />
                <span>Projects</span>
                <Badge variant="secondary" className="ml-auto">{projectFolders.length}</Badge>
              </button>
              
              {expandedFolders.includes('projects') && (
                <div className="mt-3 space-y-2">
                  {projectFolders.map((folder) => (
                    <div
                      key={folder.id}
                      className="group p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <Folder className="h-5 w-5 text-yellow-400 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                            {folder.name}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-400">{folder.docs} docs</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-400">{folder.analyses} analyses</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Documents */}
            <div>
              <button
                onClick={() => toggleFolder('documents')}
                className="flex items-center space-x-2 text-sm text-gray-400 uppercase tracking-wide w-full hover:text-gray-300 transition-colors"
              >
                {expandedFolders.includes('documents') ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <FileText className="h-4 w-4" />
                <span>Recent Documents</span>
                <Badge variant="secondary" className="ml-auto">{documents.length}</Badge>
              </button>
              
              {expandedFolders.includes('documents') && (
                <div className="mt-3 space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="group p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          <FileText className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                            {doc.name}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-400">{doc.size}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-400">{doc.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};

export default Sidebar;
