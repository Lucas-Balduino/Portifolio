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

// CORS - permite requisições do frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

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

// Função para verificar se uma coluna existe
function columnExists(columnName, callback) {
  db.all(`PRAGMA table_info(projects)`, (err, rows) => {
    if (err) {
      callback(err, false);
      return;
    }
    const exists = rows.some(row => row.name === columnName);
    callback(null, exists);
  });
}

// Função para adicionar coluna se não existir
function addColumnIfNotExists(columnName, callback) {
  columnExists(columnName, (err, exists) => {
    if (err) {
      console.error(`Erro ao verificar coluna ${columnName}:`, err);
      callback(err);
      return;
    }
    
    if (!exists) {
      db.run(`ALTER TABLE projects ADD COLUMN ${columnName} TEXT`, (err) => {
        if (err) {
          // SQLite retorna erro específico para coluna duplicada
          if (err.message.includes('duplicate column') || err.message.includes('already exists')) {
            console.log(`Coluna ${columnName} já existe`);
            callback(null);
          } else {
            console.error(`Erro ao adicionar coluna ${columnName}:`, err.message);
            callback(err);
          }
        } else {
          console.log(`✓ Coluna ${columnName} adicionada com sucesso`);
          callback(null);
        }
      });
    } else {
      console.log(`✓ Coluna ${columnName} já existe`);
      callback(null);
    }
  });
}

// Inicializa o banco de dados
db.serialize(() => {
  // Cria a tabela se não existir
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
  )`, (err) => {
    if (err) {
      console.error('Erro ao criar tabela:', err);
      return;
    }
    
    // Adiciona novas colunas se não existirem (migração)
    const newColumns = ['introduction', 'main_idea', 'images_section', 'technical_details', 'presentation', 'how_to_run'];
    let completed = 0;
    
    if (newColumns.length === 0) {
      console.log('Migração do banco de dados concluída');
      return;
    }
    
    newColumns.forEach((col, index) => {
      addColumnIfNotExists(col, (err) => {
        completed++;
        if (completed === newColumns.length) {
          console.log('Migração do banco de dados concluída');
        }
      });
    });
  });
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
  try { 
    const rows = await all('SELECT * FROM projects ORDER BY created_at DESC'); 
    res.json(rows); 
  }
  catch (err) { 
    console.error('Erro ao buscar projetos:', err);
    res.status(500).json({error: err.message}); 
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try { 
    const row = await get('SELECT * FROM projects WHERE id = ?', [req.params.id]); 
    if (!row) {
      return res.status(404).json({error: 'Projeto não encontrado'}); 
    }
    res.json(row); 
  }
  catch (err) { 
    console.error('Erro ao buscar projeto:', err);
    res.status(500).json({error: err.message}); 
  }
});

// Rota para buscar projeto por slug
app.get('/api/projects/slug/:slug', async (req, res) => {
  try { 
    const row = await get('SELECT * FROM projects WHERE slug = ?', [req.params.slug]); 
    if (!row) {
      return res.status(404).json({error: 'Projeto não encontrado'}); 
    }
    res.json(row); 
  }
  catch (err) { 
    console.error('Erro ao buscar projeto por slug:', err);
    res.status(500).json({error: err.message}); 
  }
});
app.post('/api/projects', async (req, res) => {
  try {
    const {
      slug, title, short_desc, description, technologies, image_url, repo_url, live_url,
      introduction, main_idea, images_section, technical_details, presentation, how_to_run
    } = req.body;
    
    // Validação básica
    if (!title || !slug) {
      return res.status(400).json({error: 'Título e slug são obrigatórios'});
    }
    
    const stmt = `INSERT INTO projects (slug,title,short_desc,description,technologies,image_url,repo_url,live_url,introduction,main_idea,images_section,technical_details,presentation,how_to_run)
                  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const result = await run(stmt, [
      slug, title, short_desc, description, technologies, image_url, repo_url, live_url,
      introduction, main_idea, images_section, technical_details, presentation, how_to_run
    ]);
    const created = await get('SELECT * FROM projects WHERE id = ?', [result.lastID]);
    res.status(201).json(created);
  } catch (err) { 
    console.error('Erro ao criar projeto:', err);
    if (err.message.includes('UNIQUE constraint')) {
      return res.status(409).json({error: 'Já existe um projeto com este slug'});
    }
    res.status(500).json({error: err.message}); 
  }
});
app.put('/api/projects/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const {
      slug, title, short_desc, description, technologies, image_url, repo_url, live_url,
      introduction, main_idea, images_section, technical_details, presentation, how_to_run
    } = req.body;
    
    // Verifica se o projeto existe
    const existing = await get('SELECT * FROM projects WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({error: 'Projeto não encontrado'});
    }
    
    // Validação básica
    if (!title || !slug) {
      return res.status(400).json({error: 'Título e slug são obrigatórios'});
    }
    
    await run(`UPDATE projects SET slug=?,title=?,short_desc=?,description=?,technologies=?,image_url=?,repo_url=?,live_url=?,introduction=?,main_idea=?,images_section=?,technical_details=?,presentation=?,how_to_run=?, updated_at=CURRENT_TIMESTAMP WHERE id = ?`,
      [slug, title, short_desc, description, technologies, image_url, repo_url, live_url,
       introduction, main_idea, images_section, technical_details, presentation, how_to_run, id]);
    const updated = await get('SELECT * FROM projects WHERE id = ?', [id]);
    res.json(updated);
  } catch (err) { 
    console.error('Erro ao atualizar projeto:', err);
    if (err.message.includes('UNIQUE constraint')) {
      return res.status(409).json({error: 'Já existe um projeto com este slug'});
    }
    res.status(500).json({error: err.message}); 
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try { 
    const id = req.params.id;
    
    // Verifica se o projeto existe
    const existing = await get('SELECT * FROM projects WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({error: 'Projeto não encontrado'});
    }
    
    await run('DELETE FROM projects WHERE id = ?', [id]); 
    res.json({deleted: true, id: id}); 
  }
  catch (err) { 
    console.error('Erro ao deletar projeto:', err);
    res.status(500).json({error: err.message}); 
  }
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

// Tratamento de erros não capturados
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({error: 'Erro interno do servidor'});
});

// Start
app.listen(PORT, () => {
  console.log('========================================');
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
  console.log('========================================');
});
