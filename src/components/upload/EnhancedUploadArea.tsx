
import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, Eye, User, Calendar, Hash, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNotifications } from '@/components/ui/notification';
import { SmartProcessedFile, IntelligentFileProcessor } from '@/utils/intelligentFileProcessor';

interface UploadState {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
  processedData?: SmartProcessedFile;
}

interface EnhancedUploadAreaProps {
  onFilesProcessed?: (files: SmartProcessedFile[]) => void;
  maxFiles?: number;
  maxSize?: number;
}

const EnhancedUploadArea = ({ 
  onFilesProcessed, 
  maxFiles = 10, 
  maxSize = 10 * 1024 * 1024 
}: EnhancedUploadAreaProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploads, setUploads] = useState<UploadState[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<SmartProcessedFile | null>(null);
  const { addNotification } = useNotifications();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const intelligentFileProcessing = async (uploadId: string, file: File) => {
    try {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploads(prev => 
          prev.map(u => u.id === uploadId ? { ...u, progress } : u)
        );
      }

      // Process with intelligent analyzer
      setUploads(prev => 
        prev.map(u => u.id === uploadId ? { ...u, status: 'processing' } : u)
      );

      const processedData = await IntelligentFileProcessor.processFile(file);

      setUploads(prev => 
        prev.map(u => u.id === uploadId ? { 
          ...u, 
          status: 'completed',
          processedData
        } : u)
      );

      addNotification({
        type: 'success',
        title: 'Intelligent Processing Complete',
        message: `${file.name} analyzed with ${processedData.metadata.confidenceScore}% confidence`,
      });

      // Get all completed files and notify parent
      const allCompletedFiles = uploads
        .map(u => u.processedData)
        .filter(Boolean) as SmartProcessedFile[];
      allCompletedFiles.push(processedData);
      
      onFilesProcessed?.(allCompletedFiles);

    } catch (error) {
      setUploads(prev => 
        prev.map(u => u.id === uploadId ? { 
          ...u, 
          status: 'error',
          error: 'Processing failed'
        } : u)
      );

      addNotification({
        type: 'error',
        title: 'Processing Failed',
        message: `Failed to process ${file.name}`,
      });
    }
  };

  const handleFiles = useCallback((files: File[]) => {
    if (uploads.length + files.length > maxFiles) {
      addNotification({
        type: 'error',
        title: 'Too Many Files',
        message: `You can upload a maximum of ${maxFiles} files`,
      });
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        addNotification({
          type: 'error',
          title: 'File Too Large',
          message: `${file.name} exceeds the ${Math.round(maxSize / 1024 / 1024)}MB limit`,
        });
        return false;
      }
      return true;
    });

    const newUploads: UploadState[] = validFiles.map(file => ({
      id: `upload-${Date.now()}-${Math.random()}`,
      file,
      progress: 0,
      status: 'uploading'
    }));

    setUploads(prev => [...prev, ...newUploads]);

    // Start intelligent processing for each file
    newUploads.forEach(upload => {
      intelligentFileProcessing(upload.id, upload.file);
    });
  }, [uploads.length, maxFiles, maxSize, addNotification, onFilesProcessed]);

  const removeUpload = useCallback((id: string) => {
    setUploads(prev => prev.filter(u => u.id !== id));
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-green-400 bg-green-400/10';
    if (score >= 70) return 'text-yellow-400 bg-yellow-400/10';
    return 'text-red-400 bg-red-400/10';
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Upload Zone */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-blue-500 bg-blue-500/10 scale-[1.02] shadow-lg shadow-blue-500/20' 
            : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/30'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Upload className="h-8 w-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Upload Documents</h3>
            <p className="text-gray-400 text-lg mb-3">
              Drag and drop files for intelligent analysis
            </p>
            <p className="text-sm text-gray-500">
              AI-powered processing • Max {Math.round(maxSize / 1024 / 1024)}MB per file • Up to {maxFiles} files
            </p>
          </div>

          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3"
            onClick={() => document.getElementById('enhanced-file-upload')?.click()}
          >
            <Upload className="h-5 w-5 mr-2" />
            Choose Files
          </Button>
        </div>

        <input
          id="enhanced-file-upload"
          type="file"
          multiple
          accept=".pdf,.csv,.txt,.docx,.doc"
          onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
          className="hidden"
        />

        {isDragOver && (
          <div className="absolute inset-0 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <div className="text-blue-400 font-semibold text-lg">Drop files for intelligent analysis</div>
          </div>
        )}
      </div>

      {/* Enhanced File List with Intelligent Metadata */}
      {uploads.length > 0 && (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold text-lg">
              Intelligent Processing ({uploads.length})
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUploads([])}
              className="text-gray-400 hover:text-white"
            >
              Clear All
            </Button>
          </div>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {uploads.map((upload) => (
              <Card
                key={upload.id}
                className="bg-gray-700/50 border-gray-600 hover:bg-gray-700/70 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {upload.status === 'completed' && (
                        <CheckCircle className="h-8 w-8 text-green-400" />
                      )}
                      {upload.status === 'error' && (
                        <AlertCircle className="h-8 w-8 text-red-400" />
                      )}
                      {(upload.status === 'uploading' || upload.status === 'processing') && (
                        <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                          <FileText className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white font-medium truncate">{upload.file.name}</p>
                        {upload.processedData && (
                          <Badge className={`text-xs ${getConfidenceColor(upload.processedData.metadata.confidenceScore)}`}>
                            {upload.processedData.metadata.confidenceScore}% confidence
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-400 mb-2">
                        <span>{formatFileSize(upload.file.size)}</span>
                        {upload.status === 'uploading' && (
                          <span className="text-blue-400">Uploading...</span>
                        )}
                        {upload.status === 'processing' && (
                          <span className="text-yellow-400">Analyzing...</span>
                        )}
                        {upload.processedData && (
                          <>
                            <span className="text-green-400">{upload.processedData.metadata.wordCount} words</span>
                            <span className="text-purple-400">{upload.processedData.metadata.topic}</span>
                          </>
                        )}
                      </div>

                      {/* Enhanced metadata display */}
                      {upload.processedData && (
                        <div className="bg-gray-800/50 rounded-lg p-3 mt-2">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3 text-gray-400" />
                              <span className="text-gray-300">{upload.processedData.metadata.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span className="text-gray-300">
                                {upload.processedData.metadata.createdDate.toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Hash className="h-3 w-3 text-gray-400" />
                              <span className="text-gray-300">{upload.processedData.metadata.pageCount} pages</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Target className="h-3 w-3 text-gray-400" />
                              <span className="text-gray-300">{upload.processedData.metadata.category}</span>
                            </div>
                          </div>
                          
                          <div className="mt-2">
                            <p className="text-xs text-gray-400 mb-1">Keywords:</p>
                            <div className="flex flex-wrap gap-1">
                              {upload.processedData.metadata.keywords.slice(0, 3).map((keyword, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-gray-700/50 text-gray-300 border-gray-600">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {(upload.status === 'uploading' || upload.status === 'processing') && (
                        <div className="mt-2">
                          <Progress 
                            value={upload.progress} 
                            className="h-2 bg-gray-600"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {upload.status === 'completed' && upload.processedData && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPreview(upload.processedData!)}
                          className="text-gray-400 hover:text-blue-400 transition-all"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeUpload(upload.id)}
                        className="text-gray-400 hover:text-red-400 transition-all"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Preview Modal */}
      {selectedPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-gray-800 max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{selectedPreview.name}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPreview(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="overflow-y-auto max-h-[60vh]">
              {/* Enhanced metadata display */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-900/50 rounded-lg">
                <div>
                  <p className="text-gray-400 text-sm">Author</p>
                  <p className="text-white font-medium">{selectedPreview.metadata.author}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Created</p>
                  <p className="text-white font-medium">{selectedPreview.metadata.createdDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Topic</p>
                  <p className="text-white font-medium">{selectedPreview.metadata.topic}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Confidence</p>
                  <p className="text-white font-medium">{selectedPreview.metadata.confidenceScore}%</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPreview.metadata.keywords.map((keyword, idx) => (
                    <Badge key={idx} variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Content Preview:</h4>
                <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                  {selectedPreview.preview}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnhancedUploadArea;
