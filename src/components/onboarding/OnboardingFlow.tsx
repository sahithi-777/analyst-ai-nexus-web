import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Upload, Brain, BarChart3, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

interface OnboardingFlowProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const OnboardingFlow = ({ isOpen, onComplete, onSkip }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to AI Research Hub',
      description: 'Your intelligent document analysis platform',
      icon: Brain,
      content: (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto">
            <Brain className="h-10 w-10 text-white" />
          </div>
          <p className="text-gray-300 text-lg">
            Let's get you started with analyzing your documents using AI-powered insights.
          </p>
        </div>
      )
    },
    {
      id: 'upload',
      title: 'Upload Your Documents',
      description: 'Drag and drop or select files to analyze',
      icon: Upload,
      content: (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300">
              Support for PDF, CSV, TXT, and DOCX files up to 10MB each
            </p>
          </div>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Automatic text extraction</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Secure processing</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Batch upload support</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'analysis',
      title: 'AI-Powered Analysis',
      description: 'Generate insights, summaries, and connections',
      icon: BarChart3,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">Smart Summaries</h4>
              <p className="text-gray-400 text-sm">Automatic key points extraction</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">Theme Detection</h4>
              <p className="text-gray-400 text-sm">Identify recurring patterns</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">Contradictions</h4>
              <p className="text-gray-400 text-sm">Find conflicting information</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">Connections</h4>
              <p className="text-gray-400 text-sm">Link related concepts</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'complete',
      title: 'You\'re All Set!',
      description: 'Start analyzing your documents now',
      icon: CheckCircle,
      content: (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <p className="text-gray-300 text-lg">
            You're ready to start your research journey with AI-powered document analysis.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">
              💡 <strong>Pro tip:</strong> Use keyboard shortcuts (Ctrl/Cmd + /) to speed up your workflow
            </p>
          </div>
        </div>
      )
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
        <div className="space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Step {currentStep + 1} of {steps.length}</span>
              <span className="text-gray-400">{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">{steps[currentStep].title}</h2>
              <p className="text-gray-400 text-lg">{steps[currentStep].description}</p>
            </div>
            <div className="py-6">
              {steps[currentStep].content}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <div className="flex space-x-2">
              {!isFirstStep && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="border-gray-600 text-gray-300"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
              )}
            </div>

            <Button onClick={onSkip} variant="ghost" className="text-gray-400 hover:text-white">
              Skip Tour
            </Button>

            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              {isLastStep ? 'Get Started' : 'Next'}
              {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingFlow;
