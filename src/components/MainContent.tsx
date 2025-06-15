
import React, { useState } from 'react';
import { BarChart, FileText, Brain, TrendingUp, Upload, Settings, Share, Eye, Trash2, Download, Search, MoreVertical } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import UploadArea from './UploadArea';
import AnalysisInterface from './AnalysisInterface';
import Welcome from './Welcome';
import DocumentPreview from './DocumentPreview';
import SettingsPanel from './SettingsPanel';
import ExportDialog from './ExportDialog';
import LoadingSkeleton from './LoadingSkeleton';

const MainContent = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [hasUploadedFiles, setHasUploadedFiles] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const stats = [
    { label: 'Documents Processed', value: '142', icon: FileText, color: 'text-blue-400' },
    { label: 'Insights Generated', value: '89', icon: Brain, color: 'text-cyan-400' },
    { label: 'Analysis Reports', value: '23', icon: BarChart, color: 'text-green-400' },
    { label: 'Trend Predictions', value: '15', icon: TrendingUp, color: 'text-purple-400' },
  ];

  const analysisHistory = [
    { id: 1, name: 'Q4 Market Analysis', date: '2 hours ago', docs: 5, status: 'completed', insights: 12 },
    { id: 2, name: 'Competitor Research', date: '1 day ago', docs: 3, status: 'completed', insights: 8 },
    { id: 3, name: 'Industry Trends Study', date: '3 days ago', docs: 8, status: 'completed', insights: 15 },
    { id: 4, name: 'Customer Behavior Analysis', date: '1 week ago', docs: 12, status: 'completed', insights: 22 },
  ];

  const recentDocuments = [
    { id: 1, name: 'Market Research Q4 2024.pdf', type: 'pdf', size: '2.4 MB', date: '2 hours ago', tags: ['market', 'q4', 'research'] },
    { id: 2, name: 'Competitor Analysis.docx', type: 'doc', size: '1.8 MB', date: '1 day ago', tags: ['competitor', 'analysis'] },
    { id: 3, name: 'Industry Trends Report.xlsx', type: 'excel', size: '3.2 MB', date: '3 days ago', tags: ['trends', 'industry'] },
    { id: 4, name: 'Customer Survey Results.pdf', type: 'pdf', size: '1.5 MB', date: '1 week ago', tags: ['survey', 'customer'] },
  ];

  const filteredDocuments = recentDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Simulate file upload detection
  React.useEffect(() => {
    const timer = setTimeout(() => setHasUploadedFiles(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartTour = () => {
    setShowWelcome(false);
    // Implement guided tour logic
  };

  const handleDocumentClick = (doc: any) => {
    setSelectedDocument(doc);
  };

  const handleFileSelect = (fileId: number) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on files:`, selectedFiles);
    setSelectedFiles([]);
  };

  const handleReloadAnalysis = (analysisId: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setActiveTab('analysis');
    }, 2000);
  };

  if (showWelcome) {
    return (
      <>
        <main className="flex-1 p-6 bg-gray-950">
          <LoadingSkeleton type="dashboard" />
        </main>
        <Welcome 
          onClose={() => setShowWelcome(false)} 
          onStartTour={handleStartTour}
        />
      </>
    );
  }

  if (isLoading) {
    return (
      <main className="flex-1 p-6 bg-gray-950">
        <LoadingSkeleton type="dashboard" />
      </main>
    );
  }

  return (
    <>
      <main className="flex-1 p-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Research Dashboard</h2>
              <p className="text-gray-400">Analyze documents, generate insights, and track research progress</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setShowExport(true)}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <Share className="h-4 w-4 mr-2" />
                Export & Share
              </Button>
              <Button
                onClick={() => setShowSettings(true)}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-800 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Analysis History */}
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-green-400" />
                  Analysis History
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400">
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisHistory.map((analysis) => (
                  <div
                    key={analysis.id}
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{analysis.name}</h3>
                        <div className="flex items-center space-x-3 text-sm text-gray-400">
                          <span>{analysis.date}</span>
                          <span>•</span>
                          <span>{analysis.docs} documents</span>
                          <span>•</span>
                          <span>{analysis.insights} insights</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default" className="bg-green-600">
                        {analysis.status}
                      </Badge>
                      <Button
                        onClick={() => handleReloadAnalysis(analysis.id)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Document Management */}
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-400" />
                  Document Library
                </div>
                <div className="flex items-center space-x-3">
                  {selectedFiles.length > 0 && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                          Bulk Actions ({selectedFiles.length})
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-800 border-gray-700">
                        <DropdownMenuItem onClick={() => handleBulkAction('download')}>
                          <Download className="h-4 w-4 mr-2" />
                          Download Selected
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkAction('delete')}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Selected
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-600 text-white w-64"
                    />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Checkbox
                      checked={selectedFiles.includes(doc.id)}
                      onCheckedChange={() => handleFileSelect(doc.id)}
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <FileText className="h-8 w-8 text-blue-400" />
                      <div className="flex-1 min-w-0">
                        <h3 
                          className="font-medium text-white truncate hover:text-blue-400 cursor-pointer transition-colors"
                          onClick={() => handleDocumentClick(doc)}
                        >
                          {doc.name}
                        </h3>
                        <div className="flex items-center space-x-3 text-sm text-gray-400">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          {doc.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-800 border-gray-700">
                        <DropdownMenuItem onClick={() => handleDocumentClick(doc)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tabbed Interface */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-gray-900 border-gray-800">
              <TabsTrigger 
                value="upload" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload & Process
              </TabsTrigger>
              <TabsTrigger 
                value="analysis"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
              >
                <Brain className="h-4 w-4 mr-2" />
                AI Analysis
              </TabsTrigger>
              <TabsTrigger 
                value="reports"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
              >
                <FileText className="h-4 w-4 mr-2" />
                Reports
              </TabsTrigger>
              <TabsTrigger 
                value="insights"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              <UploadArea />
              <AnalysisInterface hasUploadedFiles={hasUploadedFiles} />
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-cyan-400" />
                    AI Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Brain className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No Analysis Available</h3>
                    <p className="text-gray-400">Upload documents to start AI-powered analysis</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-400" />
                    Generated Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No Reports Generated</h3>
                    <p className="text-gray-400">Process documents to generate comprehensive reports</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                    Key Insights & Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <TrendingUp className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No Insights Available</h3>
                    <p className="text-gray-400">Analyze documents to discover key insights and trends</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Modals */}
      <DocumentPreview
        isOpen={!!selectedDocument}
        onClose={() => setSelectedDocument(null)}
        document={selectedDocument}
      />
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
      <ExportDialog
        isOpen={showExport}
        onClose={() => setShowExport(false)}
      />
    </>
  );
};

export default MainContent;
