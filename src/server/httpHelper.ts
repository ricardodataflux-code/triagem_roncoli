export async function getRequestBody(req: any): Promise<any> {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
    return req.body;
  }

  // If body is an unconsumed stream
  return new Promise((resolve) => {
    let data = '';
    req.on?.('data', (chunk: any) => {
      data += chunk;
    });
    req.on?.('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
    req.on?.('error', () => {
      resolve({});
    });
    // If no stream events attached and already finished
    setTimeout(() => {
      if (!data) resolve({});
    }, 100);
  });
}

export function sendJsonResponse(res: any, statusCode: number, data: any) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (typeof res.status === 'function') {
    if (typeof res.json === 'function') {
      return res.status(statusCode).json(data);
    }
    return res.status(statusCode).end(JSON.stringify(data));
  }

  res.statusCode = statusCode;
  return res.end(JSON.stringify(data));
}
