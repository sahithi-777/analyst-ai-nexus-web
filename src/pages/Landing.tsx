
import React from 'react';
import { Brain, FileText, MessageSquare, BarChart3, ArrowRight, Users, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Landing = () => {
  const navigate = useNavigate();
  const { setDemoMode } = useAuth();

  const handleTryDemo = () => {
    setDemoMode(true);
    navigate('/dashboard');
  };

  const features = [
    {
      icon: Brain,
      title: 'Claude AI Analysis',
      description: 'Advanced document analysis using Anthropic\'s Claude AI for deep insights and comprehensive understanding.'
    },
    {
      icon: FileText,
      title: 'Multi-Format Support',
      description: 'Upload PDFs, Word documents, CSVs, and text files. Our AI processes them all with equal precision.'
    },
    {
      icon: MessageSquare,
      title: 'Interactive Chat',
      description: 'Chat with your documents using natural language. Ask questions and get instant, contextual responses.'
    },
    {
      icon: BarChart3,
      title: 'Visual Analytics',
      description: 'Beautiful visualizations of insights, relationships, and patterns discovered in your documents.'
    },
    {
      icon: Users,
      title: 'Research Questions',
      description: 'AI-generated research questions to guide your analysis and uncover new research directions.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your documents are processed securely with enterprise-grade encryption and privacy protection.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center text-white font-semibold text-xl">
            <Brain className="h-6 w-6 mr-2 text-cyan-400" />
            AI Research Hub
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/auth')}
              className="text-gray-300 hover:text-white"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Transform Your Research with
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> AI Intelligence</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Upload your documents and let Claude AI provide deep analysis, generate insights, 
              map relationships, and answer your research questions with unprecedented accuracy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 text-lg"
              >
                Start Analyzing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleTryDemo}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 px-8 py-3 text-lg"
              >
                <Zap className="mr-2 h-5 w-5" />
                Try Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gray-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features for Deep Research
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to analyze, understand, and extract insights from your research documents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Revolutionize Your Research?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join researchers worldwide who are using AI to unlock deeper insights from their documents
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 text-lg"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleTryDemo}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 px-8 py-3 text-lg"
              >
                Try Demo First
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 AI Research Hub. Powered by Claude AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
