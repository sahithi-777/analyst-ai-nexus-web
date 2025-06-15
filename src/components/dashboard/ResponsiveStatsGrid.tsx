
import React from 'react';
import { FileText, Brain, TrendingUp, BarChart3, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: React.ElementType;
  gradient: string;
  isCompact?: boolean;
}

const StatCard = ({ title, value, change, changeType, icon: Icon, gradient, isCompact = false }: StatCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase': return 'text-green-400';
      case 'decrease': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="group relative overflow-hidden border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm hover:from-gray-800/60 hover:to-gray-700/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 touch-manipulation">
      <CardContent className={`${isCompact ? 'p-3' : 'p-4 sm:p-6'}`}>
        <div className="flex items-center justify-between">
          <div className="space-y-1 flex-1 min-w-0">
            <p className={`${isCompact ? 'text-xs' : 'text-xs sm:text-sm'} font-medium text-gray-400 group-hover:text-gray-300 transition-colors truncate`}>
              {title}
            </p>
            <p className={`${isCompact ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl lg:text-3xl'} font-bold text-white group-hover:text-blue-50 transition-colors`}>
              {value}
            </p>
            {change && !isCompact && (
              <div className="flex items-center space-x-1">
                <span className={`text-xs sm:text-sm font-medium ${getChangeColor()}`}>
                  {changeType === 'increase' ? '+' : changeType === 'decrease' ? '-' : ''}{change}
                </span>
                <span className="text-xs text-gray-500 hidden sm:inline">vs last week</span>
              </div>
            )}
            {change && isCompact && (
              <span className={`text-xs font-medium ${getChangeColor()}`}>
                {changeType === 'increase' ? '+' : changeType === 'decrease' ? '-' : ''}{change}
              </span>
            )}
          </div>
          <div className={`${isCompact ? 'p-2 sm:p-3' : 'p-3 sm:p-4'} rounded-xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ml-2 sm:ml-3`}>
            <Icon className={`${isCompact ? 'h-4 w-4 sm:h-5 sm:w-5' : 'h-5 w-5 sm:h-6 sm:w-6'} text-white`} />
          </div>
        </div>
        
        {/* Subtle animated border */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardContent>
    </Card>
  );
};

interface ResponsiveStatsGridProps {
  stats: Array<{
    title: string;
    value: string;
    change?: string;
    changeType?: 'increase' | 'decrease' | 'neutral';
    icon: React.ElementType;
    gradient: string;
  }>;
  isMobile?: boolean;
}

const ResponsiveStatsGrid = ({ stats, isMobile = false }: ResponsiveStatsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          changeType={stat.changeType}
          icon={stat.icon}
          gradient={stat.gradient}
          isCompact={isMobile}
        />
      ))}
    </div>
  );
};

export default ResponsiveStatsGrid;
