
import React, { useState, useEffect } from 'react';
import { Menu, Bell, Search, Settings, X, PanelRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useKeyboardShortcuts, KeyboardShortcutsDialog } from '@/components/ui/keyboard-shortcuts';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useNotifications } from '@/components/ui/notification';
import UserAvatar from '../UserAvatar';
import MobileBottomNav from './MobileBottomNav';
import MobileRightPanel from './MobileRightPanel';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  rightPanel?: React.ReactNode;
  hasDocuments?: boolean;
}

const DashboardLayout = ({ children, sidebar, rightPanel, hasDocuments = false }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const { user, demoMode } = useAuth();
  const { addNotification } = useNotifications();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shortcuts = [
    {
      key: 'n',
      description: 'New Project',
      action: () => addNotification({
        type: 'info',
        title: 'New Project',
        message: 'Feature coming soon!'
      })
    },
    {
      key: 'u',
      description: 'Upload Files',
      action: () => document.getElementById('enhanced-file-upload')?.click()
    },
    {
      key: 'k',
      description: 'Search',
      action: () => setSearchOpen(true)
    },
    {
      key: ',',
      description: 'Settings',
      action: () => addNotification({
        type: 'info',
        title: 'Settings',
        message: 'Opening settings panel...'
      })
    },
    {
      key: 't',
      description: 'Toggle Theme',
      action: () => {}
    },
    {
      key: 's',
      description: 'Toggle Sidebar',
      action: () => setSidebarOpen(!sidebarOpen)
    }
  ];

  const { showShortcuts, setShowShortcuts } = useKeyboardShortcuts(shortcuts);

  const getUserName = () => {
    if (demoMode) return 'Demo User';
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const handleQuickAction = () => {
    addNotification({
      type: 'info',
      title: 'Quick Action',
      message: 'Upload documents to get started!'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 w-full">
      {/* Enhanced Mobile-First Header */}
      <header className="sticky top-0 z-50 border-b border-gray-800/50 bg-gray-900/90 backdrop-blur-xl">
        <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 lg:px-6">
          {/* Left Section - Mobile Menu & Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-2 h-2 sm:w-4 sm:h-4 bg-white rounded-sm opacity-90"></div>
              </div>
              <div className="hidden sm:block lg:block">
                <h1 className="text-sm sm:text-lg font-semibold text-white">AI Research Hub</h1>
                <p className="text-xs text-gray-400 hidden lg:block">Welcome back, {getUserName()}</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-sm font-semibold text-white">Research Hub</h1>
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* Desktop Search */}
            <div className="hidden lg:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents... (Ctrl+K)"
                className="pl-10 w-48 xl:w-64 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>
            
            {/* Mobile Search Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            
            <ThemeToggle />
            
            <Button variant="ghost" size="sm" className="relative p-2 text-gray-400 hover:text-white">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <Badge className="absolute -top-1 -right-1 h-2 w-2 p-0 bg-red-500"></Badge>
            </Button>
            
            {/* Right Panel Toggle for Mobile/Tablet */}
            {rightPanel && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="xl:hidden p-2 text-gray-400 hover:text-white"
                onClick={() => setRightPanelOpen(!rightPanelOpen)}
              >
                <PanelRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            )}
            
            <UserAvatar />
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {searchOpen && (
          <div className="lg:hidden absolute inset-x-0 top-full bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 p-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
                className="pl-10 pr-10 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-blue-500/20"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(false)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </header>

      <div className="flex h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-full">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && isMobile && (
          <div className="fixed inset-0 z-40">
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-gray-900 border-r border-gray-800 animate-slide-in">
              {sidebar}
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 border-r border-gray-800/50 bg-gray-900/50 backdrop-blur-sm flex-shrink-0">
          {sidebar}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden min-w-0">
          <div className="h-full overflow-y-auto">
            <div className="p-3 sm:p-4 lg:p-6 xl:p-8 pb-20 lg:pb-8">
              {children}
            </div>
          </div>
        </main>

        {/* Desktop Right Panel */}
        {rightPanel && (
          <aside className="hidden xl:block w-80 border-l border-gray-800/50 bg-gray-900/50 backdrop-blur-sm flex-shrink-0">
            {rightPanel}
          </aside>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <MobileBottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onQuickAction={handleQuickAction}
        />
      )}

      {/* Mobile Right Panel */}
      {rightPanel && (
        <MobileRightPanel
          isOpen={rightPanelOpen}
          onClose={() => setRightPanelOpen(false)}
          hasDocuments={hasDocuments}
        />
      )}

      {/* Keyboard Shortcuts Dialog */}
      <KeyboardShortcutsDialog
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
        shortcuts={shortcuts}
      />
    </div>
  );
};

export default DashboardLayout;
