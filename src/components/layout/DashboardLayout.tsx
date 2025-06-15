
import React, { useState } from 'react';
import { Menu, Bell, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useKeyboardShortcuts, KeyboardShortcutsDialog } from '@/components/ui/keyboard-shortcuts';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useNotifications } from '@/components/ui/notification';
import UserAvatar from '../UserAvatar';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  rightPanel?: React.ReactNode;
}

const DashboardLayout = ({ children, sidebar, rightPanel }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const { user, demoMode } = useAuth();
  const { addNotification } = useNotifications();

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
      action: () => (document.querySelector('input[placeholder*="Search"]') as HTMLInputElement)?.focus()
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
      action: () => {} // Theme toggle is handled by the ThemeToggle component
    },
    {
      key: 's',
      description: 'Toggle Sidebar',
      action: () => setSidebarCollapsed(!sidebarCollapsed)
    }
  ];

  const { showShortcuts, setShowShortcuts } = useKeyboardShortcuts(shortcuts);

  const getUserName = () => {
    if (demoMode) return 'Demo User';
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 border-b border-gray-800/50 bg-gray-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-gray-900/60">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 bg-white rounded-sm opacity-90"></div>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">AI Research Hub</h1>
                <p className="text-xs text-gray-400 hidden sm:block">Welcome back, {getUserName()}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents... (Ctrl+K)"
                className="pl-10 w-64 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>
            
            <ThemeToggle />
            
            <Button variant="ghost" size="sm" className="relative text-gray-400 hover:text-white">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-2 w-2 p-0 bg-red-500"></Badge>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white xl:hidden"
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
            >
              <Settings className="h-5 w-5" />
            </Button>
            
            <UserAvatar />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Responsive Sidebar */}
        <aside className={`
          ${sidebarCollapsed ? 'w-16' : 'w-80'} 
          transition-all duration-300 ease-in-out
          border-r border-gray-800/50 bg-gray-900/50 backdrop-blur-sm
          hidden md:block
        `}>
          {sidebar}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="max-w-none p-6">
              {children}
            </div>
          </div>
        </main>

        {/* Right Panel - Slide-out overlay on medium screens */}
        {rightPanel && (
          <>
            {/* Mobile/Tablet Overlay */}
            <div className={`
              xl:hidden fixed inset-0 z-40 
              ${rightPanelOpen ? 'block' : 'hidden'}
            `}>
              <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setRightPanelOpen(false)}
              />
              <div className="absolute right-0 top-0 h-full w-80 bg-gray-900 border-l border-gray-800">
                {rightPanel}
              </div>
            </div>

            {/* Desktop Right Panel */}
            <aside className="w-80 border-l border-gray-800/50 bg-gray-900/50 backdrop-blur-sm hidden xl:block">
              {rightPanel}
            </aside>
          </>
        )}
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className={`
        md:hidden fixed inset-0 z-40 
        ${!sidebarCollapsed ? 'block' : 'hidden'}
      `}>
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarCollapsed(true)}
        />
        <div className="absolute left-0 top-0 h-full w-80 bg-gray-900 border-r border-gray-800">
          {sidebar}
        </div>
      </div>

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
