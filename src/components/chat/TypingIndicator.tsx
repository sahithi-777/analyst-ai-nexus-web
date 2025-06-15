
import React from 'react';
import { Bot } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-2">
        {/* AI Avatar */}
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center text-xs">
          <Bot className="h-3 w-3" />
        </div>

        {/* Typing Bubble */}
        <div className="bg-gray-700 rounded-lg px-3 py-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
