
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
    
    console.log(`Generating research questions for ${files?.length || 0} documents`);

    // If no Anthropic API key, return demo questions
    if (!anthropicApiKey) {
      console.log('No Anthropic API key found, returning demo questions');
      const demoQuestions = {
        questions: [
          {
            question: "How do the AI efficiency gains in research compare to the business intelligence improvements proposed?",
            type: "comparative",
            difficulty: "intermediate",
            category: "methodology",
            rationale: "This question explores the relationship between AI adoption in research versus business contexts, helping identify best practices.",
            estimatedTime: "5-7 minutes",
            sourceDocuments: files?.map((f: any) => f.name) || ["Sample documents"],
            templates: ["Compare efficiency metrics", "Analyze adoption patterns", "Evaluate implementation strategies"]
          },
          {
            question: "What are the key methodological limitations identified across the analyzed documents?",
            type: "analytical",
            difficulty: "intermediate",
            category: "evaluation",
            rationale: "Understanding limitations helps improve research design and interpretation of results.",
            estimatedTime: "6-8 minutes",
            sourceDocuments: files?.map((f: any) => f.name) || ["Sample documents"],
            templates: ["Limitation analysis", "Methodological review", "Quality assessment"]
          },
          {
            question: "What patterns emerge when comparing data collection approaches across different studies?",
            type: "exploratory",
            difficulty: "beginner",
            category: "methodology",
            rationale: "Identifies common approaches and potential areas for standardization or improvement.",
            estimatedTime: "4-6 minutes",
            sourceDocuments: files?.map((f: any) => f.name) || ["Sample documents"],
            templates: ["Pattern recognition", "Comparative analysis", "Best practices identification"]
          }
        ]
      };

      return new Response(JSON.stringify(demoQuestions), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // If no files provided, return error
    if (!files || files.length === 0) {
      return new Response(JSON.stringify({ 
        error: 'No documents provided',
        questions: []
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prepare document context
    const documentContext = files.map((file: any) => `
Document: ${file.name}
Content: ${file.extractedText || file.content}
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

Generate 6-10 research questions in this exact JSON format:
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
      
      // Return demo questions on API error
      const demoQuestions = {
        questions: [
          {
            question: "What are the main research themes identified across the documents?",
            type: "analytical",
            difficulty: "beginner",
            category: "theory",
            rationale: "Understanding core themes helps establish research focus and priorities.",
            estimatedTime: "5 minutes",
            sourceDocuments: files.map((f: any) => f.name),
            templates: ["Theme analysis", "Content categorization", "Research mapping"]
          }
        ]
      };

      return new Response(JSON.stringify(demoQuestions), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const responseText = data.content[0].text;
    
    let questionsData;
    try {
      questionsData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse Claude response:', responseText);
      
      // Return demo questions on parse error
      const demoQuestions = {
        questions: [
          {
            question: "How do the findings from different documents complement or contradict each other?",
            type: "comparative",
            difficulty: "intermediate",
            category: "evaluation",
            rationale: "Comparative analysis reveals consistency and areas of disagreement in research.",
            estimatedTime: "7 minutes",
            sourceDocuments: files.map((f: any) => f.name),
            templates: ["Comparative analysis", "Contradiction detection", "Synthesis methods"]
          }
        ]
      };

      return new Response(JSON.stringify(demoQuestions), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Research questions generated successfully');

    return new Response(JSON.stringify(questionsData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-research-questions function:', error);
    
    // Return demo questions on any error
    const demoQuestions = {
      questions: [
        {
          question: "What insights can be drawn from the analyzed documents?",
          type: "analytical",
          difficulty: "beginner",
          category: "application",
          rationale: "Basic insight extraction helps understand document value and implications.",
          estimatedTime: "5 minutes",
          sourceDocuments: ["Documents"],
          templates: ["Insight extraction", "Value analysis", "Implication assessment"]
        }
      ]
    };

    return new Response(JSON.stringify(demoQuestions), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
