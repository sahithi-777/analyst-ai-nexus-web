import React, { useState } from 'react';
import { Upload, FileText, X, Link, AlertCircle, CheckCircle, File, FileImage, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  id: string;
  file?: File;
  url?: string;
  name: string;
  size?: number;
  type: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

const UploadArea = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const { toast } = useToast();

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ACCEPTED_FILE_TYPES = ['.pdf', '.csv', '.txt', '.docx', '.doc', '.xlsx', '.xls'];

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return FileText;
    if (type.includes('spreadsheet') || type.includes('csv') || type.includes('excel')) return FileSpreadsheet;
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

  const simulateUpload = async (fileId: string): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadedFiles(prev => 
            prev.map(f => f.id === fileId ? { ...f, progress: 100, status: 'completed' } : f)
          );
          resolve();
        } else {
          setUploadedFiles(prev => 
            prev.map(f => f.id === fileId ? { ...f, progress: Math.round(progress) } : f)
          );
        }
      }, 200);
    });
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
      .filter(f => f.status === 'uploading')
      .forEach(async (file) => {
        try {
          await simulateUpload(file.id);
          toast({
            title: "Upload Successful",
            description: `${file.name} has been uploaded successfully.`,
          });
        } catch (error) {
          setUploadedFiles(prev => 
            prev.map(f => f.id === file.id ? { ...f, status: 'error', error: 'Upload failed' } : f)
          );
          toast({
            title: "Upload Failed",
            description: `Failed to upload ${file.name}`,
            variant: "destructive"
          });
        }
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

  const handleUrlAdd = () => {
    if (!urlInput.trim()) return;
    
    try {
      new URL(urlInput);
      const urlId = `url-${Date.now()}-${Math.random()}`;
      const newUrlFile: UploadedFile = {
        id: urlId,
        url: urlInput,
        name: urlInput,
        type: 'url',
        progress: 0,
        status: 'uploading'
      };
      
      setUploadedFiles(prev => [...prev, newUrlFile]);
      setUrlInput('');
      
      simulateUpload(urlId).then(() => {
        toast({
          title: "URL Added",
          description: `Successfully added URL for processing.`,
        });
      });
      
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive"
      });
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
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
    <div className="space-y-4">
      {/* Main Upload Zone - More Compact */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 max-h-64
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
            <h3 className="text-xl font-semibold text-white mb-2">
              Upload Research Documents
            </h3>
            <p className="text-gray-400 text-sm mb-3">
              Drag and drop your files here, or click to browse
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Supports PDF, CSV, TXT, DOCX, XLSX files up to 10MB each
            </p>
          </div>

          <Button
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2"
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

      {/* URL Input Section - More Compact and Inline */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Link className="h-5 w-5 text-cyan-400" />
            <span className="text-white font-medium">Add URL:</span>
          </div>
          <Input
            type="url"
            placeholder="https://example.com/article"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleUrlAdd()}
          />
          <Button
            onClick={handleUrlAdd}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 flex-shrink-0"
          >
            Add
          </Button>
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h4 className="text-lg font-semibold text-white mb-4">Uploaded Files ({uploadedFiles.length})</h4>
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
                      {uploadedFile.status === 'uploading' && (
                        <IconComponent className="h-5 w-5 text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {uploadedFile.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        {uploadedFile.size && (
                          <p className="text-xs text-gray-400">
                            {formatFileSize(uploadedFile.size)}
                          </p>
                        )}
                        {uploadedFile.status === 'error' && uploadedFile.error && (
                          <p className="text-xs text-red-400">{uploadedFile.error}</p>
                        )}
                      </div>
                      {uploadedFile.status === 'uploading' && (
                        <div className="mt-2">
                          <Progress 
                            value={uploadedFile.progress} 
                            className="h-1 bg-gray-600"
                          />
                          <p className="text-xs text-gray-400 mt-1">
                            {uploadedFile.progress}% uploaded
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(uploadedFile.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-all ml-2 flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
          
          {uploadedFiles.some(f => f.status === 'completed') && (
            <div className="mt-4 pt-3 border-t border-gray-600">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                Process Documents ({uploadedFiles.filter(f => f.status === 'completed').length} files)
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadArea;
