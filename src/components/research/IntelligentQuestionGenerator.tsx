
import React, { useState, useEffect } from 'react';
import { Brain, Lightbulb, Search, Clock, Target, Link, FileText, Plus, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { RealProcessedFile } from '@/utils/realAiProcessor';
import { QuestionGeneratorService, GeneratedQuestion, QuestionFilters } from '@/utils/questionGeneratorService';

interface IntelligentQuestionGeneratorProps {
  processedFiles: RealProcessedFile[];
  onQuestionExecute?: (question: string) => void;
}

const IntelligentQuestionGenerator = ({ processedFiles, onQuestionExecute }: IntelligentQuestionGeneratorProps) => {
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [generationProgress, setGenerationProgress] = useState(0);
  const { toast } = useToast();

  const hasValidFiles = processedFiles.filter(f => f.status === 'completed').length > 0;

  const generateQuestions = async (includeUrl: boolean = false) => {
    if (!hasValidFiles && !includeUrl) {
      toast({
        title: "No Content Available",
        description: "Please upload documents or provide a URL to generate questions.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      setGenerationProgress(20);
      
      const validFiles = processedFiles.filter(f => f.status === 'completed');
      const url = includeUrl ? urlInput : undefined;
      
      setGenerationProgress(60);
      
      const questions = await QuestionGeneratorService.generateQuestions(validFiles, url);
      
      setGenerationProgress(90);
      setGeneratedQuestions(questions);
      setGenerationProgress(100);

      toast({
        title: "Questions Generated",
        description: `Generated ${questions.length} intelligent research questions`,
      });

    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate questions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
      setTimeout(() => setGenerationProgress(0), 2000);
    }
  };

  const filterQuestions = (): GeneratedQuestion[] => {
    return generatedQuestions.filter(q => {
      const typeMatch = selectedQuestionType === 'all' || q.type === selectedQuestionType;
      const difficultyMatch = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
      const categoryMatch = selectedCategory === 'all' || q.category === selectedCategory;
      return typeMatch && difficultyMatch && categoryMatch;
    });
  };

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'analytical': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'comparative': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'exploratory': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'advanced': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getQuestionIcon = (type: string) => {
    switch (type) {
      case 'analytical': return Search;
      case 'comparative': return Target;
      case 'exploratory': return Lightbulb;
      default: return Brain;
    }
  };

  const filteredQuestions = filterQuestions();

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-5 w-5 mr-3 text-cyan-400" />
            Intelligent Question Generator
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* URL Input */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Additional URL (optional)</label>
            <div className="flex space-x-2">
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/research-article"
                className="flex-1 bg-gray-700 border-gray-600 text-white"
                disabled={isGenerating}
              />
              <Button
                onClick={() => generateQuestions(true)}
                disabled={isGenerating || (!hasValidFiles && !urlInput.trim())}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Include URL
              </Button>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <Button
              onClick={() => generateQuestions(false)}
              disabled={!hasValidFiles || isGenerating}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8"
            >
              {isGenerating ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-pulse" />
                  Generating Questions...
                </>
              ) : (
                <>
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Generate Research Questions
                </>
              )}
            </Button>
          </div>

          {/* Progress */}
          {isGenerating && (
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center space-x-3 mb-3">
                <Brain className="h-5 w-5 text-cyan-400 animate-pulse" />
                <span className="text-white">Claude is analyzing content and generating questions...</span>
              </div>
              <Progress value={generationProgress} className="h-2" />
              <div className="text-center mt-2">
                <span className="text-sm text-gray-400">{generationProgress}% Complete</span>
              </div>
            </div>
          )}

          {/* Filters */}
          {generatedQuestions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-900 rounded-lg border border-gray-600">
              <Select value={selectedQuestionType} onValueChange={setSelectedQuestionType}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Question Type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="analytical">Analytical</SelectItem>
                  <SelectItem value="comparative">Comparative</SelectItem>
                  <SelectItem value="exploratory">Exploratory</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="methodology">Methodology</SelectItem>
                  <SelectItem value="theory">Theory</SelectItem>
                  <SelectItem value="application">Application</SelectItem>
                  <SelectItem value="evaluation">Evaluation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Questions */}
      {filteredQuestions.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Generated Questions ({filteredQuestions.length})</span>
              <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                Claude Generated
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {filteredQuestions.map((question, index) => {
                  const IconComponent = getQuestionIcon(question.type);
                  return (
                    <Card key={index} className="bg-gray-700 border-gray-600 hover:bg-gray-600 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between space-x-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center space-x-2">
                              <IconComponent className="h-4 w-4 text-cyan-400" />
                              <Badge className={`text-xs ${getQuestionTypeColor(question.type)}`}>
                                {question.type}
                              </Badge>
                              <Badge className={`text-xs ${getDifficultyColor(question.difficulty)}`}>
                                {question.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs text-gray-400 border-gray-500">
                                {question.category}
                              </Badge>
                            </div>

                            <p className="text-white font-medium">{question.question}</p>
                            
                            {question.rationale && (
                              <p className="text-gray-300 text-sm">{question.rationale}</p>
                            )}

                            <div className="flex items-center space-x-4 text-xs text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{question.estimatedTime}</span>
                              </div>
                              {question.sourceDocuments && question.sourceDocuments.length > 0 && (
                                <div className="flex items-center space-x-1">
                                  <FileText className="h-3 w-3" />
                                  <span>{question.sourceDocuments.length} docs</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <Button
                            size="sm"
                            onClick={() => onQuestionExecute?.(question.question)}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Execute
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!hasValidFiles && generatedQuestions.length === 0 && (
        <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-600">
          <Brain className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-white font-medium mb-2">Ready to Generate Research Questions</h3>
          <p className="text-gray-400 text-sm mb-4">
            Upload documents or provide URLs to generate intelligent research questions
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <FileText className="h-3 w-3" />
              <span>Document Analysis</span>
            </div>
            <div className="flex items-center space-x-1">
              <Link className="h-3 w-3" />
              <span>URL Content</span>
            </div>
            <div className="flex items-center space-x-1">
              <Brain className="h-3 w-3" />
              <span>Claude AI</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntelligentQuestionGenerator;
