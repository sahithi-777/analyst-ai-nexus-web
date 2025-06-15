
import React, { useState } from 'react';
import { X, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RightPanel from '../RightPanel';

interface MobileRightPanelProps {
  isOpen: boolean;
  onClose: () => void;
  hasDocuments: boolean;
}

const MobileRightPanel = ({ isOpen, onClose, hasDocuments }: MobileRightPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="xl:hidden fixed inset-0 z-40">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Slide-up panel */}
      <div className={`
        absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 
        transition-all duration-300 ease-out
        ${isExpanded ? 'h-[85vh]' : 'h-[60vh]'}
        rounded-t-2xl shadow-xl
      `}>
        {/* Handle */}
        <div className="flex items-center justify-center py-3 border-b border-gray-800/50">
          <div className="w-12 h-1 bg-gray-600 rounded-full" />
        </div>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
          <h3 className="text-lg font-semibold text-white">Insights & Chat</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white p-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <RightPanel hasDocuments={hasDocuments} />
        </div>
      </div>
    </div>
  );
};

export default MobileRightPanel;
