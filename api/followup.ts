import { executeFollowup } from '../src/server/searchService';
import { getRequestBody, sendJsonResponse } from '../src/server/httpHelper';

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (typeof res.status === 'function') {
      return res.status(200).end();
    }
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== 'POST') {
    return sendJsonResponse(res, 405, { error: 'Método não permitido. Utilize POST.' });
  }

  try {
    const body = await getRequestBody(req);
    const { question, partContext } = body;
    const result = await executeFollowup(question, partContext);
    return sendJsonResponse(res, 200, result);
  } catch (err: any) {
    console.error('Error in /api/followup:', err);
    return sendJsonResponse(res, 500, {
      error: err?.message || 'Erro ao processar dúvida técnica.',
    });
  }
}
