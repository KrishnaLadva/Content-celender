import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/digest', async (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    const { posts = [], performance = [] } = req.body ?? {};

    if (!apiKey) {
      res.json({ aiGenerated: false, rawJson: null });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const promptSummary = JSON.stringify({
        brand: 'Apano Aviation (India unbiased aviation guidance platform, Ahmedabad)',
        researchBenchmarks: {
          organicVisitsPerMonth: '~3.4K (361 ranked keywords, #38 "best flying schools in india")',
          aiOverviewWin: '/cpl-online cited for "cpl ground classes online"',
          linkedinBaseline: '56 followers (Sept), tracking top 9 ranked rivals',
          gujaratiCtwaCost: '₹23-26 per chat',
          ownableGaps: [
            'Course-free neutrality vs Pilot’s Compass ground classes & FMS',
            'DGCA re-attempt recovery (0 rivals cover failed papers)',
            'Sourced CPL fee comparison clearing ₹40L-₹1Cr+ confusion',
            'Gujarati-first parent/student reels vs English/Hindi rivals',
            'LinkedIn authority growth',
          ],
        },
        posts: Array.isArray(posts)
          ? posts.map((p: Record<string, unknown>) => ({
              title: p.title,
              platform: p.platform,
              dayKey: p.dayKey,
              time: p.time,
              status: p.status,
              pillar: p.pillar,
            }))
          : [],
        performance: Array.isArray(performance) ? performance : [],
        taskSlots: [
          'Slot 1 (action: Review approvals): Summarize pending_review Apano Aviation posts needing approval (e.g. Thu 19).',
          'Slot 2 (action: Add Post): Identify any open/empty day slot between 2026-11-16 and 2026-11-22 (e.g. Sat 21) and recommend filling it using an Apano research gap.',
          'Slot 3 (action: Inspect draft): Highlight an in_progress or idea post that needs final copy or sourced fee verification.',
        ],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: `Generate a concise Daily Digest briefing from this Apano Aviation workspace snapshot: ${promptSummary}`,
        config: {
          systemInstruction:
            'You are an editorial operations analyst for Apano Aviation. Return exactly 3 priorityTasks matching Slot 1, Slot 2, and Slot 3 in order, grounded in the provided posts and competitor gaps, plus 3 quantitative performanceHighlights in concise business English without buzzwords.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headline: {
                type: Type.STRING,
                description:
                  'One concise sentence summarizing today’s Apano Aviation priorities and reach.',
              },
              priorityTasks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    detail: { type: Type.STRING },
                    priority: { type: Type.STRING },
                  },
                },
              },
              performanceHighlights: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    metric: { type: Type.STRING },
                    label: { type: Type.STRING },
                    detail: { type: Type.STRING },
                  },
                },
              },
            },
          },
        },
      });

      const rawJson = (response.text ?? '{}').trim();
      res.json({ aiGenerated: true, rawJson });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to generate AI digest.';
      res.status(502).json({ error: message });
    }
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OrbitFlow server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
