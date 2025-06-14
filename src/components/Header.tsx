
import React from 'react';
import { Menu, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserAvatar from './UserAvatar';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const { user, demoMode } = useAuth();
  const { profile } = useProfile();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getUserName = () => {
    if (demoMode) return 'Demo User';
    if (profile?.full_name) {
      return profile.full_name.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="text-gray-400 hover:text-white hover:bg-gray-800 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">AI Research Analyst</h1>
              <p className="text-sm text-gray-400 hidden sm:block">
                {getGreeting()}, {getUserName()}
              </p>
            </div>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Dashboard</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Analytics</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Reports</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Settings</a>
        </nav>

        <div className="flex items-center space-x-3">
          <UserAvatar />
        </div>
      </div>
    </header>
  );
};

export default Header;
