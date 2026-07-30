# Decisões — Checkpoint A

> Registrado em: 2026-07-30 | Status: **Concluído**

Decisões tomadas pelo Lucas para as Fases 2 e 3 do [`ROADMAP.md`](ROADMAP.md).

## Decisões

| # | Decisão | Escolha | Justificativa |
|---|---------|---------|---------------|
| A1 | Stack | **Astro + React islands** | Já domina React (Kinetic); islands permitem React onde importa sem custo de SPA; resolve OG/SEO por projeto e componentização de header/footer |
| A2 | CMS / conteúdo | **MDX no repo (Content Collections)** | Case studies longos com código sofrem em strings JSON; MDX tem syntax highlight nativo e schema validado em build; admin HTML será aposentado |
| A3 | Hosting | **Vercel** | Preview automático por PR combina com fluxo de branch + ROADMAP; deploy por push |
| A4 | Identidade visual | **Dark-first premium** | Dark mode como padrão, tipografia display grande, gradientes sutis; light mode vira alternativa |
| A5 | Idioma | **PT + EN com seletor manual** | Astro tem i18n routing nativo (`/en/...`); detecção automática atual vira fallback; case studies traduzidos gradualmente |

## Implicações para a Fase 2

- **T2.1 (Migração):** scaffold Astro com adapter estático → deploy Vercel; `data/projects.json` migra para `src/content/projects/*.mdx` com schema Zod
- **T2.2 (Redesign):** tokens dark-first; definir cor de acento e fonte display na fase de design (sugestão em aberto: azul `#005CEE` + Lexend, herdados do design system do Kinetic)
- **T2.4 (i18n):** rotas `/` (PT) e `/en/` via i18n nativo do Astro; seletor manual no header
- **URL de produção mudará** (`*.vercel.app` ou domínio custom) → atualizar `SITE_URL`, OG tags, sitemap e robots.txt na migração
- O painel `admin/` e o fluxo de download de JSON serão descontinuados após a migração

## Artefatos — status

| Artefato | Status |
|----------|--------|
| CV em inglês (`Resume/CurriculoEN.pdf`) | ✅ já existe no repo |
| Screenshots Agência de Viagens | ⬜ pendente |
| GIF/video 5–10s JetPack Guy | ⬜ pendente |
| Paleta de cores final (dark-first) | ⬜ pendente (definir na T2.2) |
| Fonte display | ⬜ pendente (definir na T2.2) |
| Ícones SVG redes sociais | ⬜ pendente |
| URL final de produção (Vercel) | ⬜ pendente (criar projeto na Vercel) |

## Nota de priorização (2026-07-30)

A Fase 2 (migração Astro) está **adiada** até depois da candidatura de estágio com prazo **05/08/2026**. Prioridade imediata: Fase E do ROADMAP — subir novos projetos, estabilizar o site atual e atualizar o currículo.
