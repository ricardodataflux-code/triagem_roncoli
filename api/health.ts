import { sendJsonResponse } from '../src/server/httpHelper';

export default function handler(req: any, res: any) {
  const hasKey = Boolean(
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    process.env.API_KEY
  );

  return sendJsonResponse(res, 200, {
    status: 'ok',
    hasApiKey: hasKey,
    time: new Date().toISOString(),
  });
}
