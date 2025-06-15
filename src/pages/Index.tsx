import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FileText, Brain, TrendingUp } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Sidebar from '../components/Sidebar';
import RightPanel from '../components/RightPanel';
import ResponsiveStatsGrid from '../components/dashboard/ResponsiveStatsGrid';
import MobileQuickActions from '../components/dashboard/MobileQuickActions';
import QuickActions from '../components/dashboard/QuickActions';
import OnboardingFlow from '../components/onboarding/OnboardingFlow';
import EnhancedUploadArea from '../components/upload/EnhancedUploadArea';
import WelcomeGuide from '../components/dashboard/WelcomeGuide';
import { ProcessedFile } from '@/utils/fileProcessor';
import { useNotifications } from '@/components/ui/notification';

const Index = () => {
  const [hasDocuments, setHasDocuments] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWelcomeGuide, setShowWelcomeGuide] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, loading, demoMode } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!loading && !user && !demoMode) {
      navigate('/auth');
    }
  }, [user, loading, demoMode, navigate]);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    const hasSeenWelcomeGuide = localStorage.getItem('hasSeenWelcomeGuide');
    
    if (!hasSeenOnboarding && (user || demoMode)) {
      setShowOnboarding(true);
    } else if (!hasSeenWelcomeGuide && (user || demoMode)) {
      setShowWelcomeGuide(true);
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
        addNotification({
          type: 'info',
          title: 'Upload Documents',
          message: 'Ready to upload your files'
        });
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
      default:
        addNotification({
          type: 'info',
          title: 'Action',
          message: `Performed action: ${action}`
        });
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

  const handleWelcomeGuideClose = () => {
    setShowWelcomeGuide(false);
    localStorage.setItem('hasSeenWelcomeGuide', 'true');
  };

  const handleWelcomeGuideGetStarted = () => {
    setShowUpload(true);
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
    addNotification({
      type: 'success',
      title: 'Files Processed',
      message: `Successfully processed ${files.length} file(s)`
    });
  };

  return (
    <>
      <DashboardLayout
        sidebar={<Sidebar isOpen={false} onClose={() => {}} />}
        rightPanel={<RightPanel hasDocuments={hasDocuments} />}
        hasDocuments={hasDocuments}
      >
        <div className="space-y-6 lg:space-y-8">
          {/* Welcome Section with improved spacing */}
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-3">
                  Research Dashboard
                </h1>
                <p className="text-base lg:text-lg text-gray-400 max-w-2xl">
                  Upload documents, analyze content, and generate AI-powered insights with advanced document intelligence.
                </p>
              </div>
              <div className="hidden lg:block">
                <button
                  onClick={() => setShowWelcomeGuide(true)}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Show Guide
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <ResponsiveStatsGrid stats={stats} isMobile={isMobile} />

          {/* Improved layout for better responsiveness */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
            {/* Quick Actions - Better responsive sizing */}
            <div className="xl:col-span-4 2xl:col-span-3 order-1">
              {isMobile ? (
                <MobileQuickActions
                  onUploadClick={() => handleQuickAction('upload')}
                  onAnalyzeClick={() => handleQuickAction('analyze')}
                  onExportClick={() => handleQuickAction('export')}
                  onNewProjectClick={() => handleQuickAction('new-project')}
                />
              ) : (
                <QuickActions
                  onUploadClick={() => handleQuickAction('upload')}
                  onAnalyzeClick={() => handleQuickAction('analyze')}
                  onExportClick={() => handleQuickAction('export')}
                  onNewProjectClick={() => handleQuickAction('new-project')}
                />
              )}
            </div>

            {/* Main Content Area - Adjusted to fill remaining space better */}
            <div className="xl:col-span-8 2xl:col-span-9 order-2">
              {showUpload ? (
                <div className="bg-gray-800/50 rounded-xl p-4 lg:p-6 border border-gray-700/50 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4 lg:mb-6">
                    <h2 className="text-lg lg:text-xl font-semibold text-white">Upload Documents</h2>
                    <button
                      onClick={() => setShowUpload(false)}
                      className="text-gray-400 hover:text-white text-xl transition-colors touch-manipulation"
                    >
                      ✕
                    </button>
                  </div>
                  <EnhancedUploadArea onFilesProcessed={handleFilesProcessed} />
                </div>
              ) : (
                <div className="bg-gray-800/50 rounded-xl p-6 lg:p-8 border border-gray-700/50 backdrop-blur-sm">
                  <div className="text-center py-8 lg:py-12">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-lg">
                      <FileText className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold text-white mb-3">
                      Welcome to your AI Research Hub
                    </h3>
                    <p className="text-sm lg:text-base text-gray-400 mb-6 lg:mb-8 max-w-md mx-auto">
                      Start by uploading documents to analyze, or explore the demo features to see what's possible.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={() => setShowUpload(true)}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 lg:px-8 lg:py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg touch-manipulation"
                      >
                        Get Started
                      </button>
                      <button
                        onClick={() => setShowWelcomeGuide(true)}
                        className="text-blue-400 hover:text-blue-300 px-6 py-3 rounded-lg transition-colors touch-manipulation"
                      >
                        View Guide
                      </button>
                    </div>
                  </div>
                </div>
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

      {/* Welcome Guide */}
      <WelcomeGuide
        isOpen={showWelcomeGuide}
        onClose={handleWelcomeGuideClose}
        onGetStarted={handleWelcomeGuideGetStarted}
      />
    </>
  );
};

export default Index;
