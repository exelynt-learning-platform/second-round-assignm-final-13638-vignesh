export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Invalid messages' }, { status: 400 });
    }

    const aiModel = process.env.MODEL || 'nvidia/nemotron-3-super-120b-a12b:free';
    const baseUrl = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
    
    const prompt = `
You are a helpful AI assistant. Always respond in clear, grammatically correct English.

${messages
  .map((m: { role: string; content: string }) =>
    m.role === "user"
      ? `User: ${m.content}`
      : `Assistant: ${m.content}`
  )
  .join("\n")}

Assistant:
`;

    // Ensure the endpoint hits universal completions API to bypass custom provider quirks
    const endpoint = baseUrl.endsWith('/chat/completions') ? baseUrl : `${baseUrl}/chat/completions`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", // Required for OpenRouter optionally
        "X-Title": "ChatBox Application" // Optional but good for OpenRouter
      },
      body: JSON.stringify({
        model: aiModel,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'API Error');
    }

    return Response.json({ text: data.choices[0].message.content });
  } catch (error: unknown) {
    console.error('Chat API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred during the chat request';
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
