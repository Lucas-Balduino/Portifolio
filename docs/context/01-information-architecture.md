# 01 — Arquitetura de informação

Duas camadas. **Agora** = o que o repo já tem e o autor usa. **Horizonte** = sitemap pós-migração — não criar pastas vazias `src/` nesta conversa.

## Agora

```
Portifolio/
├── index.html              # Home: hero + 3 projetos (ordem do JSON)
├── projetos.html           # Lista completa
├── projeto.html?slug=      # Detalhe
├── sobre.html
├── contato.html
├── style.css / main.js / projects.js
├── data/projects.json      # Fonte de verdade dos cases
├── admin/index.html        # CRUD em memória + download JSON
├── js/                     # site-config, contact, config.example (config.js gitignored)
├── img/                    # Capas, galerias, favicon, og-image
├── Resume/                 # CurriculoPT.pdf (link em sobre.html) + rascunho .md
├── docs/context/           # Spec (este conjunto)
├── ROADMAP.md / DECISOES.md / CRUD_GUIDE.md / README.md / AGENTS.md
```

### O que vai em cada lugar

- **Página de vitrine** — `index.html`, `projetos.html`, `projeto.html`, `sobre.html`, `contato.html`. Não entra conteúdo de case no HTML estático: o JS lê o JSON.
- **Case / projeto** — só em `data/projects.json` (+ arquivos em `img/<Pasta>/` ou raiz de `img/` para JetPack/Agência). Um objeto = um card + uma URL `projeto.html?slug=`.
- **Admin** — ferramenta do autor, fora da nav pública. Não é conteúdo.
- **Currículo** — `Resume/CurriculoPT.pdf` (publicado) e `Resume/CurriculoEN.pdf` (já no repo). Rascunho Markdown não é página do site.
- **Spec vs execução** — `docs/context/` descreve; `ROADMAP.md` executa. `DECISOES.md` é o registro do Checkpoint A, não a lista de tarefas.

### Relações

Uma fonte de verdade por tipo de link:

| Relação | Fonte | Não duplicar em |
|---|---|---|
| Lista e ordem dos projetos | array em `data/projects.json` | HTML de cards, sitemap (o sitemap **repete** slugs — atualizar junto na mesma tarefa de conteúdo) |
| Textos de UI (nav, hero, sobre) | HTML `data-i18n` + dicionário em `main.js` | JSON de projetos |
| URL canônica / OG | `js/site-config.js` + tags no `<head>` de cada HTML | |
| Contato funcional | mailto no HTML; EmailJS só se existir `js/config.js` local | |

Ordem atual dos projetos (home = os três primeiros): Kinetic → Mapa Virtual do IdA → Descubra Cerrado → JetPack Guy → Agência de Viagens.

### Sitemap público (agora)

`/` · `/projetos.html` · `/sobre.html` · `/contato.html` · `/projeto.html?slug={slug}` para os cinco slugs. `admin/` não entra no `sitemap.xml`.

## Horizonte (não executar agora)

Rotas Astro, PT na raiz, EN em `/en/…`:

- `/` home · `/projetos` lista · `/projetos/[slug]` detalhe · `/sobre` · `/contato`
- `/en/` e equivalentes
- Sem `admin/`. Conteúdo em `src/content/projects/*.mdx`. Imagens em `public/img/` (ou equivalente Astro). `Resume/` continua arquivo estático baixável.

Isto não autoriza scaffold nesta conversa da spec.
