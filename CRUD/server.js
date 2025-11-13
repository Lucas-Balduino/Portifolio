// server.js (substitua seu arquivo por este - versão "robusta" e comentada)
// Requer: express, sqlite3, body-parser, formidable (ou multer se quiser)
// Inicie com: node server.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// DEBUG: imprimir caminhos para confirmar onde o server procura arquivos
console.log('--- debug startup ---');
console.log('process.cwd():', process.cwd());
console.log('__dirname:', __dirname);
console.log('static path will be:', path.join(__dirname, 'public'));
console.log('---------------------');

// Serve arquivos estáticos da pasta "public"
// IMPORTANTE: coloque este middleware ANTES das rotas da API
app.use(express.static(path.join(__dirname, 'public')));

// Também permita servir arquivos em /uploads (se usar upload)
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
app.use('/uploads', express.static(UPLOAD_DIR));

// Body parser para JSON
app.use(bodyParser.json());

// --- Banco (SQLite) ---
const DB_FILE = path.join(__dirname, 'data.db');
const db = new sqlite3.Database(DB_FILE);
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE,
    title TEXT,
    short_desc TEXT,
    description TEXT,
    technologies TEXT,
    image_url TEXT,
    repo_url TEXT,
    live_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Helpers (promises)
function run(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) { if (err) reject(err); else resolve(this); });
  });
}
function all(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => { if (err) reject(err); else resolve(rows); });
  });
}
function get(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => { if (err) reject(err); else resolve(row); });
  });
}

// --- Rotas API ---
app.get('/api/projects', async (req, res) => {
  try { const rows = await all('SELECT * FROM projects ORDER BY created_at DESC'); res.json(rows); }
  catch (err) { res.status(500).json({error: err.message}); }
});
app.get('/api/projects/:id', async (req, res) => {
  try { const row = await get('SELECT * FROM projects WHERE id = ?', [req.params.id]); if (!row) return res.status(404).json({error: 'Not found'}); res.json(row); }
  catch (err) { res.status(500).json({error: err.message}); }
});
app.post('/api/projects', async (req, res) => {
  try {
    const {slug,title,short_desc,description,technologies,image_url,repo_url,live_url} = req.body;
    const stmt = `INSERT INTO projects (slug,title,short_desc,description,technologies,image_url,repo_url,live_url)
                  VALUES (?,?,?,?,?,?,?,?)`;
    const result = await run(stmt, [slug,title,short_desc,description,technologies,image_url,repo_url,live_url]);
    const created = await get('SELECT * FROM projects WHERE id = ?', [result.lastID]);
    res.json(created);
  } catch (err) { res.status(500).json({error: err.message}); }
});
app.put('/api/projects/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const {slug,title,short_desc,description,technologies,image_url,repo_url,live_url} = req.body;
    await run(`UPDATE projects SET slug=?,title=?,short_desc=?,description=?,technologies=?,image_url=?,repo_url=?,live_url=?, updated_at=CURRENT_TIMESTAMP WHERE id = ?`,
      [slug,title,short_desc,description,technologies,image_url,repo_url,live_url,id]);
    const updated = await get('SELECT * FROM projects WHERE id = ?', [id]);
    res.json(updated);
  } catch (err) { res.status(500).json({error: err.message}); }
});
app.delete('/api/projects/:id', async (req, res) => {
  try { const id = req.params.id; await run('DELETE FROM projects WHERE id = ?', [id]); res.json({deleted: true}); }
  catch (err) { res.status(500).json({error: err.message}); }
});

// Optional: redirect /admin to /admin/index.html (útil se alguém abrir /admin)
app.get('/admin', (req, res) => {
  const adminIndex = path.join(__dirname, 'public', 'admin', 'index.html');
  if (fs.existsSync(adminIndex)) return res.sendFile(adminIndex);
  return res.status(404).send('Admin não encontrado');
});

// Root route (opcional)
app.get('/', (req, res) => {
  const indexFile = path.join(__dirname,'public','index.html');
  if (fs.existsSync(indexFile)) return res.sendFile(indexFile);
  res.send('Servidor rodando - coloque arquivos estáticos em ./public');
});

// Start
app.listen(PORT, () => console.log('Server running on port', PORT));
