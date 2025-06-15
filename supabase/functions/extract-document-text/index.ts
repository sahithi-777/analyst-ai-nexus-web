
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
    const { fileName, fileType, fileContent } = await req.json();
    
    if (!anthropicApiKey) {
      throw new Error('Anthropic API key not configured');
    }

    console.log(`Extracting text and metadata from ${fileName}`);

    // For now, we'll enhance the text content analysis using Claude
    // In a full implementation, you'd add PDF/DOCX parsing libraries
    
    const analysisPrompt = `
You are a document analysis expert. Analyze this document and extract key information:

File Name: ${fileName}
File Type: ${fileType}
Content: ${fileContent}

Please provide your analysis in this exact JSON format:
{
  "extractedText": "cleaned and formatted text content",
  "metadata": {
    "wordCount": <actual_word_count>,
    "pageCount": <estimated_pages>,
    "language": "detected_language",
    "author": "extracted_or_inferred_author",
    "topic": "main_topic",
    "category": "document_category",
    "keywords": ["keyword1", "keyword2", "keyword3"],
    "confidenceScore": <analysis_confidence_0_to_100>,
    "summary": "brief_document_summary"
  }
}

For the category, choose from: "Business Intelligence", "Finance", "Technology", "Strategy", "Operations", "Research", "Legal", "Marketing", "HR", "Miscellaneous"

For the topic, provide a specific, descriptive topic based on the actual content.
For keywords, extract the most relevant terms from the content.
Confidence score should reflect how well you could analyze the document (higher for clear, well-structured content).
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
            content: analysisPrompt
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
    const analysisText = data.content[0].text;
    
    let extractionResults;
    try {
      extractionResults = JSON.parse(analysisText);
    } catch (parseError) {
      console.error('Failed to parse Claude response:', analysisText);
      // Fallback to basic extraction
      extractionResults = {
        extractedText: fileContent,
        metadata: {
          wordCount: fileContent.split(/\s+/).length,
          pageCount: Math.ceil(fileContent.split(/\s+/).length / 250),
          language: 'en',
          author: 'Unknown',
          topic: 'Document Analysis',
          category: 'Miscellaneous',
          keywords: ['document', 'analysis'],
          confidenceScore: 60,
          summary: 'Document processed for analysis'
        }
      };
    }

    console.log('Text extraction completed successfully');

    return new Response(JSON.stringify(extractionResults), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in extract-document-text function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      extractedText: '',
      metadata: {
        wordCount: 0,
        pageCount: 0,
        language: 'en',
        author: 'Unknown',
        topic: 'Error',
        category: 'Miscellaneous',
        keywords: [],
        confidenceScore: 0,
        summary: 'Failed to process document'
      }
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
