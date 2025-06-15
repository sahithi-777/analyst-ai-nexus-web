
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { files, url } = await req.json();
    
    if (!anthropicApiKey) {
      throw new Error('Anthropic API key not configured');
    }

    console.log(`Generating research questions for ${files.length} documents`);

    // Prepare document context
    const documentContext = files.map(file => `
Document: ${file.name}
Content: ${file.extractedText}
Topic: ${file.metadata?.topic || 'Unknown'}
Category: ${file.metadata?.category || 'Unknown'}
---
    `).join('\n');

    const urlContext = url ? `\nAdditional URL Context: ${url}` : '';

    const questionPrompt = `
You are a research question generation expert. Based on the following documents, generate intelligent research questions that would help researchers dive deeper into the content.

Documents:
${documentContext}
${urlContext}

Generate 8-12 research questions in this exact JSON format:
{
  "questions": [
    {
      "question": "specific research question text",
      "type": "analytical|comparative|exploratory",
      "difficulty": "beginner|intermediate|advanced", 
      "category": "methodology|theory|application|evaluation",
      "rationale": "why this question is important and what it explores",
      "estimatedTime": "X minutes",
      "sourceDocuments": ["document1.pdf", "document2.pdf"],
      "templates": ["template suggestions for answering"]
    }
  ]
}

Focus on:
1. Questions that reveal deeper insights about the research
2. Comparative analysis between different documents
3. Methodological exploration opportunities
4. Practical application possibilities
5. Areas that need further investigation
6. Theoretical implications of the findings

Make sure questions are:
- Specific and actionable
- Based on actual document content
- Varied in difficulty and type
- Thought-provoking and research-worthy
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
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: questionPrompt
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', errorText);
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const responseText = data.content[0].text;
    
    let questionsData;
    try {
      questionsData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse Claude response:', responseText);
      throw new Error('Failed to parse research questions');
    }

    console.log('Research questions generated successfully');

    return new Response(JSON.stringify(questionsData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-research-questions function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      questions: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
