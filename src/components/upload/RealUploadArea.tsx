
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { RealProcessedFile, RealAiProcessor } from '@/utils/realAiProcessor';

interface RealUploadAreaProps {
  onFilesProcessed: (files: RealProcessedFile[]) => void;
  maxFiles?: number;
  maxSize?: number;
}

const RealUploadArea = ({ onFilesProcessed, maxFiles = 5, maxSize = 10 * 1024 * 1024 }: RealUploadAreaProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<RealProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const { toast } = useToast();

  const processFiles = async (files: File[]) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    
    try {
      const newProcessedFiles: RealProcessedFile[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProcessingProgress(((i + 1) / files.length) * 100);
        
        try {
          const processedFile = await RealAiProcessor.processFile(file);
          newProcessedFiles.push(processedFile);
          
          toast({
            title: "File Processed",
            description: `${file.name} has been analyzed by Claude AI`,
          });
        } catch (error) {
          console.error(`Error processing ${file.name}:`, error);
          toast({
            title: "Processing Error",
            description: `Failed to process ${file.name}`,
            variant: "destructive"
          });
        }
      }
      
      const updatedFiles = [...uploadedFiles, ...newProcessedFiles];
      setUploadedFiles(updatedFiles);
      onFilesProcessed(updatedFiles);
      
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (uploadedFiles.length + acceptedFiles.length > maxFiles) {
      toast({
        title: "Too Many Files",
        description: `Maximum ${maxFiles} files allowed`,
        variant: "destructive"
      });
      return;
    }

    const oversizedFiles = acceptedFiles.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      toast({
        title: "File Too Large",
        description: `Files must be smaller than ${Math.round(maxSize / 1024 / 1024)}MB`,
        variant: "destructive"
      });
      return;
    }

    await processFiles(acceptedFiles);
  }, [uploadedFiles.length, maxFiles, maxSize, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/markdown': ['.md']
    },
    disabled: isProcessing
  });

  const removeFile = (fileId: string) => {
    const updatedFiles = uploadedFiles.filter(f => f.id !== fileId);
    setUploadedFiles(updatedFiles);
    onFilesProcessed(updatedFiles);
    
    toast({
      title: "File Removed",
      description: "File has been removed from analysis"
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'processing':
        return <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      default:
        return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive 
                ? 'border-blue-400 bg-blue-500/10' 
                : 'border-gray-600 hover:border-gray-500'
              }
              ${isProcessing ? 'pointer-events-none opacity-50' : ''}
            `}
          >
            <input {...getInputProps()} />
            
            {isProcessing ? (
              <div className="space-y-4">
                <Loader2 className="h-12 w-12 text-blue-400 mx-auto animate-spin" />
                <div>
                  <p className="text-white font-medium">Processing with Claude AI...</p>
                  <p className="text-gray-400 text-sm mt-1">Extracting and analyzing document content</p>
                </div>
                <div className="max-w-xs mx-auto">
                  <Progress value={processingProgress} className="h-2" />
                  <p className="text-xs text-gray-400 mt-1">{Math.round(processingProgress)}% complete</p>
                </div>
              </div>
            ) : isDragActive ? (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-blue-400 mx-auto" />
                <div>
                  <p className="text-white font-medium">Drop files here</p>
                  <p className="text-gray-400 text-sm">Files will be processed by Claude AI</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-white font-medium">Upload Documents for AI Analysis</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Drag and drop files here, or click to select
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    Supports: PDF, DOCX, TXT, MD • Max {maxFiles} files • {Math.round(maxSize / 1024 / 1024)}MB each
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Select Files
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-white font-medium mb-4">
              Processed Documents ({uploadedFiles.length}/{maxFiles})
            </h3>
            
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {getStatusIcon(file.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{file.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-gray-400 text-xs">
                          {file.metadata.wordCount} words
                        </span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            file.status === 'completed' ? 'border-green-400 text-green-400' :
                            file.status === 'error' ? 'border-red-400 text-red-400' :
                            'border-blue-400 text-blue-400'
                          }`}
                        >
                          {file.metadata.topic}
                        </Badge>
                        {file.status === 'completed' && (
                          <Badge variant="outline" className="text-xs border-cyan-400 text-cyan-400">
                            {file.metadata.confidenceScore}% confidence
                          </Badge>
                        )}
                      </div>
                      {file.error && (
                        <p className="text-red-400 text-xs mt-1">{file.error}</p>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="text-gray-400 hover:text-red-400 ml-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RealUploadArea;
