
import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

const SuggestedQuestions = ({ questions, onQuestionClick }: SuggestedQuestionsProps) => {
  return (
    <div className="space-y-4">
      {/* Welcome Message */}
      <div className="text-center py-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-white font-medium mb-2">Ready to analyze your documents!</h3>
        <p className="text-gray-400 text-sm">Here are some questions to get started:</p>
      </div>

      {/* Suggested Questions */}
      <div className="space-y-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full text-left justify-start border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-blue-500 transition-all"
            onClick={() => onQuestionClick(question)}
          >
            <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{question}</span>
          </Button>
        ))}
      </div>

      {/* Hint */}
      <div className="text-center">
        <p className="text-xs text-gray-500">Or type your own question below</p>
      </div>
    </div>
  );
};

export default SuggestedQuestions;
