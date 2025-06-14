
import React from 'react';
import { FileText, Folder, Search, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const documents = [
    { id: 1, name: 'Market Research Q4 2024.pdf', type: 'pdf', size: '2.4 MB', date: '2 hours ago' },
    { id: 2, name: 'Competitor Analysis.docx', type: 'doc', size: '1.8 MB', date: '1 day ago' },
    { id: 3, name: 'Industry Trends Report.xlsx', type: 'excel', size: '3.2 MB', date: '3 days ago' },
    { id: 4, name: 'Customer Survey Results.pdf', type: 'pdf', size: '1.5 MB', date: '1 week ago' },
    { id: 5, name: 'Financial Projections.xlsx', type: 'excel', size: '2.1 MB', date: '2 weeks ago' },
  ];

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
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Documents</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-800 md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="mt-4 space-y-3">
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
              Upload Document
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400 uppercase tracking-wide">
              <Folder className="h-4 w-4" />
              <span>Recent Documents</span>
            </div>
            
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
        </ScrollArea>
      </aside>
    </>
  );
};

export default Sidebar;
