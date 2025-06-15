
import React, { useState, useEffect } from 'react';
import { Brain, Search, Lightbulb, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SmartSuggestion {
  id: string;
  type: 'analysis' | 'comparison' | 'hypothesis' | 'gap' | 'followup';
  question: string;
  context: string;
  confidence: number;
  category: string;
}

interface SmartSuggestionsProps {
  documents: string[];
  recentMessages: string[];
  onSuggestionClick: (question: string) => void;
}

const SmartSuggestions = ({ documents, recentMessages, onSuggestionClick }: SmartSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);

  useEffect(() => {
    generateSmartSuggestions();
  }, [documents, recentMessages]);

  const generateSmartSuggestions = () => {
    const baseSuggestions: SmartSuggestion[] = [
      {
        id: '1',
        type: 'analysis',
        question: 'What are the key findings across all documents?',
        context: 'Synthesize main insights from uploaded research',
        confidence: 0.95,
        category: 'Overview'
      },
      {
        id: '2',
        type: 'comparison',
        question: 'How do the methodologies differ between studies?',
        context: 'Compare research approaches and techniques',
        confidence: 0.88,
        category: 'Methodology'
      },
      {
        id: '3',
        type: 'gap',
        question: 'What research gaps can you identify?',
        context: 'Find missing areas for further investigation',
        confidence: 0.82,
        category: 'Research Gaps'
      },
      {
        id: '4',
        type: 'hypothesis',
        question: 'Generate new research hypotheses based on the findings',
        context: 'Create testable hypotheses from current research',
        confidence: 0.79,
        category: 'Innovation'
      },
      {
        id: '5',
        type: 'followup',
        question: 'What follow-up studies would be most valuable?',
        context: 'Recommend next steps for research progression',
        confidence: 0.85,
        category: 'Next Steps'
      }
    ];

    // Add context-aware suggestions based on recent messages
    if (recentMessages.length > 0) {
      const lastMessage = recentMessages[recentMessages.length - 1];
      
      if (lastMessage.includes('contradiction')) {
        baseSuggestions.push({
          id: 'context-1',
          type: 'analysis',
          question: 'How can these contradictions be reconciled?',
          context: 'Address conflicting findings in the research',
          confidence: 0.92,
          category: 'Resolution'
        });
      }
      
      if (lastMessage.includes('method')) {
        baseSuggestions.push({
          id: 'context-2',
          type: 'comparison',
          question: 'Which methodology would be most appropriate for this research?',
          context: 'Evaluate methodological approaches',
          confidence: 0.87,
          category: 'Methodology'
        });
      }
    }

    // Sort by confidence and take top suggestions
    const sortedSuggestions = baseSuggestions
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 6);

    setSuggestions(sortedSuggestions);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'analysis': return Brain;
      case 'comparison': return TrendingUp;
      case 'hypothesis': return Lightbulb;
      case 'gap': return Search;
      case 'followup': return FileText;
      default: return Brain;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'analysis': return 'text-blue-400 bg-blue-500/10';
      case 'comparison': return 'text-purple-400 bg-purple-500/10';
      case 'hypothesis': return 'text-yellow-400 bg-yellow-500/10';
      case 'gap': return 'text-red-400 bg-red-500/10';
      case 'followup': return 'text-green-400 bg-green-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 0.9) return { label: 'High', color: 'text-green-400' };
    if (confidence >= 0.8) return { label: 'Medium', color: 'text-yellow-400' };
    return { label: 'Low', color: 'text-red-400' };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="h-5 w-5 text-cyan-400" />
        <h3 className="text-white font-medium">Smart Research Suggestions</h3>
      </div>

      <div className="grid gap-3">
        {suggestions.map((suggestion) => {
          const IconComponent = getTypeIcon(suggestion.type);
          const confidenceLevel = getConfidenceLevel(suggestion.confidence);
          
          return (
            <Card
              key={suggestion.id}
              className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer group"
              onClick={() => onSuggestionClick(suggestion.question)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(suggestion.type)}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant="outline" className="text-xs text-gray-300 border-gray-600">
                        {suggestion.category}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${confidenceLevel.color} border-gray-600`}>
                        {confidenceLevel.label}
                      </Badge>
                    </div>
                    
                    <h4 className="text-sm font-medium text-white mb-1 group-hover:text-cyan-400 transition-colors">
                      {suggestion.question}
                    </h4>
                    
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {suggestion.context}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center pt-4 border-t border-gray-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={generateSmartSuggestions}
          className="text-gray-400 hover:text-white"
        >
          <Brain className="h-4 w-4 mr-2" />
          Generate New Suggestions
        </Button>
      </div>
    </div>
  );
};

export default SmartSuggestions;
