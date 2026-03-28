#  AI Chatbox

A production-quality chat application built with Next.js App Router, Redux Toolkit, and the Vercel AI SDK.

## Features
- **Premium UI**: Fluid glassmorphic UI built with Tailwind CSS v4.
- **State Management**: Full conversation history persisted via Redux Toolkit and `localStorage`.
- **View Transitions**: Stunning circular expanding dark mode toggle using the native Browser View Transitions API.
- **Markdown Support**: Rich-text and code-block parsing via `react-markdown`.
- **Multi-Model Support**: Integration with various AI providers including OpenAI, Claude, and OpenRouter for a versatile chat experience.
- **Responsive Design**: Fluid, glassmorphic UI optimized for desktop, tablet, and mobile devices.

## Getting Started

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Copy the `.env.example` to `.env` and configure your API provider. You will need to set the `OPENROUTER_API_KEY`, `OPENROUTER_BASE_URL`, and `MODEL` variables.

To use OpenAI directly, set them as follows:
```bash
OPENROUTER_API_KEY=sk-proj-... # Your Official OpenAI Secret Key
OPENROUTER_BASE_URL=https://api.openai.com/v1
MODEL=gpt-4o-mini
```

Or, to use OpenRouter (default), set them as follows:
```bash
OPENROUTER_API_KEY=sk-or-v1-... # Your OpenRouter API Key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
MODEL=nvidia/nemotron-3-super-120b-a12b:free
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.
