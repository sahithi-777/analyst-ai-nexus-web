
import { supabase } from '@/integrations/supabase/client';

export interface RealProcessedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string;
  extractedText: string;
  status: 'completed' | 'processing' | 'error';
  metadata: {
    wordCount: number;
    pageCount: number;
    language: string;
    author?: string;
    createdDate: Date;
    lastModified: Date;
    topic: string;
    category: string;
    keywords: string[];
    confidenceScore: number;
    summary?: string;
  };
  uploadedAt: Date;
  error?: string;
  preview: string;
}

export interface RealAnalysisResult {
  summary: {
    totalDocuments: number;
    totalWords: number;
    avgConfidenceScore: number;
    primaryTopics: string[];
    documentTypes: { [key: string]: number };
    keyInsights: Array<{
      insight: string;
      confidence: number;
      sourceDocuments: string[];
      category: 'trend' | 'finding' | 'recommendation' | 'risk';
    }>;
  };
  connections: Array<{
    documents: string[];
    relationshipType: 'complementary' | 'contradictory' | 'sequential' | 'supporting';
    strength: number;
    description: string;
    evidence: string[];
  }>;
  timeline: Array<{
    date: string;
    event: string;
    documents: string[];
    importance: 'high' | 'medium' | 'low';
    category: string;
  }>;
  contradictions: Array<{
    documents: string[];
    issue: string;
    severity: 'critical' | 'moderate' | 'minor';
    description: string;
    recommendation: string;
  }>;
  gaps: Array<{
    area: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    suggestedSources: string[];
  }>;
  statistics: {
    totalDocuments: number;
    totalWords: number;
    avgAnalysisDepth: number;
    processingTime: string;
    lastAnalyzed: Date;
  };
}

export class RealAiProcessor {
  static async processFile(file: File): Promise<RealProcessedFile> {
    console.log(`Processing file: ${file.name}`);
    
    try {
      // Read file content
      const content = await this.readFileContent(file);
      
      // Extract text and metadata using Claude
      const { data, error } = await supabase.functions.invoke('extract-document-text', {
        body: {
          fileName: file.name,
          fileType: file.type,
          fileContent: content
        }
      });

      if (error) {
        console.error('Error extracting document text:', error);
        throw error;
      }

      const { extractedText, metadata } = data;

      return {
        id: `file-${Date.now()}-${Math.random()}`,
        name: file.name,
        type: file.type,
        size: file.size,
        content,
        extractedText,
        status: 'completed',
        metadata: {
          ...metadata,
          createdDate: new Date(file.lastModified || Date.now()),
          lastModified: new Date(file.lastModified || Date.now()),
        },
        uploadedAt: new Date(),
        preview: extractedText.substring(0, 300) + '...'
      };

    } catch (error) {
      console.error('Error processing file:', error);
      return {
        id: `file-${Date.now()}-${Math.random()}`,
        name: file.name,
        type: file.type,
        size: file.size,
        content: '',
        extractedText: '',
        status: 'error',
        metadata: {
          wordCount: 0,
          pageCount: 0,
          language: 'en',
          createdDate: new Date(),
          lastModified: new Date(),
          topic: 'Error',
          category: 'Miscellaneous',
          keywords: [],
          confidenceScore: 0,
        },
        uploadedAt: new Date(),
        error: error.message || 'Failed to process file',
        preview: 'Error processing file'
      };
    }
  }

  private static async readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        resolve(content || '');
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }

  static async analyzeDocuments(files: RealProcessedFile[]): Promise<RealAnalysisResult> {
    console.log(`Analyzing ${files.length} documents with Claude`);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-documents', {
        body: { files }
      });

      if (error) {
        console.error('Error analyzing documents:', error);
        throw error;
      }

      return data as RealAnalysisResult;

    } catch (error) {
      console.error('Error in document analysis:', error);
      throw new Error('Failed to analyze documents with AI');
    }
  }

  static async chatWithDocuments(
    message: string, 
    documents: RealProcessedFile[], 
    chatHistory: Array<{sender: string, text: string}>
  ): Promise<string> {
    console.log('Sending message to Claude for document-aware chat');
    
    try {
      const { data, error } = await supabase.functions.invoke('chat-with-documents', {
        body: {
          message,
          documents,
          chatHistory
        }
      });

      if (error) {
        console.error('Error in chat:', error);
        throw error;
      }

      return data.response || data.fallbackResponse || 'Sorry, I could not process your request.';

    } catch (error) {
      console.error('Error in chat with documents:', error);
      return 'I apologize, but I\'m having trouble processing your request right now. Please try again.';
    }
  }
}
