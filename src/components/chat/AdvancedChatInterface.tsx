
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bookmark, Download, Brain, Search, FileText, Lightbulb, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNotifications } from '@/components/ui/notification';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  citations?: Citation[];
  thread?: string;
  bookmarked?: boolean;
}

interface Citation {
  document: string;
  page?: number;
  text: string;
}

interface ResearchSuggestion {
  type: 'question' | 'gap' | 'hypothesis' | 'source';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface AdvancedChatInterfaceProps {
  hasDocuments: boolean;
  documents?: string[];
}

const AdvancedChatInterface = ({ hasDocuments, documents = [] }: AdvancedChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeThread, setActiveThread] = useState<string>('main');
  const [bookmarkedMessages, setBookmarkedMessages] = useState<Message[]>([]);
  const [researchSuggestions, setResearchSuggestions] = useState<ResearchSuggestion[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { addNotification } = useNotifications();

  // Initialize research suggestions based on document content
  useEffect(() => {
    if (hasDocuments) {
      setResearchSuggestions([
        {
          type: 'question',
          title: 'What are the methodological approaches?',
          description: 'Analyze research methodologies across documents',
          priority: 'high'
        },
        {
          type: 'gap',
          title: 'Missing demographic data',
          description: 'Limited representation in age groups 18-25',
          priority: 'medium'
        },
        {
          type: 'hypothesis',
          title: 'Technology adoption correlation',
          description: 'Hypothesis: Tech adoption relates to education level',
          priority: 'high'
        },
        {
          type: 'source',
          title: 'Additional peer-reviewed sources',
          description: 'Recommend 3-5 recent publications on this topic',
          priority: 'low'
        }
      ]);
    }
  }, [hasDocuments]);

  const simulateAdvancedAIResponse = async (question: string): Promise<Message> => {
    setIsTyping(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Advanced responses with citations and context awareness
      const advancedResponses: { [key: string]: { text: string; citations: Citation[] } } = {
        "What are the methodological approaches?": {
          text: "Based on my analysis of your documents, I've identified three primary methodological approaches:\n\n1. **Quantitative Analysis** - Statistical modeling and regression analysis (found in 4 documents)\n2. **Qualitative Research** - Interview-based insights and thematic analysis (found in 3 documents)\n3. **Mixed Methods** - Combining both approaches for comprehensive understanding (found in 2 documents)\n\nThe most effective approach appears to be the mixed methods strategy, which provides both statistical significance and contextual depth.",
          citations: [
            { document: "Research_Methods_2024.pdf", page: 15, text: "Mixed methods provide comprehensive insights..." },
            { document: "Analysis_Framework.docx", page: 3, text: "Statistical modeling shows significant correlation..." }
          ]
        },
        "Find contradictions in the research": {
          text: "I've identified several contradictions that require attention:\n\n**Major Contradiction:**\n- Document A (p.12) suggests implementation should be gradual over 18 months\n- Document C (p.8) recommends rapid deployment within 6 months\n\n**Methodological Differences:**\n- Study X uses sample size of 1,000 participants\n- Study Y claims validity with only 150 participants\n\n**Timeline Discrepancies:**\n- Project timeline varies between 12-24 months across different documents\n\nI recommend conducting a reconciliation meeting to address these inconsistencies.",
          citations: [
            { document: "Implementation_Plan.pdf", page: 12, text: "Gradual rollout over 18 months..." },
            { document: "Quick_Deploy_Strategy.pdf", page: 8, text: "Rapid deployment within 6 months..." }
          ]
        }
      };

      const defaultResponse = {
        text: `I've analyzed your question in the context of your uploaded documents. Based on the ${documents.length} documents you've provided, I can offer insights on this topic. Could you be more specific about which aspect you'd like me to focus on?`,
        citations: []
      };

      const response = advancedResponses[question] || defaultResponse;

      return {
        id: Date.now().toString() + '-ai',
        text: response.text,
        sender: 'ai',
        timestamp: new Date(),
        citations: response.citations,
        thread: activeThread
      };

    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      thread: activeThread
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    const aiResponse = await simulateAdvancedAIResponse(text.trim());
    setMessages(prev => [...prev, aiResponse]);

    addNotification({
      type: 'success',
      title: 'AI Analysis Complete',
      message: 'Response generated with citations'
    });
  };

  const toggleBookmark = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, bookmarked: !msg.bookmarked }
        : msg
    ));

    const message = messages.find(m => m.id === messageId);
    if (message && !message.bookmarked) {
      setBookmarkedMessages(prev => [...prev, { ...message, bookmarked: true }]);
      addNotification({
        type: 'success',
        title: 'Bookmarked',
        message: 'Insight saved to bookmarks'
      });
    }
  };

  const exportChatAsReport = () => {
    const chatContent = messages
      .filter(m => m.thread === activeThread)
      .map(m => `[${m.timestamp.toLocaleString()}] ${m.sender.toUpperCase()}: ${m.text}`)
      .join('\n\n');

    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `research-chat-${activeThread}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();

    addNotification({
      type: 'success',
      title: 'Chat Exported',
      message: 'Research notes saved successfully'
    });
  };

  const handleSuggestionClick = (suggestion: ResearchSuggestion) => {
    if (suggestion.type === 'question') {
      handleSendMessage(suggestion.title);
    } else if (suggestion.type === 'gap') {
      handleSendMessage(`Analyze the research gap: ${suggestion.description}`);
    } else if (suggestion.type === 'hypothesis') {
      handleSendMessage(`Evaluate this hypothesis: ${suggestion.description}`);
    } else if (suggestion.type === 'source') {
      handleSendMessage(`Suggest additional sources for: ${suggestion.description}`);
    }
  };

  const createNewThread = () => {
    const threadId = `thread-${Date.now()}`;
    setActiveThread(threadId);
    addNotification({
      type: 'info',
      title: 'New Thread',
      message: 'Started new conversation thread'
    });
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'question': return Search;
      case 'gap': return FileText;
      case 'hypothesis': return Lightbulb;
      case 'source': return Brain;
      default: return MessageSquare;
    }
  };

  const getSuggestionColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-400 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const currentThreadMessages = messages.filter(m => m.thread === activeThread);

  return (
    <Card className="h-full bg-gray-900 border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-cyan-400" />
            <span className="text-sm">Advanced Research Assistant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={createNewThread}
              className="text-gray-400 hover:text-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={exportChatAsReport}
              className="text-gray-400 hover:text-white"
              disabled={currentThreadMessages.length === 0}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col min-h-0">
        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-b border-gray-700">
            <TabsTrigger value="chat" className="text-gray-300 data-[state=active]:text-white">
              Chat
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="text-gray-300 data-[state=active]:text-white">
              Suggestions
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="text-gray-300 data-[state=active]:text-white">
              Bookmarks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col min-h-0 mt-0">
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              <div className="space-y-4">
                {currentThreadMessages.length === 0 && !hasDocuments && (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">Upload documents to start advanced research</p>
                  </div>
                )}

                {currentThreadMessages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <ChatMessage
                        message={message}
                        onCopy={(text) => navigator.clipboard.writeText(text)}
                      />
                      {message.sender === 'ai' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBookmark(message.id)}
                          className={`ml-2 ${message.bookmarked ? 'text-yellow-400' : 'text-gray-400'}`}
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    {message.citations && message.citations.length > 0 && (
                      <div className="ml-8 space-y-1">
                        <p className="text-xs text-gray-400">Citations:</p>
                        {message.citations.map((citation, idx) => (
                          <div key={idx} className="bg-gray-800 p-2 rounded text-xs text-gray-300">
                            <div className="font-medium">{citation.document}</div>
                            {citation.page && <div className="text-gray-400">Page {citation.page}</div>}
                            <div className="italic">"{citation.text}"</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && <TypingIndicator />}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(inputValue);
                    }
                  }}
                  placeholder="Ask detailed questions about your research..."
                  className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  disabled={!hasDocuments}
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || !hasDocuments}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="flex-1 p-4">
            <div className="space-y-4">
              <h3 className="text-white font-medium">Smart Research Suggestions</h3>
              {researchSuggestions.map((suggestion, idx) => {
                const IconComponent = getSuggestionIcon(suggestion.type);
                return (
                  <Card
                    key={idx}
                    className={`bg-gray-800 border cursor-pointer hover:bg-gray-700 transition-colors ${getSuggestionColor(suggestion.priority)}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <IconComponent className="h-5 w-5 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-medium text-white">{suggestion.title}</h4>
                            <Badge variant="outline" className={`text-xs ${getSuggestionColor(suggestion.priority)}`}>
                              {suggestion.priority}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-400">{suggestion.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="bookmarks" className="flex-1 p-4">
            <div className="space-y-4">
              <h3 className="text-white font-medium">Bookmarked Insights</h3>
              {bookmarkedMessages.length === 0 ? (
                <div className="text-center py-8">
                  <Bookmark className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No bookmarked insights yet</p>
                </div>
              ) : (
                bookmarkedMessages.map((message) => (
                  <Card key={message.id} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-300">{message.text}</div>
                      <div className="text-xs text-gray-500 mt-2">
                        {message.timestamp.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedChatInterface;
