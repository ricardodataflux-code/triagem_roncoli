import { executePartSearch } from '../src/server/searchService';
import { getRequestBody, sendJsonResponse } from '../src/server/httpHelper';

export default async function handler(req: any, res: any) {
  // CORS preflight
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
    const result = await executePartSearch(body);
    return sendJsonResponse(res, 200, result);
  } catch (err: any) {
    console.error('Error in /api/search-part:', err);
    return sendJsonResponse(res, 500, {
      error: err?.message || 'Erro ao processar consulta de peças.',
    });
  }
}
