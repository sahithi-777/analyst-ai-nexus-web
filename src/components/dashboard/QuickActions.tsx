
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
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-white flex items-center space-x-2 text-base sm:text-lg">
          <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0">
        {/* Responsive grid that adapts to screen size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-3 sm:gap-4">
          {actions.map((action) => (
            <Button
              key={action.id}
              onClick={action.onClick}
              className={`
                group relative h-auto p-4 sm:p-5 bg-gradient-to-br ${action.gradient} 
                hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25
                border-0 text-white min-h-[100px] sm:min-h-[120px] xl:min-h-[100px] 2xl:min-h-[120px]
                text-left
              `}
            >
              <div className="flex flex-col items-start space-y-3 w-full">
                <div className="p-2 sm:p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                  <action.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-sm sm:text-base leading-tight mb-1">{action.title}</div>
                  <div className="text-xs sm:text-sm opacity-90 leading-tight">{action.description}</div>
                </div>
              </div>
              
              {/* Enhanced hover glow effect */}
              <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          ))}
        </div>

        {/* Additional help text for better UX */}
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <p className="text-xs text-gray-400 text-center">
            💡 Start by uploading documents to unlock AI-powered analysis
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
