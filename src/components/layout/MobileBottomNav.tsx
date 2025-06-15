
import React from 'react';
import { Home, FileText, BarChart3, Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onQuickAction: () => void;
}

const MobileBottomNav = ({ activeTab, onTabChange, onQuickAction }: MobileBottomNavProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'documents', label: 'Docs', icon: FileText },
    { id: 'analytics', label: 'Charts', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800/50">
      <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
        {navItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(item.id)}
              className={`flex-1 flex flex-col items-center py-2 px-1 h-auto space-y-1 ${
                activeTab === item.id
                  ? 'text-blue-400 bg-blue-400/10'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
            
            {/* Quick Action Button in the middle */}
            {index === 1 && (
              <Button
                onClick={onQuickAction}
                className="mx-2 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                <Plus className="h-6 w-6" />
              </Button>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;
