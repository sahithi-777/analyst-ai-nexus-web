
import React, { useState, useRef, useEffect } from 'react';
import { Home, FileText, BarChart3, Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onQuickAction: () => void;
}

const MobileBottomNav = ({ activeTab, onTabChange, onQuickAction }: MobileBottomNavProps) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'documents', label: 'Docs', icon: FileText },
    { id: 'analytics', label: 'Charts', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Minimum swipe distance for gesture recognition
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    const currentIndex = navItems.findIndex(item => item.id === activeTab);
    
    if (isLeftSwipe && currentIndex < navItems.length - 1) {
      onTabChange(navItems[currentIndex + 1].id);
    }
    
    if (isRightSwipe && currentIndex > 0) {
      onTabChange(navItems[currentIndex - 1].id);
    }
  };

  // Add haptic feedback for supported devices
  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleTabChange = (tabId: string) => {
    triggerHaptic();
    onTabChange(tabId);
  };

  const handleQuickAction = () => {
    triggerHaptic();
    onQuickAction();
  };

  return (
    <>
      {/* Swipe indicator */}
      <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-40 lg:hidden">
        <div className="flex space-x-1">
          {navItems.map((item, index) => (
            <div
              key={item.id}
              className={`w-2 h-1 rounded-full transition-all duration-300 ${
                activeTab === item.id ? 'bg-blue-400 w-4' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      <div 
        ref={navRef}
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800/50"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex items-center justify-around px-2 py-2 pb-safe-area-pb">
          {navItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleTabChange(item.id)}
                className={`flex-1 flex flex-col items-center py-2 px-1 h-auto space-y-1 transition-all duration-300 ${
                  activeTab === item.id
                    ? 'text-blue-400 bg-blue-400/10 scale-110'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
                {/* Active indicator */}
                {activeTab === item.id && (
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                )}
              </Button>
              
              {/* Quick Action Button in the middle */}
              {index === 1 && (
                <Button
                  onClick={handleQuickAction}
                  className="mx-2 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
                >
                  <Plus className="h-6 w-6" />
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileBottomNav;
