
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FileText, Brain, TrendingUp, Users, Clock, BarChart3 } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Sidebar from '../components/Sidebar';
import RightPanel from '../components/RightPanel';
import MainContent from '../components/MainContent';
import StatsGrid from '../components/dashboard/StatsGrid';
import QuickActions from '../components/dashboard/QuickActions';
import OnboardingFlow from '../components/onboarding/OnboardingFlow';
import EnhancedUploadArea from '../components/upload/EnhancedUploadArea';
import { ProcessedFile } from '@/utils/fileProcessor';
import { useNotifications } from '@/components/ui/notification';

const Index = () => {
  const [hasDocuments, setHasDocuments] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const { user, loading, demoMode } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user && !demoMode) {
      navigate('/auth');
    }
  }, [user, loading, demoMode, navigate]);

  useEffect(() => {
    // Check if user is new (for demo purposes, always show onboarding to new sessions)
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding && (user || demoMode)) {
      setShowOnboarding(true);
    }
  }, [user, demoMode]);

  useEffect(() => {
    const timer = setTimeout(() => setHasDocuments(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user && !demoMode) {
    return null;
  }

  const stats = [
    {
      title: 'Documents Processed',
      value: processedFiles.filter(f => f.status === 'completed').length.toString(),
      change: '12',
      changeType: 'increase' as const,
      icon: FileText,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'AI Insights Generated',
      value: '847',
      change: '23',
      changeType: 'increase' as const,
      icon: Brain,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Analysis Accuracy',
      value: '94.2%',
      change: '2.1%',
      changeType: 'increase' as const,
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
    
    switch (action) {
      case 'upload':
        setShowUpload(true);
        break;
      case 'analyze':
        addNotification({
          type: 'info',
          title: 'AI Analysis',
          message: 'Starting analysis of uploaded documents...'
        });
        break;
      case 'export':
        addNotification({
          type: 'success',
          title: 'Export Started',
          message: 'Your analysis report is being prepared for download'
        });
        break;
      case 'new-project':
        addNotification({
          type: 'info',
          title: 'New Project',
          message: 'Creating a new research project...'
        });
        break;
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
    addNotification({
      type: 'success',
      title: 'Welcome to AI Research Hub!',
      message: 'You\'re all set to start analyzing documents'
    });
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  const handleFilesProcessed = (files: ProcessedFile[]) => {
    setProcessedFiles(prev => {
      const updatedFiles = [...prev];
      files.forEach(file => {
        const existingIndex = updatedFiles.findIndex(f => f.id === file.id);
        if (existingIndex >= 0) {
          updatedFiles[existingIndex] = file;
        } else {
          updatedFiles.push(file);
        }
      });
      return updatedFiles;
    });
    setHasDocuments(true);
  };

  return (
    <>
      <DashboardLayout
        sidebar={<Sidebar isOpen={false} onClose={() => {}} />}
        rightPanel={<RightPanel hasDocuments={hasDocuments} />}
      >
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-3">
              Research Dashboard
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Upload documents, analyze content, and generate AI-powered insights with advanced document intelligence.
            </p>
          </div>

          {/* Enhanced Stats Grid */}
          <StatsGrid stats={stats} />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="xl:col-span-1">
              <QuickActions
                onUploadClick={() => handleQuickAction('upload')}
                onAnalyzeClick={() => handleQuickAction('analyze')}
                onExportClick={() => handleQuickAction('export')}
                onNewProjectClick={() => handleQuickAction('new-project')}
              />
            </div>

            {/* Main Content Area */}
            <div className="xl:col-span-2">
              {showUpload ? (
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white">Upload Documents</h2>
                    <button
                      onClick={() => setShowUpload(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <EnhancedUploadArea onFilesProcessed={handleFilesProcessed} />
                </div>
              ) : (
                <MainContent hasDocuments={hasDocuments} />
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>

      {/* Onboarding Flow */}
      <OnboardingFlow
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />
    </>
  );
};

export default Index;
