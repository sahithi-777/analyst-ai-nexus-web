
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
}

const StatCard = ({ title, value, change, changeType, icon: Icon, gradient }: StatCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase': return 'text-green-400';
      case 'decrease': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="group relative overflow-hidden border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm hover:from-gray-800/60 hover:to-gray-700/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors truncate">
              {title}
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-blue-50 transition-colors">
              {value}
            </p>
            {change && (
              <div className="flex items-center space-x-1">
                <span className={`text-xs sm:text-sm font-medium ${getChangeColor()}`}>
                  {changeType === 'increase' ? '+' : changeType === 'decrease' ? '-' : ''}{change}
                </span>
                <span className="text-xs text-gray-500 hidden sm:inline">vs last week</span>
              </div>
            )}
          </div>
          <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ml-3`}>
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
        </div>
        
        {/* Subtle animated border */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardContent>
    </Card>
  );
};

interface StatsGridProps {
  stats: Array<{
    title: string;
    value: string;
    change?: string;
    changeType?: 'increase' | 'decrease' | 'neutral';
    icon: React.ElementType;
    gradient: string;
  }>;
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          changeType={stat.changeType}
          icon={stat.icon}
          gradient={stat.gradient}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
