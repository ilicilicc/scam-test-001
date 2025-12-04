import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url } = req;

  // Health check
  if (url?.includes('/api/health')) {
    return res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  }

  // Analysis endpoint
  if (url?.includes('/api/analysis')) {
    try {
      // Dynamic import to isolate potential load errors
      const { performFullAnalysis } = await import('../server/analysis');
      const data = await performFullAnalysis();
      return res.status(200).json(data);
    } catch (error: any) {
      console.error('Analysis Error:', error);
      return res.status(500).json({
        error: 'Failed to perform analysis',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }

  // 404 for other API routes
  return res.status(404).json({ error: 'Not Found', path: url });
}
