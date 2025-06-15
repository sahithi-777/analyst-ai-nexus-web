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
  static async processFile(file: File, useDemoData = false): Promise<RealProcessedFile> {
    console.log(`Processing file: ${file.name}`);
    
    // For demo mode, return demo data
    if (useDemoData) {
      const { getDemoFiles } = await import('@/utils/demoData');
      const demoFiles = getDemoFiles();
      return demoFiles[0]; // Return first demo file as template
    }
    
    try {
      // Read file content
      const content = await this.readFileContent(file);
      
      // Try to extract text and metadata using Claude
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

  static async analyzeDocuments(files: RealProcessedFile[], useDemoData = false): Promise<RealAnalysisResult> {
    console.log(`Analyzing ${files.length} documents with Claude`);
    
    // For demo mode or when API fails, return demo data
    if (useDemoData || files.length === 0) {
      const { getDemoAnalysis } = await import('@/utils/demoData');
      const demoAnalysis = getDemoAnalysis();
      
      // Convert to RealAnalysisResult format
      return {
        summary: {
          totalDocuments: demoAnalysis.statistics.totalDocuments,
          totalWords: demoAnalysis.statistics.totalWords,
          avgConfidenceScore: demoAnalysis.statistics.avgConfidenceScore,
          primaryTopics: Object.keys(demoAnalysis.statistics.keywordDensity),
          documentTypes: demoAnalysis.statistics.documentTypes,
          keyInsights: demoAnalysis.insights.map(insight => ({
            insight: insight.title,
            confidence: insight.confidence,
            sourceDocuments: insight.sourceDocuments,
            category: insight.category as 'trend' | 'finding' | 'recommendation' | 'risk'
          }))
        },
        connections: demoAnalysis.relationships.map(rel => ({
          documents: [rel.sourceDocument, rel.targetDocument],
          relationshipType: rel.relationshipType as 'complementary' | 'contradictory' | 'sequential' | 'supporting',
          strength: rel.strength,
          description: rel.description,
          evidence: rel.evidence
        })),
        timeline: demoAnalysis.timeline.map(event => ({
          date: event.date,
          event: event.event,
          documents: event.documents,
          importance: event.importance as 'high' | 'medium' | 'low',
          category: event.category
        })),
        contradictions: demoAnalysis.contradictions.map(contra => ({
          documents: contra.documents,
          issue: contra.issue,
          severity: contra.severity as 'critical' | 'moderate' | 'minor',
          description: contra.description,
          recommendation: contra.recommendation
        })),
        gaps: demoAnalysis.issues.map(issue => ({
          area: issue.title,
          description: issue.description,
          priority: issue.severity === 'high' ? 'high' as const : 
                   issue.severity === 'moderate' ? 'medium' as const : 'low' as const,
          suggestedSources: issue.recommendations
        })),
        statistics: {
          totalDocuments: demoAnalysis.statistics.totalDocuments,
          totalWords: demoAnalysis.statistics.totalWords,
          avgAnalysisDepth: demoAnalysis.statistics.avgConfidenceScore,
          processingTime: demoAnalysis.statistics.processingTime,
          lastAnalyzed: demoAnalysis.statistics.lastAnalyzed
        }
      };
    }
    
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
    chatHistory: Array<{sender: string, text: string}>,
    useDemoData = false
  ): Promise<string> {
    console.log('Sending message to Claude for document-aware chat');
    
    // For demo mode, provide demo responses
    if (useDemoData || documents.length === 0) {
      const demoResponses = [
        "Based on the AI research methods document, I can see that 78% of researchers now use AI assistants for initial analysis, leading to a 35% reduction in research time. This aligns with the business intelligence framework's promise of 40% improvement in decision-making speed.",
        "The climate data analysis reveals concerning trends: global temperature has increased by 1.2°C since 1990, with polar regions experiencing twice the global average warming. This accelerated warming suggests we're approaching critical tipping points faster than previously predicted.",
        "Comparing the documents, there's a clear synergy between AI research methodologies and business intelligence applications. Both emphasize the importance of quality data, automated analysis, and human-AI collaboration for optimal results.",
        "The business intelligence framework addresses many of the data quality issues identified in climate research. Its proposed layered architecture with real-time processing and anomaly detection could significantly enhance environmental monitoring capabilities."
      ];
      
      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
      return `${randomResponse}\n\n*This is a demo response. In the full version, Claude AI would provide detailed analysis based on your specific documents.*`;
    }
    
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
