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

**Site publicado (HTML na raiz)** — o GitHub Pages ainda serve o legado até a 2.14:

```bash
npx serve .
# Acesse http://localhost:3000
```

**Scaffold Astro (Fase 2)** — `astro@7.2.2` + `@astrojs/react@6.0.2` (npm). Requer **Node ≥ 22.12** (`.nvmrc`).

```bash
npm install
npm run dev      # http://localhost:4321 (placeholder)
npm run build    # dist/
```

### EmailJS (formulário de contato)

1. Copie `js/config.example.js` para `js/config.js`.
2. Preencha Service ID, Template ID e Public Key do [EmailJS](https://www.emailjs.com).
3. `js/config.js` está no `.gitignore` — não commite credenciais.

### Publicação (Vercel)

Produção: `https://lucasbalduino.vercel.app` (`SITE_URL` em `src/site-config.ts`).

O GitHub Pages (`https://lucas-balduino.github.io/Portifolio`) ainda publica o HTML legado até a tarefa 2.14.

### Documentação

- [`AGENTS.md`](AGENTS.md) — regras para agentes; aponta a spec
- [`docs/context/`](docs/context/00-project-brief.md) — spec do projeto (`00`–`04`, `06`)
- [`ROADMAP.md`](ROADMAP.md) — execução SDD (uma tarefa, um commit)
- [`DECISOES.md`](DECISOES.md) — Checkpoint A (Astro, MDX, Vercel, dark-first, PT+EN)
- [`CRUD_GUIDE.md`](CRUD_GUIDE.md) — admin JSON (até a tarefa 2.14)
