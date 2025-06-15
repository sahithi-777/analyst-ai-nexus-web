
import React from 'react';
import { MessageSquare, Sparkles, Brain, Search, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SmartSuggestions from './SmartSuggestions';

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

const SuggestedQuestions = ({ questions, onQuestionClick }: SuggestedQuestionsProps) => {
  const enhancedQuestions = [
    { text: "What are the main themes across documents?", icon: Search, category: "Analysis" },
    { text: "Find contradictions in the research", icon: MessageSquare, category: "Critical Review" },
    { text: "What gaps need more investigation?", icon: Lightbulb, category: "Research Gaps" },
    { text: "Generate follow-up research questions", icon: Brain, category: "Innovation" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="text-center py-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-white font-medium mb-2">Ready to analyze your documents!</h3>
        <p className="text-gray-400 text-sm">Choose from smart suggestions or ask your own questions:</p>
      </div>

      {/* Enhanced Suggested Questions */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Quick Start Questions</h4>
        {enhancedQuestions.map((question, index) => {
          const IconComponent = question.icon;
          return (
            <Card
              key={index}
              className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer group"
              onClick={() => onQuestionClick(question.text)}
            >
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <IconComponent className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white group-hover:text-cyan-400 transition-colors">
                      {question.text}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{question.category}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Smart Suggestions */}
      <div className="border-t border-gray-700 pt-4">
        <SmartSuggestions
          documents={['Research_Methods_2024.pdf', 'Analysis_Framework.docx']}
          recentMessages={[]}
          onSuggestionClick={onQuestionClick}
        />
      </div>

      {/* Hint */}
      <div className="text-center border-t border-gray-700 pt-4">
        <p className="text-xs text-gray-500">
          💡 The AI will provide citations and can analyze document relationships
        </p>
      </div>
    </div>
  );
};

export default SuggestedQuestions;
