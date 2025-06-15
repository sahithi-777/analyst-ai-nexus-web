
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Minimize2, Maximize2, Send, MoreVertical, Copy, Trash2, PaperPlane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ChatMessage from './chat/ChatMessage';
import TypingIndicator from './chat/TypingIndicator';
import SuggestedQuestions from './chat/SuggestedQuestions';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatInterfaceProps {
  hasDocuments: boolean;
}

const ChatInterface = ({ hasDocuments }: ChatInterfaceProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedQuestions = [
    "What are the main themes across documents?",
    "Find contradictions in the research",
    "What gaps need more investigation?",
    "Generate follow-up research questions"
  ];

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

  const simulateAIResponse = async (question: string) => {
    setIsTyping(true);
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    const responses = {
      "What are the main themes across documents?": "Based on your uploaded documents, I've identified several key themes: data analysis methodologies, user experience patterns, and technological frameworks. The documents show a strong focus on evidence-based decision making and iterative improvement processes.",
      "Find contradictions in the research": "I've found a few contradictions in your research materials. Document A suggests Method X is most effective, while Document C argues for Method Y. Additionally, there are conflicting timeline estimates between the project reports.",
      "What gaps need more investigation?": "Several areas require deeper investigation: the long-term impact assessment is incomplete, user feedback from mobile platforms is missing, and the comparative analysis with competitor solutions needs expansion.",
      "Generate follow-up research questions": "Here are some follow-up research questions: 1) How do the findings scale across different user demographics? 2) What are the cost implications of implementing these recommendations? 3) How might emerging technologies affect these conclusions?"
    };

    const response = responses[question] || "I understand your question about the documents. Based on the research materials you've uploaded, I can provide insights and analysis. Could you be more specific about what aspect you'd like me to focus on?";

    setIsTyping(false);
    
    const aiMessage: Message = {
      id: Date.now().toString() + '-ai',
      text: response,
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    await simulateAIResponse(text.trim());
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const clearChatHistory = () => {
    setMessages([]);
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed bottom-0 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="bg-gray-900 border border-gray-700 rounded-t-lg shadow-2xl">
          {/* Chat Header */}
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Research Assistant</h3>
                  <p className="text-xs text-gray-400">Ask me anything about your documents</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                    <DropdownMenuItem 
                      onClick={clearChatHistory}
                      className="text-gray-300 hover:bg-gray-700"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Chat History
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  {isOpen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="h-96 flex flex-col">
              {/* Messages Area */}
              <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.length === 0 && !hasDocuments && (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm">Upload documents to start asking questions</p>
                    </div>
                  )}
                  
                  {messages.length === 0 && hasDocuments && (
                    <SuggestedQuestions 
                      questions={suggestedQuestions}
                      onQuestionClick={handleSuggestedQuestion}
                    />
                  )}

                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      onCopy={copyMessage}
                    />
                  ))}

                  {isTyping && <TypingIndicator />}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask questions about your research..."
                    className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    disabled={!hasDocuments}
                  />
                  <Button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim() || !hasDocuments || isTyping}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                  >
                    <PaperPlane className="h-4 w-4" />
                  </Button>
                </div>
                {!hasDocuments && (
                  <p className="text-xs text-gray-500 mt-2">Upload documents first to enable chat</p>
                )}
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default ChatInterface;
