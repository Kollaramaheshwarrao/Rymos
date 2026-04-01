# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your API keys in `.env`:
   - `JUDGE0_API_KEY`: Get from [RapidAPI Judge0](https://rapidapi.com/judge0-official/api/judge0-ce)
   - `GEMINI_API_KEY`: Get from [Google AI Studio](https://aistudio.google.com/)

## Deployment

### Vercel
1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from your `.env` file

### Local Development
```bash
npm install
npm run dev
```
