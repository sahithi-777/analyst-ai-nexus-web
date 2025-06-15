
import React from 'react';
import { Lightbulb, TrendingUp, Search, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SmartSuggestionsProps {
  documents: string[];
  recentMessages: any[];
  onSuggestionClick: (suggestion: string) => void;
}

const SmartSuggestions = ({ documents, recentMessages, onSuggestionClick }: SmartSuggestionsProps) => {
  const suggestions = [
    {
      text: "Compare methodologies across documents",
      icon: Search,
      category: "Comparative Analysis"
    },
    {
      text: "Identify trending themes and patterns",
      icon: TrendingUp,
      category: "Trend Analysis"
    },
    {
      text: "Find research gaps and opportunities",
      icon: Lightbulb,
      category: "Research Gaps"
    },
    {
      text: "Analyze author perspectives and biases",
      icon: Brain,
      category: "Critical Analysis"
    }
  ];

  return (
    <div className="space-y-3">
      <h5 className="text-sm font-medium text-gray-300">Smart Suggestions</h5>
      <div className="grid grid-cols-1 gap-2">
        {suggestions.map((suggestion, index) => {
          const IconComponent = suggestion.icon;
          return (
            <Card
              key={index}
              className="bg-gray-700 border-gray-600 hover:bg-gray-600 transition-colors cursor-pointer"
              onClick={() => onSuggestionClick(suggestion.text)}
            >
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  <IconComponent className="h-4 w-4 text-cyan-400" />
                  <div>
                    <p className="text-sm text-white">{suggestion.text}</p>
                    <p className="text-xs text-gray-400">{suggestion.category}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SmartSuggestions;
