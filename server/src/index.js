import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

const PORT = Number(process.env.PORT || 5175);
const WHATSAPP_NUMBER = String(process.env.WHATSAPP_NUMBER || '971000000000');

function readContent() {
  const p = path.join(__dirname, '..', 'content', 'content.json');
  const raw = fs.readFileSync(p, 'utf-8');
  return JSON.parse(raw);
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/api/content', (req, res) => {
  const data = readContent();
  res.json({ ...data, whatsappNumber: WHATSAPP_NUMBER });
});

// Demo endpoint: принимает заявку и "сохраняет" в памяти (для реального проекта — БД/CRM)
const leads = [];

app.post('/api/lead', (req, res) => {
  const { name, date, whatsapp, comment, lang, shootType, packageId } = req.body || {};
  if (!name || !whatsapp) {
    return res.status(400).json({ ok: false, error: 'name and whatsapp are required' });
  }
  const lead = {
    id: `lead_${Date.now()}`,
    createdAt: new Date().toISOString(),
    name,
    date: date || null,
    whatsapp,
    comment: comment || '',
    lang: lang || 'en',
    shootType: shootType || null,
    packageId: packageId || null
  };
  leads.unshift(lead);
  console.log('[NEW LEAD]', lead);
  return res.json({ ok: true, lead });
});

app.get('/api/leads', (req, res) => {
  res.json({ ok: true, leads });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
