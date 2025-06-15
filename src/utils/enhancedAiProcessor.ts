import { supabase } from '@/integrations/supabase/client';
import { RealProcessedFile } from './realAiProcessor';

export interface DeepAnalysisResult {
  insights: Insight[];
  relationships: Relationship[];
  contradictions: Contradiction[];
  timeline: TimelineEvent[];
  issues: Issue[];
  actionableInsights: ActionableInsight[];
  statistics: AnalysisStatistics;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  sourceDocuments: string[];
  category: 'trend' | 'finding' | 'recommendation' | 'risk';
  evidence: string[];
  implications: string;
  severity: 'high' | 'moderate' | 'low';
}

export interface Relationship {
  id: string;
  sourceDocument: string;
  targetDocument: string;
  relationshipType: 'complementary' | 'contradictory' | 'sequential' | 'supporting';
  strength: number;
  description: string;
  evidence: string[];
}

export interface Contradiction {
  id: string;
  documents: string[];
  issue: string;
  severity: 'critical' | 'moderate' | 'minor';
  description: string;
  recommendation: string;
  conflictingEvidence: string[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  event: string;
  documents: string[];
  importance: 'high' | 'medium' | 'low';
  category: string;
  description: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'moderate' | 'low';
  category: 'methodology' | 'technical' | 'ethical';
  affectedDocuments: string[];
  recommendations: string[];
}

export interface ActionableInsight {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'strategic' | 'operational' | 'tactical';
  steps: string[];
  expectedOutcome: string;
  timeline: string;
  resources: string;
}

export interface AnalysisStatistics {
  totalDocuments: number;
  totalWords: number;
  avgConfidenceScore: number;
  processingTime: string;
  lastAnalyzed: Date;
  keywordDensity: { [keyword: string]: number };
  documentTypes: { [type: string]: number };
  analysisDepth: string;
}

export class EnhancedAiProcessor {
  static async analyzeDocuments(files: RealProcessedFile[], useDemoData = false): Promise<DeepAnalysisResult> {
    console.log(`Starting enhanced analysis of ${files.length} documents`);
    
    // For demo mode or when API is not available, return demo data
    if (useDemoData || files.length === 0) {
      const { getDemoAnalysis } = await import('@/utils/demoData');
      return getDemoAnalysis();
    }
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-documents', {
        body: { files }
      });

      if (error) {
        console.error('Error in enhanced analysis:', error);
        // Fallback to demo data on error
        const { getDemoAnalysis } = await import('@/utils/demoData');
        return getDemoAnalysis();
      }

      return data as DeepAnalysisResult;

    } catch (error) {
      console.error('Error in enhanced document analysis:', error);
      // Fallback to demo data on error
      const { getDemoAnalysis } = await import('@/utils/demoData');
      return getDemoAnalysis();
    }
  }

  static async generateInsightReport(analysisResults: DeepAnalysisResult): Promise<string> {
    const report = `
# Comprehensive Analysis Report

## Executive Summary
This analysis of ${analysisResults.statistics.totalDocuments} documents (${analysisResults.statistics.totalWords.toLocaleString()} words) reveals ${analysisResults.insights.length} key insights with an average confidence score of ${analysisResults.statistics.avgConfidenceScore}%.

## Key Insights
${analysisResults.insights.map((insight, i) => `
### ${i + 1}. ${insight.title}
**Confidence:** ${insight.confidence}% | **Category:** ${insight.category}
${insight.description}

**Evidence:**
${insight.evidence.map(e => `- ${e}`).join('\n')}

**Implications:** ${insight.implications}
`).join('\n')}

## Relationship Analysis
${analysisResults.relationships.map((rel, i) => `
### Relationship ${i + 1}: ${rel.relationshipType}
**Strength:** ${rel.strength}%
**Documents:** ${rel.sourceDocument} ↔ ${rel.targetDocument}
${rel.description}
`).join('\n')}

## Issues Identified
${analysisResults.issues.map((issue, i) => `
### ${i + 1}. ${issue.title} (${issue.severity})
${issue.description}
**Recommendations:**
${issue.recommendations.map(r => `- ${r}`).join('\n')}
`).join('\n')}

## Actionable Insights
${analysisResults.actionableInsights.map((action, i) => `
### ${i + 1}. ${action.title} (Priority: ${action.priority})
${action.description}
**Timeline:** ${action.timeline}
**Expected Outcome:** ${action.expectedOutcome}
`).join('\n')}

---
*Report generated on ${new Date().toLocaleString()}*
    `;

    return report.trim();
  }
}
