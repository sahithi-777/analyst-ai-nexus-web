
import React from 'react';
import { User, Settings, LogOut, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

interface UserProfileDropdownProps {
  onNavigateToProfile: () => void;
}

const UserProfileDropdown = ({ onNavigateToProfile }: UserProfileDropdownProps) => {
  const { user, demoMode, setDemoMode, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const toggleDemoMode = () => {
    setDemoMode(!demoMode);
  };

  const userEmail = user?.email || 'Demo User';
  const displayName = user?.user_metadata?.full_name || userEmail;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium text-white">{displayName}</p>
            <p className="w-[200px] truncate text-sm text-gray-400">
              {userEmail}
            </p>
            {demoMode && (
              <p className="text-xs text-yellow-400">Demo Mode</p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem 
          onClick={onNavigateToProfile}
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Profile Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={toggleDemoMode}
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <TestTube className="mr-2 h-4 w-4" />
          <span>{demoMode ? 'Exit Demo' : 'Demo Mode'}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
