
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

    console.log(`Generating research questions for ${files?.length || 0} documents${url ? ' and URL' : ''}`);

    // Prepare document context
    let documentContext = '';
    if (files && files.length > 0) {
      documentContext = files.map(file => `
Document: ${file.name}
Content: ${file.extractedText || file.content}
Topic: ${file.metadata?.topic || 'Unknown'}
Category: ${file.metadata?.category || 'Unknown'}
Keywords: ${file.metadata?.keywords?.join(', ') || 'None'}
---
      `).join('\n');
    }

    // Prepare URL context if provided
    let urlContext = '';
    if (url) {
      try {
        // Fetch URL content (simplified - in production you'd want proper web scraping)
        urlContext = `\nURL Source: ${url}\nNote: URL content analysis requested\n---\n`;
      } catch (error) {
        console.warn('Could not fetch URL content:', error);
        urlContext = `\nURL Source: ${url}\nNote: URL provided for context\n---\n`;
      }
    }

    const questionPrompt = `
You are an expert research assistant and question generator. Based on the provided content, generate intelligent research questions that would help researchers deeply understand and explore the material.

Content to analyze:
${documentContext}
${urlContext}

Generate exactly 12 diverse research questions in the following JSON format:
{
  "questions": [
    {
      "question": "specific, actionable research question",
      "type": "analytical|comparative|exploratory",
      "difficulty": "beginner|intermediate|advanced",
      "category": "methodology|theory|application|evaluation",
      "rationale": "why this question is important and what insights it could reveal",
      "estimatedTime": "estimated time to research this question",
      "sourceDocuments": ["list of relevant document names"],
      "templates": ["related question templates"]
    }
  ]
}

Question Types:
- analytical: Questions that require deep analysis, breaking down components, examining relationships
- comparative: Questions that compare different approaches, theories, or findings
- exploratory: Questions that open new research directions or investigate unexplored areas

Difficulty Levels:
- beginner: Questions accessible to newcomers, focusing on basic understanding
- intermediate: Questions requiring some domain knowledge and analytical thinking
- advanced: Complex questions requiring deep expertise and sophisticated analysis

Categories:
- methodology: Questions about research methods, data collection, analysis techniques
- theory: Questions about theoretical frameworks, concepts, models
- application: Questions about practical implementation, real-world applications
- evaluation: Questions about assessment, effectiveness, impact, validation

Guidelines:
1. Make questions specific and actionable
2. Ensure questions are relevant to the actual content provided
3. Vary the types, difficulties, and categories
4. Include clear rationales explaining the value of each question
5. Provide realistic time estimates (e.g., "2-3 hours", "1-2 weeks", "3-4 days")
6. Reference specific documents when relevant
7. Create questions that would lead to meaningful insights

Focus on generating questions that would:
- Reveal hidden patterns or connections
- Challenge assumptions
- Explore gaps in knowledge
- Compare different perspectives
- Evaluate effectiveness or validity
- Suggest new research directions
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
        max_tokens: 3000,
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
    const questionsText = data.content[0].text;
    
    let questionResults;
    try {
      questionResults = JSON.parse(questionsText);
    } catch (parseError) {
      console.error('Failed to parse Claude response as JSON:', questionsText);
      // Fallback with basic questions
      questionResults = {
        questions: [
          {
            question: "What are the main themes and concepts presented in the documents?",
            type: "analytical",
            difficulty: "beginner",
            category: "theory",
            rationale: "Understanding core themes helps establish foundational knowledge",
            estimatedTime: "1-2 hours",
            sourceDocuments: files?.map(f => f.name) || [],
            templates: []
          },
          {
            question: "How do different documents compare in their approach to the subject matter?",
            type: "comparative",
            difficulty: "intermediate",
            category: "methodology",
            rationale: "Comparing approaches reveals different perspectives and methodologies",
            estimatedTime: "3-4 hours",
            sourceDocuments: files?.map(f => f.name) || [],
            templates: []
          }
        ]
      };
    }

    console.log(`Generated ${questionResults.questions?.length || 0} research questions`);

    return new Response(JSON.stringify(questionResults), {
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
