## Portfólio estático com CRUD via JSON

Site estático (HTML/CSS/JS) com painel admin que edita projetos em memória e exporta `data/projects.json`.

### Estrutura principal

```
Portifolio/
├── index.html              # Home (projetos recentes)
├── projetos.html           # Lista de projetos
├── projeto.html            # Detalhe (?slug=meu-projeto)
├── sobre.html / contato.html
├── style.css / main.js / projects.js
├── data/projects.json      # Fonte de dados dos projetos
├── admin/index.html        # CRUD em memória + download JSON
├── js/                     # Scripts auxiliares (contato, config)
├── img/                    # Imagens e assets
├── ROADMAP.md              # Checkpoint de atualização
└── CRUD_GUIDE.md           # Guia do admin
```

### Fluxo de edição de projetos

1. Sirva o site localmente (`npx serve .`) — necessário para o admin carregar o JSON.
2. Abra `admin/index.html` no navegador.
3. Crie, edite ou exclua projetos.
4. Clique em **Baixar JSON atualizado**.
5. Substitua `data/projects.json` pelo arquivo baixado.
6. Commit + push para publicar.

### Desenvolvimento local

```bash
npx serve .
# Acesse http://localhost:3000
```

### EmailJS (formulário de contato)

1. Copie `js/config.example.js` para `js/config.js`.
2. Preencha Service ID, Template ID e Public Key do [EmailJS](https://www.emailjs.com).
3. `js/config.js` está no `.gitignore` — não commite credenciais.

### Publicação (GitHub Pages)

1. **Settings → Pages**
2. Source: branch `main` (ou `AtualizacaoPortifolio` após merge), folder `/ (root)`
3. Atualize `SITE_URL` em `js/site-config.js` com a URL final (ex.: `https://usuario.github.io/Portifolio`)

### Documentação

- [`CRUD_GUIDE.md`](CRUD_GUIDE.md) — uso do admin
- [`ROADMAP.md`](ROADMAP.md) — plano de atualização e status das tarefas
- [`DECISOES.md`](DECISOES.md) — decisões pendentes para Fase 2
