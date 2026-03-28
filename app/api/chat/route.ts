export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Invalid messages array provided' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const aiModel = process.env.MODEL || 'nvidia/nemotron-3-super-120b-a12b:free';
    const baseUrl = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';

    if (!apiKey) {
      console.error('Missing OPENROUTER_API_KEY in environment variables');
      return Response.json({ error: 'System configuration error' }, { status: 500 });
    }

    // Use robust URL construction for the API endpoint
    // This ensures that even if baseUrl doesn't end with a slash, chat/completions is appended correctly
    const sanitizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const endpoint = baseUrl.toLowerCase().includes('chat/completions') 
      ? baseUrl 
      : new URL('chat/completions', sanitizedBaseUrl).toString();

    // Prepare structured system message
    const systemMessage = {
      role: 'system',
      content: 'You are a helpful AI assistant. Always respond in clear, grammatically correct English.'
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", // Required for OpenRouter optionally
        "X-Title": "ChatBox Application" // Optional but good for OpenRouter
      },
      body: JSON.stringify({
        model: aiModel,
        messages: [systemMessage, ...messages]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('AI Provider Error:', errorData);
      return Response.json(
        { error: 'The AI provider returned an error. Please try again later.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('Malformed response from AI provider');
    }

    return Response.json({ text: content });
  } catch (error: unknown) {
    console.error('Chat API Internal Error:', error);
    return Response.json(
      { error: 'An unexpected internal error occurred' },
      { status: 500 }
    );
  }
}
