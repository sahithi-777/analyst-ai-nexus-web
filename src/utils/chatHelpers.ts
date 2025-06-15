
export const executeChatQuestion = async (question: string, processedFiles: any[]) => {
  try {
    const { supabase } = await import('@/integrations/supabase/client');
    
    const validFiles = processedFiles.filter(f => f.status === 'completed');
    
    console.log('Sending question to Claude:', question);
    console.log('With documents:', validFiles.length);
    
    const { data, error } = await supabase.functions.invoke('chat-with-documents', {
      body: {
        message: question,
        documents: validFiles,
        chatHistory: []
      }
    });

    if (error) {
      console.error('Error in chat:', error);
      throw error;
    }

    console.log('Claude response received:', data);
    return data.response || 'Sorry, I could not process your request.';
  } catch (error) {
    console.error('Error executing chat question:', error);
    return 'I apologize, but I\'m having trouble processing your request right now. Please check the console for details.';
  }
};
