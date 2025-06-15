
import React from 'react';
import { Copy, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}>
      <div className={`max-w-[85%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div className={`flex items-start space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
          {/* Avatar */}
          <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            isUser 
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
              : 'bg-gray-700 text-gray-300'
          }`}>
            {isUser ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
          </div>

          {/* Message Bubble */}
          <div className={`rounded-lg px-3 py-2 ${
            isUser 
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
              : 'bg-gray-700 text-gray-100'
          }`}>
            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
          </div>
        </div>

        {/* Message Footer */}
        <div className={`flex items-center mt-1 space-x-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
          {!isUser && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCopy(message.text)}
              className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 text-gray-500 hover:text-gray-300"
            >
              <Copy className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
