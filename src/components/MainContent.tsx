
import React, { useState } from 'react';
import { FileText, Brain, TrendingUp, Upload, Search, MoreVertical, Download, Trash2, Eye } from 'lucide-react';
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
import LoadingSkeleton from './LoadingSkeleton';

interface MainContentProps {
  hasDocuments: boolean;
}

const MainContent = ({ hasDocuments }: MainContentProps) => {
  const [activeTab, setActiveTab] = useState('upload');
  const [showWelcome, setShowWelcome] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const stats = [
    { label: 'Documents Processed', value: '142', icon: FileText, color: 'text-blue-400' },
    { label: 'Insights Generated', value: '89', icon: Brain, color: 'text-cyan-400' },
    { label: 'Trend Predictions', value: '15', icon: TrendingUp, color: 'text-purple-400' },
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

  const handleStartTour = () => {
    setShowWelcome(false);
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

  if (showWelcome) {
    return (
      <>
        <main className="flex-1 p-6 bg-gray-950">
          <div className="max-w-4xl mx-auto">
            <LoadingSkeleton type="dashboard" />
          </div>
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
        <div className="max-w-4xl mx-auto">
          <LoadingSkeleton type="dashboard" />
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="flex-1 p-6 bg-gray-950 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Research Dashboard</h1>
            <p className="text-gray-400">Analyze documents, generate insights, and track research progress</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors">
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

          {/* Main Tabbed Interface */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b border-gray-800 px-6 pt-6">
                  <TabsList className="bg-gray-800 border-gray-700">
                    <TabsTrigger 
                      value="upload" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload & Process
                    </TabsTrigger>
                    <TabsTrigger 
                      value="documents"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Document Library
                    </TabsTrigger>
                    <TabsTrigger 
                      value="analysis"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                    >
                      <Brain className="h-4 w-4 mr-2" />
                      AI Analysis
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6">
                  <TabsContent value="upload" className="mt-0 space-y-6">
                    <UploadArea />
                    <AnalysisInterface hasUploadedFiles={hasDocuments} />
                  </TabsContent>

                  <TabsContent value="documents" className="mt-0">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Document Library</h3>
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
                      </div>

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
                    </div>
                  </TabsContent>

                  <TabsContent value="analysis" className="mt-0">
                    <div className="text-center py-12">
                      <Brain className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">No Analysis Available</h3>
                      <p className="text-gray-400">Upload documents to start AI-powered analysis</p>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Modals */}
      <DocumentPreview
        isOpen={!!selectedDocument}
        onClose={() => setSelectedDocument(null)}
        document={selectedDocument}
      />
    </>
  );
};

export default MainContent;
