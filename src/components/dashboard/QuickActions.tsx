
import React from 'react';
import { Upload, FileText, BarChart3, Download, Share2, Plus, Zap } from 'lucide-react';
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

interface QuickActionsProps {
  onUploadClick: () => void;
  onAnalyzeClick: () => void;
  onExportClick: () => void;
  onNewProjectClick: () => void;
}

const QuickActions = ({ onUploadClick, onAnalyzeClick, onExportClick, onNewProjectClick }: QuickActionsProps) => {
  const actions: QuickAction[] = [
    {
      id: 'upload',
      title: 'Upload Documents',
      description: 'Add new files for analysis',
      icon: Upload,
      gradient: 'from-blue-500 to-cyan-500',
      onClick: onUploadClick
    },
    {
      id: 'analyze',
      title: 'AI Analysis',
      description: 'Generate insights and summaries',
      icon: BarChart3,
      gradient: 'from-purple-500 to-pink-500',
      onClick: onAnalyzeClick
    },
    {
      id: 'export',
      title: 'Export Results',
      description: 'Download analysis reports',
      icon: Download,
      gradient: 'from-green-500 to-emerald-500',
      onClick: onExportClick
    },
    {
      id: 'project',
      title: 'New Project',
      description: 'Start fresh analysis',
      icon: Plus,
      gradient: 'from-orange-500 to-red-500',
      onClick: onNewProjectClick
    }
  ];

  return (
    <Card className="border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center space-x-2">
          <Zap className="h-5 w-5 text-yellow-400" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <Button
              key={action.id}
              onClick={action.onClick}
              className={`
                group relative h-auto p-4 bg-gradient-to-br ${action.gradient} 
                hover:scale-105 transition-all duration-300 hover:shadow-lg
                border-0 text-white
              `}
            >
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                  <action.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{action.title}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
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

export default QuickActions;
