
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
    
    console.log(`Received chat request: "${message}" with ${documents?.length || 0} documents`);
    
    if (!anthropicApiKey) {
      console.error('ANTHROPIC_API_KEY not found in environment variables');
      return new Response(JSON.stringify({ 
        error: 'Anthropic API key not configured',
        fallbackResponse: "I'm currently unable to connect to Claude AI due to missing API key configuration. Please check the Supabase Edge Function Secrets to ensure ANTHROPIC_API_KEY is properly set."
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ 
        error: 'Invalid message parameter',
        fallbackResponse: "I didn't receive a valid question. Please try asking your question again."
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Processing chat message with ${documents?.length || 0} documents context`);

    // Prepare document context with better formatting
    const documentContext = (documents || []).map((doc, index) => {
      const content = doc.extractedText || doc.content || '';
      const metadata = doc.metadata || {};
      
      return `
Document ${index + 1}: ${doc.name || 'Unnamed Document'}
Topic: ${metadata.topic || 'Unknown'}
Category: ${metadata.category || 'Unknown'}
Word Count: ${metadata.wordCount || 'Unknown'}

Content Preview:
${content.substring(0, 2000)}${content.length > 2000 ? '...' : ''}

---`;
    }).join('\n');

    // Prepare chat history with better formatting
    const historyContext = (chatHistory || []).map(msg => 
      `${msg.sender === 'user' ? 'Human' : 'Assistant'}: ${msg.text}`
    ).join('\n');

    const chatPrompt = `You are Claude, an expert research assistant analyzing documents. You have access to the following documents:

${documentContext}

Previous conversation:
${historyContext}

Current question: ${message}

Please provide a helpful, accurate, and detailed response based on the document content. When referencing specific information, mention which document it comes from. If you find contradictions or interesting connections between documents, highlight them clearly. 

Be conversational but professional. Use formatting like bullet points, headings, and emphasis where appropriate to make your response easy to read.

If the question requires information not available in the documents, say so clearly and suggest what additional information might be helpful.

Focus on being practical and actionable in your insights.`;

    console.log('Sending request to Anthropic API...');

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
        temperature: 0.7,
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
      console.error('Anthropic API error:', response.status, errorText);
      
      let errorMessage = `Anthropic API error: ${response.status}`;
      let fallbackMessage = "I'm having trouble connecting to Claude AI right now. Please try again in a moment.";
      
      if (response.status === 401) {
        errorMessage = 'Invalid Anthropic API key';
        fallbackMessage = "The API key appears to be invalid. Please check the ANTHROPIC_API_KEY in Supabase Edge Function Secrets.";
      } else if (response.status === 429) {
        errorMessage = 'Rate limit exceeded';
        fallbackMessage = "Too many requests to Claude AI. Please wait a moment before trying again.";
      } else if (response.status >= 500) {
        errorMessage = 'Anthropic service unavailable';
        fallbackMessage = "Claude AI service is temporarily unavailable. Please try again later.";
      }
      
      return new Response(JSON.stringify({ 
        error: errorMessage,
        fallbackResponse: fallbackMessage
      }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    
    if (!data.content || !data.content[0] || !data.content[0].text) {
      console.error('Unexpected response format from Anthropic:', data);
      return new Response(JSON.stringify({ 
        error: 'Invalid response format from Anthropic',
        fallbackResponse: "I received an unexpected response format. Please try your question again."
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const aiResponse = data.content[0].text;
    console.log('Chat response generated successfully, length:', aiResponse.length);

    return new Response(JSON.stringify({ 
      response: aiResponse,
      model: 'claude-3-5-sonnet-20241022',
      usage: data.usage || {}
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-with-documents function:', error);
    console.error('Error stack:', error.stack);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      fallbackResponse: "I'm experiencing technical difficulties. Please try your question again."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
