
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
    const { message, documents, chatHistory } = await req.json();
    
    if (!anthropicApiKey) {
      throw new Error('Anthropic API key not configured');
    }

    console.log(`Processing chat message with ${documents.length} documents context`);

    // Prepare document context
    const documentContext = documents.map(doc => `
Document: ${doc.name}
Content: ${doc.extractedText || doc.content}
Topic: ${doc.metadata?.topic || 'Unknown'}
Category: ${doc.metadata?.category || 'Unknown'}
---
    `).join('\n');

    // Prepare chat history
    const historyContext = chatHistory.map(msg => 
      `${msg.sender === 'user' ? 'Human' : 'Assistant'}: ${msg.text}`
    ).join('\n');

    const chatPrompt = `
You are an expert research assistant analyzing documents. You have access to the following documents:

${documentContext}

Previous conversation:
${historyContext}

Current question: ${message}

Please provide a helpful, accurate response based on the document content. When referencing specific information, mention which document it comes from. If you find contradictions or interesting connections between documents, highlight them. Be conversational but professional.

If the question requires information not available in the documents, say so clearly and suggest what additional information might be helpful.
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
        max_tokens: 1500,
        messages: [
          {
            role: 'user',
            content: chatPrompt
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
    const aiResponse = data.content[0].text;

    console.log('Chat response generated successfully');

    return new Response(JSON.stringify({ 
      response: aiResponse,
      model: 'claude-3-5-sonnet-20241022'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-with-documents function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      fallbackResponse: "I'm sorry, I'm having trouble processing your request right now. Please try again."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
