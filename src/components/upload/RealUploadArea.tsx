
import React, { useState } from 'react';
import { Upload, FileText, X, Link, AlertCircle, CheckCircle, File, FileImage, FileSpreadsheet, Eye, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { RealProcessedFile, RealAiProcessor } from '@/utils/realAiProcessor';

interface UploadedFile {
  id: string;
  file?: File;
  url?: string;
  name: string;
  size?: number;
  type: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
  processedData?: RealProcessedFile;
}

interface RealUploadAreaProps {
  onFilesProcessed?: (files: RealProcessedFile[]) => void;
}

const RealUploadArea = ({ onFilesProcessed }: RealUploadAreaProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [processedFiles, setProcessedFiles] = useState<RealProcessedFile[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const { toast } = useToast();

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ACCEPTED_FILE_TYPES = ['.pdf', '.csv', '.txt', '.docx', '.doc'];

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return FileText;
    if (type.includes('csv') || type.includes('excel')) return FileSpreadsheet;
    if (type.includes('image')) return FileImage;
    if (type === 'url') return Link;
    return File;
  };

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds 10MB limit`;
    }
    
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ACCEPTED_FILE_TYPES.includes(fileExtension)) {
      return `File type not supported. Allowed types: ${ACCEPTED_FILE_TYPES.join(', ')}`;
    }
    
    return null;
  };

  const processAndUploadFile = async (fileId: string, file: File): Promise<void> => {
    try {
      setUploadedFiles(prev => 
        prev.map(f => f.id === fileId ? { ...f, status: 'processing', progress: 50 } : f)
      );

      const processedData = await RealAiProcessor.processFile(file);
      
      setUploadedFiles(prev => 
        prev.map(f => f.id === fileId ? { 
          ...f, 
          status: processedData.status === 'error' ? 'error' : 'completed',
          progress: 100,
          processedData,
          error: processedData.error
        } : f)
      );

      if (processedData.status === 'completed') {
        const updatedFiles = [...processedFiles, processedData];
        setProcessedFiles(updatedFiles);
        onFilesProcessed?.(updatedFiles);
        
        toast({
          title: "File Processed Successfully",
          description: `${file.name} has been processed and is ready for analysis.`,
        });
      } else {
        toast({
          title: "Processing Failed",
          description: `Failed to process ${file.name}: ${processedData.error}`,
          variant: "destructive"
        });
      }
    } catch (error) {
      setUploadedFiles(prev => 
        prev.map(f => f.id === fileId ? { 
          ...f, 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Processing failed' 
        } : f)
      );
      
      toast({
        title: "Processing Error",
        description: `An error occurred while processing ${file.name}`,
        variant: "destructive"
      });
    }
  };

  const handleFiles = async (files: File[]) => {
    const newFiles: UploadedFile[] = [];
    
    for (const file of files) {
      const validation = validateFile(file);
      const fileId = `file-${Date.now()}-${Math.random()}`;
      
      if (validation) {
        newFiles.push({
          id: fileId,
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          status: 'error',
          error: validation
        });
        toast({
          title: "Upload Error",
          description: `${file.name}: ${validation}`,
          variant: "destructive"
        });
      } else {
        newFiles.push({
          id: fileId,
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          status: 'uploading'
        });
      }
    }
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    newFiles
      .filter(f => f.status === 'uploading' && f.file)
      .forEach(async (uploadFile) => {
        await processAndUploadFile(uploadFile.id, uploadFile.file!);
      });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const removeFile = (id: string) => {
    const fileToRemove = uploadedFiles.find(f => f.id === id);
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
    
    if (fileToRemove?.processedData) {
      const updatedFiles = processedFiles.filter(f => f.id !== fileToRemove.processedData!.id);
      setProcessedFiles(updatedFiles);
      onFilesProcessed?.(updatedFiles);
    }
    
    toast({
      title: "File Removed",
      description: "File has been removed from the upload list.",
    });
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-blue-500 bg-blue-500/10 scale-[1.02]' 
            : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/30'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <Upload className="h-8 w-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Upload Research Documents</h3>
            <p className="text-gray-400 mb-3">
              Drag and drop files or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports PDF, CSV, TXT, DOCX files up to 10MB each
            </p>
          </div>

          <Button
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Choose Files
          </Button>
        </div>

        <input
          id="file-upload"
          type="file"
          multiple
          accept={ACCEPTED_FILE_TYPES.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* File List */}
      {uploadedFiles.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h4 className="text-white font-medium mb-4">Uploaded Files ({uploadedFiles.length})</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {uploadedFiles.map((uploadedFile) => {
              const IconComponent = getFileIcon(uploadedFile.type);
              return (
                <div
                  key={uploadedFile.id}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded-lg group hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      {uploadedFile.status === 'completed' && (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      )}
                      {uploadedFile.status === 'error' && (
                        <AlertCircle className="h-5 w-5 text-red-400" />
                      )}
                      {uploadedFile.status === 'processing' && (
                        <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
                      )}
                      {uploadedFile.status === 'uploading' && (
                        <IconComponent className="h-5 w-5 text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {uploadedFile.name}
                      </p>
                      <div className="flex items-center space-x-2 text-xs">
                        {uploadedFile.size && (
                          <span className="text-gray-400">{formatFileSize(uploadedFile.size)}</span>
                        )}
                        {uploadedFile.status === 'processing' && (
                          <span className="text-blue-400">Processing with Claude...</span>
                        )}
                        {uploadedFile.status === 'completed' && uploadedFile.processedData && (
                          <span className="text-green-400">
                            {uploadedFile.processedData.metadata.wordCount} words • Ready for analysis
                          </span>
                        )}
                        {uploadedFile.status === 'error' && uploadedFile.error && (
                          <span className="text-red-400">{uploadedFile.error}</span>
                        )}
                      </div>
                      {(uploadedFile.status === 'uploading' || uploadedFile.status === 'processing') && (
                        <div className="mt-2">
                          <Progress value={uploadedFile.progress} className="h-2 bg-gray-600" />
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(uploadedFile.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-all"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RealUploadArea;
