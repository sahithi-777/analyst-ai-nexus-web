
import React, { useState, useEffect } from 'react';
import { Lightbulb, Play, RefreshCw, Loader2, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { RealProcessedFile } from '@/utils/realAiProcessor';
import { supabase } from '@/integrations/supabase/client';
import { executeChatQuestion } from '@/utils/chatHelpers';
import { useAuth } from '@/contexts/AuthContext';

interface ResearchQuestion {
  id: string;
  question: string;
  type: 'analytical' | 'comparative' | 'exploratory';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'methodology' | 'theory' | 'application' | 'evaluation';
  rationale: string;
  estimatedTime: string;
  sourceDocuments: string[];
  templates: string[];
}

interface IntelligentQuestionGeneratorProps {
  processedFiles: RealProcessedFile[];
  onQuestionExecute?: (question: string) => void;
  onQuestionsGenerated?: (questions: ResearchQuestion[]) => void;
}

const IntelligentQuestionGenerator = ({ 
  processedFiles, 
  onQuestionExecute,
  onQuestionsGenerated 
}: IntelligentQuestionGeneratorProps) => {
  const [questions, setQuestions] = useState<ResearchQuestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const { toast } = useToast();
  const { demoMode } = useAuth();

  const hasValidFiles = processedFiles?.filter(f => f.status === 'completed').length > 0;

  // Load demo questions in demo mode
  useEffect(() => {
    if (demoMode) {
      const loadDemoQuestions = async () => {
        const { getDemoQuestions } = await import('@/utils/demoData');
        const demoQuestions = getDemoQuestions();
        setQuestions(demoQuestions);
        onQuestionsGenerated?.(demoQuestions);
      };
      
      loadDemoQuestions();
    }
  }, [demoMode, onQuestionsGenerated]);

  const generateQuestions = async (includeUrl = false) => {
    if (!hasValidFiles && !includeUrl && !demoMode) {
      toast({
        title: "No Documents",
        description: "Upload and process documents first to generate research questions.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const validFiles = processedFiles?.filter(f => f.status === 'completed') || [];
      
      // In demo mode, return demo questions
      if (demoMode) {
        const { getDemoQuestions } = await import('@/utils/demoData');
        const demoQuestions = getDemoQuestions();
        setQuestions(demoQuestions);
        onQuestionsGenerated?.(demoQuestions);
        
        toast({
          title: "Demo Questions Generated",
          description: `Generated ${demoQuestions.length} sample research questions for demonstration.`,
        });
        return;
      }
      
      const { data, error } = await supabase.functions.invoke('generate-research-questions', {
        body: {
          files: validFiles,
          url: includeUrl ? urlInput : null
        }
      });

      if (error) {
        console.error('Error generating questions:', error);
        
        // Fallback to demo questions on error
        const { getDemoQuestions } = await import('@/utils/demoData');
        const fallbackQuestions = getDemoQuestions();
        setQuestions(fallbackQuestions);
        onQuestionsGenerated?.(fallbackQuestions);
        
        toast({
          title: "Using Demo Questions",
          description: "API unavailable. Showing sample questions for demonstration.",
        });
        return;
      }

      const generatedQuestions = data?.questions || [];
      setQuestions(generatedQuestions);
      onQuestionsGenerated?.(generatedQuestions);

      toast({
        title: "Questions Generated",
        description: `Claude generated ${generatedQuestions.length} intelligent research questions based on your documents.`,
      });

    } catch (error) {
      console.error('Error generating questions:', error);
      
      // Fallback to demo questions on error
      const { getDemoQuestions } = await import('@/utils/demoData');
      const fallbackQuestions = getDemoQuestions();
      setQuestions(fallbackQuestions);
      onQuestionsGenerated?.(fallbackQuestions);
      
      toast({
        title: "Using Demo Questions",
        description: "Unable to connect to AI service. Showing sample questions.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const executeQuestion = async (question: string) => {
    onQuestionExecute?.(question);
    
    // Also get immediate response and show it
    try {
      const response = await executeChatQuestion(question, processedFiles || []);
      toast({
        title: "Claude Response Ready",
        description: "Check the chat interface for the analysis",
      });
    } catch (error) {
      toast({
        title: "Question Sent",
        description: "Sending question to Claude for analysis...",
      });
    }
  };

  const exportQuestions = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      totalQuestions: questions.length,
      sourceDocuments: processedFiles?.map(f => f.name) || [],
      questions: questions.map(q => ({
        question: q.question,
        type: q.type,
        difficulty: q.difficulty,
        category: q.category,
        rationale: q.rationale,
        estimatedTime: q.estimatedTime,
        sourceDocuments: q.sourceDocuments || []
      }))
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `research-questions-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Questions Exported",
      description: "Research questions have been downloaded.",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'analytical': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'comparative': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'exploratory': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-3 text-yellow-400" />
              <div>
                <h3 className="text-lg font-semibold">AI Research Question Generator</h3>
                <p className="text-sm text-gray-400 font-normal mt-1">
                  Generate intelligent research questions from your documents using Claude AI
                  {demoMode && <span className="text-yellow-400"> (Demo Mode)</span>}
                </p>
              </div>
            </div>
            
            {questions.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={exportQuestions}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {!demoMode && (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Optional: Add URL for additional context"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="bg-gray-900 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <Button
                onClick={() => generateQuestions(false)}
                disabled={!hasValidFiles || isGenerating}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                Generate Questions
              </Button>
              {urlInput && (
                <Button
                  onClick={() => generateQuestions(true)}
                  disabled={isGenerating}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Include URL
                </Button>
              )}
            </div>
          )}

          {!hasValidFiles && !demoMode && (
            <div className="text-center py-6 bg-gray-900 rounded-lg border border-gray-600">
              <Lightbulb className="h-10 w-10 text-gray-600 mx-auto mb-3" />
              <h4 className="text-white font-medium mb-2">Ready to Generate Questions</h4>
              <p className="text-gray-400 text-sm">Upload and process documents to generate intelligent research questions</p>
            </div>
          )}
        </CardContent>
      </Card>

      {questions.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Generated Research Questions ({questions.length})</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => generateQuestions(false)}
                disabled={isGenerating}
                className="text-gray-400 hover:text-white"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-white font-medium text-sm leading-relaxed flex-1 mr-3">
                      {question.question}
                    </h4>
                    <Button
                      size="sm"
                      onClick={() => executeQuestion(question.question)}
                      className="bg-blue-500 hover:bg-blue-600 text-white flex-shrink-0"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Ask Claude
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={getDifficultyColor(question.difficulty)}>
                      {question.difficulty}
                    </Badge>
                    <Badge className={getTypeColor(question.type)}>
                      {question.type}
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {question.category}
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      ⏱️ {question.estimatedTime}
                    </Badge>
                  </div>

                  <p className="text-gray-400 text-xs mb-2">{question.rationale}</p>
                  
                  {question.sourceDocuments && question.sourceDocuments.length > 0 && (
                    <div className="text-xs text-gray-500">
                      Sources: {question.sourceDocuments.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IntelligentQuestionGenerator;
