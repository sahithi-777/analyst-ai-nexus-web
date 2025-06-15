
import React from 'react';
import { User, Settings, LogOut, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface UserProfileDropdownProps {
  onNavigateToProfile?: () => void;
}

const UserProfileDropdown = ({ onNavigateToProfile }: UserProfileDropdownProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (onNavigateToProfile) {
      onNavigateToProfile();
    } else {
      navigate('/profile');
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleHelp = () => {
    toast({
      title: "Help Center",
      description: "Opening help documentation...",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              JD
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium text-white">John Doe</p>
            <p className="w-[200px] truncate text-sm text-gray-400">
              john.doe@example.com
            </p>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem 
          onClick={handleProfileClick}
          className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700 cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleProfileClick}
          className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700 cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleHelp}
          className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700 cursor-pointer"
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
