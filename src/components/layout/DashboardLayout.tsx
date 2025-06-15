
import React, { useState, useEffect, useRef } from 'react';
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
import MobileBreadcrumb from '../ui/mobile-breadcrumb';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  rightPanel?: React.ReactNode;
  hasDocuments?: boolean;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ElementType;
  }>;
}

const DashboardLayout = ({ children, sidebar, rightPanel, hasDocuments = false, breadcrumbs = [] }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, demoMode } = useAuth();
  const { addNotification } = useNotifications();
  
  // Focus management refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const skipLinkRef = useRef<HTMLAnchorElement>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulate loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Focus management for search
  useEffect(() => {
    if (searchOpen && mobileSearchRef.current) {
      mobileSearchRef.current.focus();
    }
  }, [searchOpen]);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip link navigation
      if (event.key === 'Tab' && !event.shiftKey && event.target === document.body) {
        skipLinkRef.current?.focus();
      }

      // Escape key handlers
      if (event.key === 'Escape') {
        if (searchOpen) {
          setSearchOpen(false);
        } else if (sidebarOpen && isMobile) {
          setSidebarOpen(false);
        } else if (rightPanelOpen) {
          setRightPanelOpen(false);
        }
      }

      // Command/Ctrl + K for search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }

      // Arrow key navigation for mobile tabs
      if (isMobile && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        const navItems = ['dashboard', 'documents', 'analytics', 'settings'];
        const currentIndex = navItems.indexOf(activeTab);
        
        if (event.key === 'ArrowLeft' && currentIndex > 0) {
          setActiveTab(navItems[currentIndex - 1]);
        } else if (event.key === 'ArrowRight' && currentIndex < navItems.length - 1) {
          setActiveTab(navItems[currentIndex + 1]);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, sidebarOpen, rightPanelOpen, isMobile, activeTab]);

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
      action: () => {
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
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

  const handleQuickAction = (action: string) => {
    console.log(`Navigation action: ${action}`);
    
    // Handle navigation actions
    switch (action) {
      case 'dashboard':
        setActiveTab('dashboard');
        addNotification({
          type: 'info',
          title: 'Dashboard',
          message: 'Navigating to dashboard'
        });
        break;
      case 'documents':
        setActiveTab('documents');
        addNotification({
          type: 'info',
          title: 'Documents',
          message: 'Viewing documents section'
        });
        break;
      case 'analytics':
        setActiveTab('analytics');
        addNotification({
          type: 'info',
          title: 'Analytics',
          message: 'Opening analytics view'
        });
        break;
      case 'settings':
        setActiveTab('settings');
        addNotification({
          type: 'info',
          title: 'Settings',
          message: 'Opening settings panel'
        });
        break;
      default:
        addNotification({
          type: 'info',
          title: 'Navigation',
          message: `Action: ${action}`
        });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 w-full">
      {/* Skip to main content link for accessibility */}
      <a
        ref={skipLinkRef}
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      {/* Enhanced Mobile-First Header */}
      <header className="sticky top-0 z-50 border-b border-gray-800/50 bg-gray-900/95 backdrop-blur-xl">
        <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left Section - Mobile Menu & Logo */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200 lg:hidden touch-manipulation"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-sm opacity-90"></div>
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
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
            {/* Desktop Search */}
            <div className="hidden lg:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                ref={searchInputRef}
                placeholder="Search documents... (⌘K)"
                className="pl-10 w-48 xl:w-64 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>
            
            {/* Mobile Search Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden p-2 text-gray-400 hover:text-white touch-manipulation"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            
            <ThemeToggle />
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative p-2 text-gray-400 hover:text-white touch-manipulation"
              aria-label="Notifications"
              onClick={() => addNotification({
                type: 'info',
                title: 'Notifications',
                message: 'No new notifications'
              })}
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <Badge className="absolute -top-1 -right-1 h-2 w-2 p-0 bg-red-500"></Badge>
            </Button>
            
            {/* Right Panel Toggle for Mobile/Tablet */}
            {rightPanel && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="xl:hidden p-2 text-gray-400 hover:text-white touch-manipulation"
                onClick={() => setRightPanelOpen(!rightPanelOpen)}
                aria-label="Toggle insights panel"
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
                ref={mobileSearchRef}
                placeholder="Search documents..."
                className="pl-10 pr-10 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-blue-500/20 touch-manipulation"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(false)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white touch-manipulation"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Mobile Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <MobileBreadcrumb items={breadcrumbs} />
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
        <main id="main-content" className="flex-1 overflow-hidden min-w-0" role="main">
          <div className="h-full overflow-y-auto overscroll-behavior-contain">
            <div className="p-4 sm:p-6 lg:p-8 xl:p-10 pb-20 lg:pb-8 space-y-4 sm:space-y-6">
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
