
import React from 'react';
import { Upload, BarChart3, Download, Plus, Zap, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  onClick: () => void;
}

interface MobileQuickActionsProps {
  onUploadClick: () => void;
  onAnalyzeClick: () => void;
  onExportClick: () => void;
  onNewProjectClick: () => void;
}

const MobileQuickActions = ({ onUploadClick, onAnalyzeClick, onExportClick, onNewProjectClick }: MobileQuickActionsProps) => {
  const actions: QuickAction[] = [
    {
      id: 'upload',
      title: 'Upload',
      description: 'Add files',
      icon: Upload,
      gradient: 'from-blue-500 to-cyan-500',
      onClick: onUploadClick
    },
    {
      id: 'analyze',
      title: 'Analyze',
      description: 'AI insights',
      icon: BarChart3,
      gradient: 'from-purple-500 to-pink-500',
      onClick: onAnalyzeClick
    },
    {
      id: 'export',
      title: 'Export',
      description: 'Download',
      icon: Download,
      gradient: 'from-green-500 to-emerald-500',
      onClick: onExportClick
    },
    {
      id: 'project',
      title: 'Project',
      description: 'Start new',
      icon: Plus,
      gradient: 'from-orange-500 to-red-500',
      onClick: onNewProjectClick
    }
  ];

  return (
    <Card className="border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm">
      <CardHeader className="pb-2 sm:pb-3">
        <CardTitle className="text-white flex items-center space-x-2 text-sm sm:text-base">
          <Zap className="h-4 w-4 text-yellow-400" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 pt-0">
        {/* Mobile: Horizontal scroll layout */}
        <div className="sm:hidden flex space-x-3 overflow-x-auto pb-2 -mx-1 px-1">
          {actions.map((action) => (
            <Button
              key={action.id}
              onClick={action.onClick}
              className={`
                group relative flex-shrink-0 w-20 h-20 p-2 bg-gradient-to-br ${action.gradient} 
                hover:scale-105 transition-all duration-300 hover:shadow-lg
                border-0 text-white flex flex-col items-center justify-center space-y-1
                touch-manipulation
              `}
            >
              <action.icon className="h-5 w-5" />
              <span className="text-xs font-medium leading-tight text-center">{action.title}</span>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          ))}
        </div>

        {/* Tablet+: Grid layout */}
        <div className="hidden sm:grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button
              key={action.id}
              onClick={action.onClick}
              className={`
                group relative h-auto p-3 bg-gradient-to-br ${action.gradient} 
                hover:scale-105 transition-all duration-300 hover:shadow-lg
                border-0 text-white min-h-[80px] touch-manipulation
              `}
            >
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                  <action.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm leading-tight">{action.title}</div>
                  <div className="text-xs opacity-90 mt-1 leading-tight">{action.description}</div>
                </div>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileQuickActions;
