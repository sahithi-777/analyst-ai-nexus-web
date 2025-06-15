
import React, { useState } from 'react';
import { Brain, FileText, BarChart, TrendingUp, ArrowRight, X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WelcomeProps {
  onClose: () => void;
  onStartTour: () => void;
}

const Welcome = ({ onClose, onStartTour }: WelcomeProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps = [
    {
      title: "Upload Your Documents",
      description: "Start by uploading research documents, PDFs, spreadsheets, or web articles.",
      icon: FileText,
      color: "text-blue-400"
    },
    {
      title: "AI-Powered Analysis",
      description: "Our AI analyzes your documents to extract insights, themes, and connections.",
      icon: Brain,
      color: "text-cyan-400"
    },
    {
      title: "Visualize Connections",
      description: "See how your research connects through interactive knowledge graphs.",
      icon: BarChart,
      color: "text-green-400"
    },
    {
      title: "Generate Reports",
      description: "Export comprehensive analysis reports and share your findings.",
      icon: TrendingUp,
      color: "text-purple-400"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <Card className="bg-gray-900 border-gray-800 max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-xl">Welcome to AI Research Analyst</CardTitle>
                <p className="text-gray-400 text-sm">Transform your research with AI-powered insights</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tourSteps.map((step, index) => (
              <div 
                key={index}
                className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg bg-gray-700 ${step.color}`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-800">
            <Button
              onClick={onStartTour}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white flex-1"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Guided Tour
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 flex-1"
            >
              Skip and Explore
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Welcome;
