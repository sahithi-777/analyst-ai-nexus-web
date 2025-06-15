
import React, { useState } from 'react';
import { X, Upload, Brain, BarChart3, FileText, ArrowRight, Sparkles, CheckCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WelcomeGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
}

const WelcomeGuide = ({ isOpen, onClose, onGetStarted }: WelcomeGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to AI Research Hub',
      description: 'Your intelligent research companion for document analysis and insights',
      icon: Sparkles,
      gradient: 'from-blue-500 to-cyan-500',
      content: (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Welcome to AI Research Hub!</h3>
          <p className="text-gray-300 mb-6">
            Transform your research workflow with AI-powered document analysis, intelligent insights, and automated report generation.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-800/50 rounded-lg p-3">
              <CheckCircle className="h-5 w-5 text-green-400 mb-2" />
              <p className="text-white font-medium">Smart Analysis</p>
              <p className="text-gray-400">AI-powered insights</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <CheckCircle className="h-5 w-5 text-green-400 mb-2" />
              <p className="text-white font-medium">Real-time Chat</p>
              <p className="text-gray-400">Ask questions instantly</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'upload',
      title: 'Upload Your Documents',
      description: 'Start by uploading research papers, reports, or any documents you want to analyze',
      icon: Upload,
      gradient: 'from-green-500 to-emerald-500',
      content: (
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Upload className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white text-center mb-3">Upload Your Documents</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium">Supported formats</p>
                <p className="text-gray-400 text-sm">PDF, DOCX, TXT, and more</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Brain className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-medium">Automatic processing</p>
                <p className="text-gray-400 text-sm">AI extracts key information</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'analyze',
      title: 'AI Analysis & Insights',
      description: 'Our AI will analyze your documents and provide intelligent insights',
      icon: Brain,
      gradient: 'from-purple-500 to-pink-500',
      content: (
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white text-center mb-3">AI Analysis & Insights</h3>
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 bg-gray-800/50 rounded-lg border border-purple-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <p className="text-white font-medium text-sm">Theme Extraction</p>
              </div>
              <p className="text-gray-400 text-xs">Identify key themes and topics</p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-lg border border-pink-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <p className="text-white font-medium text-sm">Contradiction Detection</p>
              </div>
              <p className="text-gray-400 text-xs">Find conflicting information</p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-lg border border-cyan-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <p className="text-white font-medium text-sm">Research Gaps</p>
              </div>
              <p className="text-gray-400 text-xs">Identify areas for further research</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'chat',
      title: 'Research Assistant',
      description: 'Chat with AI about your documents and get instant answers',
      icon: BarChart3,
      gradient: 'from-cyan-500 to-blue-500',
      content: (
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white text-center mb-3">Research Assistant</h3>
          <div className="space-y-3">
            <div className="bg-gray-800/50 rounded-lg p-3 border-l-4 border-cyan-500">
              <p className="text-cyan-400 font-medium text-sm mb-1">Example Questions:</p>
              <p className="text-gray-300 text-xs">"What are the main findings in the uploaded research?"</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 border-l-4 border-blue-500">
              <p className="text-blue-400 font-medium text-sm mb-1">Smart Suggestions:</p>
              <p className="text-gray-300 text-xs">Get AI-generated follow-up questions</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 border-l-4 border-purple-500">
              <p className="text-purple-400 font-medium text-sm mb-1">Citations:</p>
              <p className="text-gray-300 text-xs">Responses include document references</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-900 border-gray-800 shadow-2xl">
        <CardHeader className="border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${currentStepData.gradient} rounded-lg flex items-center justify-center`}>
                <currentStepData.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white">{currentStepData.title}</CardTitle>
                <p className="text-gray-400 text-sm">{currentStepData.description}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Progress indicators */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-blue-500' : index < currentStep ? 'bg-green-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Step content */}
          <div className="mb-8">
            {currentStepData.content}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </div>
            
            <div className="flex items-center space-x-3">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Previous
                </Button>
              )}
              
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    onGetStarted();
                    onClose();
                  }}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeGuide;
