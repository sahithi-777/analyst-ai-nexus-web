
import React from 'react';
import { Home, FileText, BarChart3, Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onQuickAction: (action: string) => void;
}

const MobileBottomNav = ({ activeTab, onTabChange, onQuickAction }: MobileBottomNavProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'documents', label: 'Docs', icon: FileText },
    { id: 'add', label: 'Add', icon: Plus, isAction: true },
    { id: 'analytics', label: 'Stats', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (item: any) => {
    if (item.isAction) {
      onQuickAction('upload');
    } else {
      onTabChange(item.id);
      onQuickAction(item.id);
    }
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800/50 pb-safe-area-pb lg:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          const isActionButton = item.isAction;

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => handleNavClick(item)}
              className={`
                flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 touch-manipulation min-w-0 flex-1
                ${isActive && !isActionButton
                  ? 'text-blue-400 bg-blue-500/10' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }
                ${isActionButton 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 mx-1 rounded-full' 
                  : ''
                }
              `}
              aria-label={item.label}
              role={isActionButton ? 'button' : 'tab'}
              aria-selected={isActive && !isActionButton}
            >
              <IconComponent className={`${isActionButton ? 'h-6 w-6' : 'h-5 w-5'} flex-shrink-0`} />
              <span className={`text-xs font-medium truncate ${isActionButton ? 'hidden' : ''}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
