
import { supabase } from '@/integrations/supabase/client';
import { RealProcessedFile } from './realAiProcessor';

export interface GeneratedQuestion {
  question: string;
  type: 'analytical' | 'comparative' | 'exploratory';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'methodology' | 'theory' | 'application' | 'evaluation';
  rationale: string;
  estimatedTime: string;
  sourceDocuments?: string[];
  templates?: string[];
}

export interface QuestionFilters {
  type?: string;
  difficulty?: string;
  category?: string;
}

export class QuestionGeneratorService {
  static async generateQuestions(
    files: RealProcessedFile[], 
    url?: string
  ): Promise<GeneratedQuestion[]> {
    console.log(`Generating questions for ${files.length} documents${url ? ' and URL' : ''}`);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-research-questions', {
        body: { 
          files,
          url: url?.trim() || null
        }
      });

      if (error) {
        console.error('Error generating questions:', error);
        throw error;
      }

      return data.questions as GeneratedQuestion[];

    } catch (error) {
      console.error('Error in question generation:', error);
      throw new Error('Failed to generate research questions');
    }
  }

  static async fetchUrlContent(url: string): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('fetch-url-content', {
        body: { url }
      });

      if (error) {
        console.error('Error fetching URL content:', error);
        throw error;
      }

      return data.content || '';

    } catch (error) {
      console.error('Error fetching URL:', error);
      throw new Error('Failed to fetch URL content');
    }
  }

  static getQuestionTemplates(documentType: string, field: string): string[] {
    const templates: { [key: string]: string[] } = {
      'research': [
        'What methodology was used in {title}?',
        'How do the findings in {title} compare to existing literature?',
        'What are the limitations of the study presented in {title}?',
        'What future research directions are suggested by {title}?'
      ],
      'business': [
        'What are the key performance indicators mentioned in {title}?',
        'How does the strategy in {title} address market challenges?',
        'What risks are identified in {title} and how are they mitigated?',
        'What competitive advantages are highlighted in {title}?'
      ],
      'technology': [
        'What technical architecture is described in {title}?',
        'How does the solution in {title} scale?',
        'What security considerations are mentioned in {title}?',
        'What are the implementation challenges discussed in {title}?'
      ],
      'default': [
        'What are the main conclusions of {title}?',
        'How does {title} relate to current trends in the field?',
        'What evidence supports the claims in {title}?',
        'What questions remain unanswered after reading {title}?'
      ]
    };

    return templates[documentType.toLowerCase()] || templates['default'];
  }
}
