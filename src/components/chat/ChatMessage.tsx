
import React from 'react';
import { User, Bot, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  onCopy: (text: string) => void;
}

const ChatMessage = ({ message, onCopy }: ChatMessageProps) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex space-x-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${isUser ? 'order-first' : ''}`}>
        <div className={`
          rounded-lg p-3 ${
            isUser 
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
              : 'bg-gray-700 text-gray-100'
          }
        `}>
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.text}
          </div>
        </div>
        
        <div className={`flex items-center space-x-2 mt-2 text-xs text-gray-400 ${
          isUser ? 'justify-end' : 'justify-start'
        }`}>
          <span>{message.timestamp.toLocaleTimeString()}</span>
          {!isUser && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCopy(message.text)}
                className="h-6 px-2 text-gray-400 hover:text-white"
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Badge variant="outline" className="text-xs border-cyan-400 text-cyan-400">
                Claude AI
              </Badge>
            </>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-gray-300" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
