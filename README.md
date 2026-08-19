## Portfólio — Lucas Balduino

Site em Astro (`astro@7.2.2` + `@astrojs/react@6.0.2`, npm). Produção: [https://lucasbalduino.vercel.app](https://lucasbalduino.vercel.app).

Cases em `src/content/projects/*.mdx`. Requer **Node ≥ 22.12** (`.nvmrc`).

### Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # saída em dist/
npm run preview  # conferir o build
```

### Estrutura

```
Portifolio/
├── src/pages/              # Home, projetos, detalhe, sobre, contato
├── src/content/projects/   # Cases em MDX
├── src/layouts/            # Layout, header, footer
├── public/img/             # Imagens servidas no build
├── public/Resume/          # CurriculoPT.pdf
├── style.css               # Tokens e estilos (importados pelo Layout)
└── astro.config.mjs
```

### Publicação

Vercel (output estático `dist/`). `SITE_URL` em `src/site-config.ts`.

### Documentação

- [`AGENTS.md`](AGENTS.md) — regras para agentes; aponta a spec
- [`docs/context/`](docs/context/00-project-brief.md) — spec do projeto (`00`–`04`, `06`)
- [`ROADMAP.md`](ROADMAP.md) — execução SDD (uma tarefa, um commit)
- [`DECISOES.md`](DECISOES.md) — Checkpoint A (Astro, MDX, Vercel, dark-first, PT+EN)
- [`CRUD_GUIDE.md`](CRUD_GUIDE.md) — obsoleto (admin JSON aposentado)
