
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ElementType;
}

interface MobileBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const MobileBreadcrumb = ({ items, className = '' }: MobileBreadcrumbProps) => {
  if (items.length === 0) return null;

  return (
    <div className={`flex items-center space-x-1 text-sm text-gray-400 overflow-x-auto py-2 px-4 lg:hidden ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="h-3 w-3 text-gray-600 flex-shrink-0" />}
          
          {item.onClick || item.href ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={item.onClick}
              className={`p-1 h-auto min-w-0 text-xs hover:text-white transition-colors ${
                index === items.length - 1 ? 'text-white font-medium' : 'text-gray-400'
              }`}
            >
              <div className="flex items-center space-x-1 truncate">
                {item.icon && <item.icon className="h-3 w-3 flex-shrink-0" />}
                <span className="truncate">{item.label}</span>
              </div>
            </Button>
          ) : (
            <div className={`flex items-center space-x-1 px-1 ${
              index === items.length - 1 ? 'text-white font-medium' : 'text-gray-400'
            }`}>
              {item.icon && <item.icon className="h-3 w-3 flex-shrink-0" />}
              <span className="truncate">{item.label}</span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MobileBreadcrumb;
