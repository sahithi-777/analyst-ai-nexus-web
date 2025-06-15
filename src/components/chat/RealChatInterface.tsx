
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Brain, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { RealProcessedFile, RealAiProcessor } from '@/utils/realAiProcessor';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface RealChatInterfaceProps {
  processedFiles: RealProcessedFile[];
  isEmbedded?: boolean;
}

const RealChatInterface = ({ processedFiles, isEmbedded = false }: RealChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const hasDocuments = processedFiles.filter(f => f.status === 'completed').length > 0;

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const validFiles = processedFiles.filter(f => f.status === 'completed');
      const chatHistory = messages.map(msg => ({
        sender: msg.sender,
        text: msg.text
      }));

      const aiResponse = await RealAiProcessor.chatWithDocuments(
        text.trim(),
        validFiles,
        chatHistory
      );

      const aiMessage: Message = {
        id: Date.now().toString() + '-ai',
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      toast({
        title: "Claude Response",
        description: "AI analysis complete",
      });

    } catch (error) {
      console.error('Error in chat:', error);
      toast({
        title: "Chat Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });

      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        text: "I apologize, but I'm having trouble processing your request right now. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <Card className="h-full bg-gray-900 border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-cyan-400" />
            <span className="text-sm">Claude AI Assistant</span>
          </div>
          <div className="text-xs text-gray-400">
            {hasDocuments ? `${processedFiles.filter(f => f.status === 'completed').length} docs loaded` : 'No documents'}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col min-h-0">
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 && !hasDocuments && (
              <div className="text-center py-8">
                <Brain className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Upload documents to start chatting with Claude</p>
              </div>
            )}

            {messages.length === 0 && hasDocuments && (
              <div className="text-center py-8">
                <Brain className="h-12 w-12 text-cyan-400 mx-auto mb-3" />
                <p className="text-white font-medium mb-2">Claude AI Ready</p>
                <p className="text-gray-400 text-sm">Ask me anything about your documents!</p>
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-gray-500">Try asking:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['Summarize key points', 'Find contradictions', 'What are the main themes?'].map((suggestion, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendMessage(suggestion)}
                        className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onCopy={(text) => {
                  navigator.clipboard.writeText(text);
                  toast({ title: "Copied", description: "Message copied to clipboard" });
                }}
              />
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Claude is thinking...</span>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={hasDocuments ? "Ask Claude about your documents..." : "Upload documents first to chat"}
              className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              disabled={!hasDocuments || isTyping}
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || !hasDocuments || isTyping}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {!hasDocuments && (
            <p className="text-xs text-gray-500 mt-2">Upload and process documents to enable Claude AI chat</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealChatInterface;
