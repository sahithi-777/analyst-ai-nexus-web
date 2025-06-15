
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
    <Card className="border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm h-fit">
      <CardHeader className="pb-4 sm:pb-6">
        <CardTitle className="text-white flex items-center space-x-2 text-lg sm:text-xl">
          <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        {/* Improved responsive grid with better spacing */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2">
          {actions.map((action) => (
            <Button
              key={action.id}
              onClick={action.onClick}
              className={`
                group relative h-auto p-4 sm:p-5 lg:p-6 bg-gradient-to-br ${action.gradient} 
                hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20
                border-0 text-white aspect-square sm:aspect-auto sm:min-h-[120px] lg:min-h-[140px] xl:min-h-[120px] 2xl:min-h-[130px]
                text-left flex flex-col
              `}
            >
              <div className="flex flex-col items-start justify-between h-full w-full space-y-3 sm:space-y-4">
                {/* Icon container with better sizing */}
                <div className="p-2 sm:p-3 lg:p-4 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors flex-shrink-0">
                  <action.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                </div>
                
                {/* Text content with improved spacing */}
                <div className="flex-1 text-left min-w-0">
                  <div className="font-semibold text-sm sm:text-base lg:text-lg leading-tight mb-1 sm:mb-2">
                    {action.title}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base opacity-90 leading-tight line-clamp-2">
                    {action.description}
                  </div>
                </div>
              </div>
              
              {/* Enhanced hover effects */}
              <div className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/0 to-transparent group-hover:from-white/5 transition-all duration-300" />
            </Button>
          ))}
        </div>

        {/* Improved help text */}
        <div className="mt-6 pt-4 border-t border-gray-700/30">
          <p className="text-xs sm:text-sm text-gray-400 text-center leading-relaxed">
            💡 Start by uploading documents to unlock AI-powered analysis
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
