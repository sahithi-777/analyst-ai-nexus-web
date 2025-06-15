
import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNotifications } from '@/components/ui/notification';
import { ProcessedFile } from '@/utils/fileProcessor';

interface UploadState {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
  processedData?: ProcessedFile;
}

interface EnhancedUploadAreaProps {
  onFilesProcessed?: (files: ProcessedFile[]) => void;
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

  const simulateFileProcessing = async (uploadId: string, file: File) => {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploads(prev => 
        prev.map(u => u.id === uploadId ? { ...u, progress } : u)
      );
    }

    // Simulate processing
    setUploads(prev => 
      prev.map(u => u.id === uploadId ? { ...u, status: 'processing' } : u)
    );

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Complete processing
    const extractedText = `Sample extracted text from ${file.name}...`;
    const mockProcessedData: ProcessedFile = {
      id: uploadId,
      name: file.name,
      type: file.type,
      size: file.size,
      content: extractedText,
      extractedText: extractedText,
      status: 'completed',
      metadata: {
        wordCount: Math.floor(Math.random() * 5000) + 500,
        pageCount: Math.floor(Math.random() * 20) + 1,
        language: 'en'
      },
      uploadedAt: new Date()
    };

    setUploads(prev => 
      prev.map(u => u.id === uploadId ? { 
        ...u, 
        status: 'completed',
        processedData: mockProcessedData
      } : u)
    );

    addNotification({
      type: 'success',
      title: 'File Processed',
      message: `${file.name} has been successfully processed`,
    });

    onFilesProcessed?.([mockProcessedData]);
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

    // Start processing each file
    newUploads.forEach(upload => {
      simulateFileProcessing(upload.id, upload.file);
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
              Drag and drop files here or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports PDF, CSV, TXT files • Max {Math.round(maxSize / 1024 / 1024)}MB per file • Up to {maxFiles} files
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
            <div className="text-blue-400 font-semibold text-lg">Drop files here</div>
          </div>
        )}
      </div>

      {/* Enhanced File List */}
      {uploads.length > 0 && (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold text-lg">
              Processing Files ({uploads.length})
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
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {uploads.map((upload) => (
              <div
                key={upload.id}
                className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg group hover:bg-gray-700/70 transition-colors"
              >
                <div className="flex-shrink-0">
                  {upload.status === 'completed' && (
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  )}
                  {upload.status === 'error' && (
                    <AlertCircle className="h-8 w-8 text-red-400" />
                  )}
                  {(upload.status === 'uploading' || upload.status === 'processing') && (
                    <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{upload.file.name}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-400">
                      {formatFileSize(upload.file.size)}
                    </span>
                    {upload.status === 'uploading' && (
                      <span className="text-sm text-blue-400">Uploading...</span>
                    )}
                    {upload.status === 'processing' && (
                      <span className="text-sm text-yellow-400">Processing...</span>
                    )}
                    {upload.status === 'completed' && upload.processedData && (
                      <span className="text-sm text-green-400">
                        {upload.processedData.metadata.wordCount} words
                      </span>
                    )}
                  </div>
                  
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
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-400 transition-all"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeUpload(upload.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-all"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedUploadArea;
