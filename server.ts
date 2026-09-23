import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { executePartSearch, executeFollowup, getAiClient } from './src/server/searchService';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Healthcheck
app.get(['/api/health', '/health'], (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.VITE_GEMINI_API_KEY ||
      process.env.API_KEY
    ),
    time: new Date().toISOString(),
  });
});

// Search automotive part
app.post(['/api/search-part', '/search-part'], async (req, res) => {
  try {
    const result = await executePartSearch(req.body);
    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/search-part:', error);
    res.status(500).json({
      error: error?.message || 'Erro ao processar consulta de autopeças.',
    });
  }
});

// Follow-up question on active part
app.post(['/api/followup', '/followup'], async (req, res) => {
  try {
    const { question, partContext } = req.body;
    const result = await executeFollowup(question, partContext);
    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/followup:', error);
    res.status(500).json({
      error: error?.message || 'Erro ao processar dúvida técnica.',
    });
  }
});

// Vite or Static file serving (dev or standalone production)
async function startServer() {
  const isServerless = Boolean(
    process.env.VERCEL ||
    process.env.NOW_REGION ||
    process.env.AWS_LAMBDA_FUNCTION_NAME
  );

  if (isServerless) {
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AutoPeças IA server listening on http://0.0.0.0:${PORT}`);
  });
}

const isServerlessEnv = Boolean(
  process.env.VERCEL ||
  process.env.NOW_REGION ||
  process.env.AWS_LAMBDA_FUNCTION_NAME
);

if (!isServerlessEnv && process.env.NODE_ENV !== 'test') {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}

export default app;
