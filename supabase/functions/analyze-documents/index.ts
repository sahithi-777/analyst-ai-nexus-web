
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { files } = await req.json();
    
    if (!anthropicApiKey) {
      throw new Error('Anthropic API key not configured');
    }

    console.log(`Analyzing ${files.length} documents with Claude`);

    // Prepare document context for Claude
    const documentContext = files.map(file => `
Document: ${file.name}
Content: ${file.extractedText}
Metadata: ${JSON.stringify(file.metadata, null, 2)}
---
    `).join('\n');

    const analysisPrompt = `
You are an expert document analyst. Analyze the following documents and provide a comprehensive analysis in JSON format.

Documents to analyze:
${documentContext}

Please provide your analysis in this exact JSON structure:
{
  "summary": {
    "totalDocuments": ${files.length},
    "totalWords": <calculated_total>,
    "avgConfidenceScore": <calculated_avg>,
    "primaryTopics": ["topic1", "topic2", ...],
    "documentTypes": {"type1": count, "type2": count},
    "keyInsights": [
      {
        "insight": "detailed insight text",
        "confidence": 85,
        "sourceDocuments": ["doc1.pdf"],
        "category": "trend|finding|recommendation|risk"
      }
    ]
  },
  "connections": [
    {
      "documents": ["doc1.pdf", "doc2.pdf"],
      "relationshipType": "complementary|contradictory|sequential|supporting",
      "strength": 85,
      "description": "detailed description",
      "evidence": ["evidence1", "evidence2"]
    }
  ],
  "timeline": [
    {
      "date": "2024-01-15",
      "event": "event description",
      "documents": ["doc1.pdf"],
      "importance": "high|medium|low",
      "category": "category name"
    }
  ],
  "contradictions": [
    {
      "documents": ["doc1.pdf", "doc2.pdf"],
      "issue": "contradiction description",
      "severity": "critical|moderate|minor",
      "description": "detailed explanation",
      "recommendation": "suggested resolution"
    }
  ],
  "gaps": [
    {
      "area": "missing area",
      "description": "what's missing",
      "priority": "high|medium|low",
      "suggestedSources": ["suggestion1", "suggestion2"]
    }
  ],
  "statistics": {
    "totalDocuments": ${files.length},
    "totalWords": <calculated_total>,
    "avgAnalysisDepth": <percentage>,
    "processingTime": "Xs",
    "lastAnalyzed": "${new Date().toISOString()}"
  }
}

Focus on:
1. Real insights based on actual document content
2. Identifying genuine patterns and relationships
3. Finding actual contradictions or gaps
4. Providing actionable recommendations
5. Creating realistic timelines from document dates/content
`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anthropicApiKey}`,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: analysisPrompt
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', errorText);
      throw new Error(`Anthropic API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const analysisText = data.content[0].text;
    
    // Parse the JSON response from Claude
    let analysisResults;
    try {
      analysisResults = JSON.parse(analysisText);
    } catch (parseError) {
      console.error('Failed to parse Claude response as JSON:', analysisText);
      throw new Error('Failed to parse analysis results');
    }

    console.log('Analysis completed successfully');

    return new Response(JSON.stringify(analysisResults), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-documents function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Failed to analyze documents with Claude'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
