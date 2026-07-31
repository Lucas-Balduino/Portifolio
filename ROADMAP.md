# Roadmap — Atualização Portfólio

> Branch: `main` | Última atualização: 2026-07-30

## Como usar este documento

1. Escolha **uma tarefa** por vez, na ordem sugerida.
2. Leia **Artefatos necessários** — não inicie se faltar algo do usuário.
3. Execute apenas nos **Arquivos** listados.
4. Valide o **Critério de aceite**.
5. Atualize este arquivo (`[x]`, data, commit) e faça commit com a mensagem sugerida.
6. **Não** inicie Fase 2 antes do Checkpoint A estar concluído.

## Convenções de commit

Formato: `tipo(escopo): descrição imperativa curta`

| Tipo | Uso |
|------|-----|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | README, CRUD_GUIDE, ROADMAP |
| `refactor` | Reorganização sem mudar comportamento |
| `perf` | Lazy loading, otimizações |
| `chore` | Config, favicon, robots.txt |

**Regras:** 1 tarefa = 1 commit | Atualizar ROADMAP no mesmo commit | Mensagens em português | Nunca commitar chaves secretas

## Status geral

| Fase | Progresso |
|------|-----------|
| Fase 0 — Setup | 1/1 |
| Fase 1 — Alta prioridade | 8/8 ✅ |
| Checkpoint A | Concluído ✅ (ver [`DECISOES.md`](DECISOES.md)) |
| Fase E — Estabilização e candidatura (prazo 05/08) | 1/5 — **prioridade atual** |
| Fase 2 — Média prioridade | Adiada até fim da Fase E |
| Fase 3 — Diferenciação | Bloqueada |

## Baseline do repositório

- **Stack:** HTML/CSS/JS vanilla, sem build
- **Dados:** `data/projects.json` (estático)
- **Admin:** `admin/index.html` (CRUD em memória + download JSON)
- **Paths reais:** arquivos na **raiz** do repo (não existe pasta `public/`)
- **Inconsistências conhecidas (pré-Fase 1):** README e CRUD_GUIDE desatualizados; admin referencia `public/`; index com cards estáticos e projetos.html com render duplicado

---

## Fase 0 — Setup

### T0.1 — Criar ROADMAP.md e registrar baseline

- **Status:** [x] concluído (2026-07-29)
- **Commit sugerido:** `docs(roadmap): adicionar checkpoint e plano de atualização`
- **Decisões do usuário:** nenhuma
- **Artefatos necessários:** nenhum
- **Arquivos:** `ROADMAP.md`
- **Passos:**
  1. Criar este arquivo com todas as fases e tarefas
  2. Documentar baseline e convenções de commit
  3. Marcar tarefas Fase 1–3 como pendentes
- **Critério de aceite:** ROADMAP existe e cobre Fases 0–3 + Checkpoint A
- **Não fazer:** editar o arquivo de plano em `.cursor/plans/`

---

## Fase 1 — Alta prioridade

### T1.1 — Corrigir documentação desalinhada

- **Status:** [x] concluído (2026-07-29)
- **Commit sugerido:** `docs: alinhar README, CRUD_GUIDE e admin com arquitetura estática`
- **Decisões do usuário:** arquivos permanecem na raiz (sem mover para `public/`)
- **Artefatos necessários:** nenhum
- **Arquivos:** `README.md`, `CRUD_GUIDE.md`, `admin/index.html`
- **Passos:**
  1. Reescrever README com paths corretos
  2. Reescrever CRUD_GUIDE para fluxo JSON estático
  3. Corrigir textos `public/data/projects.json` → `data/projects.json` no admin
- **Critério de aceite:** nenhum doc menciona `server.js`, SQLite ou `public/` como estrutura atual
- **Não fazer:** mover arquivos de pasta nesta tarefa

### T1.2 — Corrigir bug i18n no hero

- **Status:** [x] concluído (2026-07-29)
- **Commit sugerido:** `fix(i18n): corrigir chaves duplicadas de skills no hero`
- **Artefatos necessários:** nenhum
- **Arquivos:** `index.html`, `main.js`
- **Passos:**
  1. Atribuir chave `data-i18n` única por linha de skills
  2. Adicionar traduções EN/ES em `main.js`
- **Critério de aceite:** cada linha de skills traduz corretamente em EN/ES; PT intacto
- **Não fazer:** alterar conteúdo das skills sem necessidade

### T1.3 — Unificar renderização de projetos

- **Status:** [x] concluído (2026-07-29)
- **Commit sugerido:** `refactor(projects): unificar renderização via ProjectsAPI`
- **Decisão técnica:** container `projetos.html` vira `<div id="projects-list">`; home usa `renderRecentProjects`
- **Artefatos necessários:** nenhum
- **Arquivos:** `projetos.html`, `index.html`, `style.css` (se necessário)
- **Passos:**
  1. Trocar `<ul>` por `<div>` em projetos.html
  2. Remover script inline duplicado; usar `ProjectsAPI.renderProjectsList`
  3. Restaurar carregamento dinâmico na home via `projects.js`
- **Critério de aceite:** home e listagem usam `projects.js`; cards idênticos
- **Não fazer:** duplicar HTML de cards inline

### T1.4 — Lazy loading em imagens

- **Status:** [x] concluído (2026-07-29)
- **Commit sugerido:** `perf(projects): adicionar lazy loading nas imagens`
- **Artefatos necessários:** nenhum
- **Arquivos:** `projects.js`, `index.html`, `sobre.html`, `admin/index.html`
- **Passos:** adicionar `loading="lazy"` em imagens abaixo da dobra; hero photo pode ficar eager
- **Critério de aceite:** imagens dinâmicas e estáticas (exceto hero) com lazy loading
- **Não fazer:** lazy na imagem LCP do hero

### T1.5 — Meta tags SEO básicas

- **Status:** [x] concluído (2026-07-29)
- **Commit sugerido:** `feat(seo): adicionar meta tags, favicon e open graph`
- **Artefatos necessários:**
  - `img/og-image.png` (1200×630) — **placeholder SVG/documentado se ausente**
  - `img/favicon.svg` ou PNG 32×32
  - Meta descriptions por página (ver `js/site-config.js`)
  - URL base de produção em `js/site-config.js`
- **Arquivos:** todas as páginas HTML, `robots.txt`, `js/site-config.js`, `img/favicon.svg`
- **Critério de aceite:** cada página tem description + OG; favicon linkado; robots.txt existe
- **Não fazer:** hardcodar URL errada sem documentar como alterar

### T1.6 — Integrar EmailJS no formulário de contato

- **Status:** [x] concluído (2026-07-29)
- **Commit sugerido:** `feat(contact): integrar formulário com EmailJS`
- **Artefatos necessários (usuário):**
  - Conta EmailJS + Service ID, Template ID, Public Key
  - Copiar `js/config.example.js` → `js/config.js` com credenciais reais
- **Arquivos:** `contato.html`, `js/contact.js`, `js/config.example.js`, `.gitignore`, `README.md`
- **Critério de aceite:** formulário com estados loading/success/error; `config.js` ignorado pelo git
- **Não fazer:** commitar chaves reais

### T1.7 — Sanitização básica no render de projetos

- **Status:** [x] concluído (2026-07-29)
- **Commit sugerido:** `fix(projects): escapar conteúdo dinâmico contra XSS`
- **Artefatos necessários:** nenhum
- **Arquivos:** `projects.js`, `CRUD_GUIDE.md`
- **Passos:**
  1. Criar `escapeHtml()` e aplicar em title, short_desc, alt, badges
  2. Documentar campos que permitem HTML rico no CRUD_GUIDE
- **Critério de aceite:** `<script>` em título não executa
- **Não fazer:** escapar campos de conteúdo rico intencional

### T1.8 — Melhorias admin (validação + import JSON)

- **Status:** [x] concluído (2026-07-29)
- **Commit sugerido:** `feat(admin): validar slug único e permitir importar JSON`
- **Artefatos necessários:** nenhum
- **Arquivos:** `admin/index.html`
- **Passos:**
  1. Validar slug único antes de salvar
  2. Botão Importar JSON via `<input type="file">`
  3. Corrigir paths/mensagens restantes
- **Critério de aceite:** slug duplicado bloqueado; import substitui lista local
- **Não fazer:** upload automático ao repo (continua manual)

---

## CHECKPOINT A — Decisões (Fase 2+)

- **Status:** [x] concluído (2026-07-30) — detalhes e justificativas em [`DECISOES.md`](DECISOES.md)

| # | Decisão | Escolha |
|---|---------|---------|
| A1 | Stack | **Astro + React islands** |
| A2 | CMS | **MDX no repo (Content Collections)** |
| A3 | Hosting | **Vercel** |
| A4 | Identidade visual | **Dark-first premium** |
| A5 | Idioma | **PT + EN (seletor manual)** |

**Artefatos pendentes para a Fase 2:** screenshots Agência, GIF JetPack Guy, paleta/fonte (definir na T2.2), ícones SVG, URL Vercel. CV EN já existe (`Resume/CurriculoEN.pdf`).

---

## Fase E — Estabilização e candidatura (PRIORIDADE — prazo 05/08/2026)

Fase intermediária inserida em 2026-07-30: antes da migração Astro, o foco é deixar o site atual estável e completo para candidatura a vaga de estágio.

### E1 — Criar sitemap.xml

- **Status:** [x] concluído (2026-07-30)
- **Commit sugerido:** `chore(seo): adicionar sitemap.xml referenciado pelo robots.txt`
- **Artefatos necessários:** nenhum
- **Arquivos:** `sitemap.xml`
- **Critério de aceite:** robots.txt não referencia arquivo inexistente; sitemap cobre 4 páginas + 3 projetos
- **Não fazer:** esquecer de adicionar novos slugs ao sitemap ao criar projetos (ver E2)

### E2.0 — Suportar títulos de seção customizados (pré-requisito da E2)

- **Status:** [x] concluído (2026-07-31)
- **Commit sugerido:** `feat(projects): permitir títulos de seção customizados por projeto`
- **Artefatos necessários:** nenhum
- **Arquivos:** `projects.js`, `CRUD_GUIDE.md`
- **Motivo:** os títulos eram hardcoded para projetos de código ("Detalhes Técnicos", "Como Executar") — rótulos errados para case studies de design
- **Como usar:** campo opcional `section_titles` no projeto (chaves `introduction`, `main_idea`, `images`, `technical_details`, `presentation`, `how_to_run`); ausente = título padrão
- **Critério de aceite:** projetos sem o campo exibem exatamente os títulos anteriores
- **Não fazer:** passar título por `formatRichText` — continua em `escapeHtml`

### E2 — Adicionar novos projetos (definidos pela E5: 2 case studies de design da UnB)

- **Status:** [ ] pendente
- **Commit sugerido:** `feat(projects): adicionar case study <nome>` (um commit por projeto)
- **Projetos a adicionar (decidido em E5, 2026-07-30):**
  1. App de integração ao novo prédio do Design (UnB) — Figma
  2. Projeto de preservação de espécies nativas do Cerrado (UnB) — Figma
  3. (Opcional, se sobrar tempo) Entrada única "Design gráfico e editorial" agrupando zine, caixa Lollapalooza e cartão postal
- **Conteúdo pronto:** os textos do case study do IdA já estão redigidos em `CASE_STUDY_IDA.md` (arquivo temporário, não versionado — apagar após E2)
- **Artefatos necessários (usuário, por projeto):**
  - Exports das telas do Figma em PNG (salvar em `img/<NomeProjeto>/`, paths com `/` — nunca `\`)
  - Textos no formato case study de design: problema → descoberta → fluxos → wireframes → resultado → o que faria diferente
  - Link de embed do protótipo Figma (Share → Embed), se quiser protótipo interativo na página
  - Para o IdA: nome da disciplina e nomes da equipe (marcados como `[CONFIRMAR]` no texto)
- **Arquivos:** `data/projects.json`, `img/`, `sitemap.xml` (adicionar slug)
- **Passos:**
  1. Adicionar entrada no JSON (validar slug único); preencher `introduction`, `main_idea`, `images_section`, `presentation`; deixar `technical_details` e `how_to_run` vazios (seções somem sozinhas)
  2. Embed Figma: `<iframe>` pode ir dentro de uma seção rica — testar localmente antes de commitar
  3. Usar paths de imagem com barras normais (`img/Projeto/foto.png`)
  4. Adicionar URL do projeto ao `sitemap.xml`
- **Critério de aceite:** projeto aparece na home/listagem; página de detalhe abre sem erro; imagens carregam
- **Não fazer:** copiar paths do Windows Explorer sem converter `\` para `/`; não redesenhar os projetos inteiros — no máximo retocar 2–3 telas principais

### E3 — Atualizar currículo (orientado a design)

- **Status:** [ ] pendente
- **Commit sugerido:** `docs(cv): atualizar currículo PT e EN`
- **Artefatos necessários (usuário):** PDFs atualizados (PT obrigatório, EN recomendado)
- **Orientação (vaga UX/UI):** destacar Design UnB antes de CC; Figma, design system do Kinetic, acessibilidade (WCAG, `prefers-reduced-motion`, ARIA) e monitoria de HTML/CSS como experiência de ensino
- **Arquivos:** `Resume/CurriculoPT.pdf`, `Resume/CurriculoEN.pdf`, `sobre.html` (opcional: link para versão EN)
- **Critério de aceite:** botão "Baixar Currículo" entrega o PDF novo
- **Não fazer:** renomear os arquivos (quebraria o link em `sobre.html`)

### E4 — Checklist de estabilidade

- **Status:** [ ] pendente
- **Commit sugerido:** `fix(<escopo>): <correção encontrada>` (um por problema)
- **Artefatos necessários:** site publicado (GitHub Pages ativo)
- **Passos (verificar em produção, desktop + mobile):**
  1. Todas as páginas carregam sem erro no console
  2. Todos os projetos abrem via "Ver detalhes"; imagens aparecem
  3. Formulário de contato envia de verdade (EmailJS configurado em produção — atenção: `js/config.js` não vai ao repo; verificar como servir credenciais no Pages*)
  4. Dark mode e i18n (EN) funcionam em todas as páginas
  5. Links externos (GitHub, LinkedIn, demos) não quebrados
  6. Download do CV funciona
- **Critério de aceite:** zero erro de console; todos os fluxos acima OK
- **Nota (*):** como o GitHub Pages serve arquivos do repo, `js/config.js` ignorado pelo git **não existirá em produção** — o formulário mostrará erro de configuração. Decidir: (a) commitar `config.js` só com a Public Key do EmailJS (é chave publicável, com rate limit no dashboard) ou (b) manter apenas email direto até a migração Vercel (env vars)

### E5 — Seleção de projetos para a vaga

- **Status:** [~] análise concluída (2026-07-30); execução via E5.1–E5.3
- **Vaga:** UX/UI Designer Júnior — CEIA-UFG (parceria Positivo), remoto, 30h, bolsa R$ 2.000, inscrição até **05/08** via formulário
- **Fit:** Lucas atende o pré-requisito central (graduando em Design na UnB, formatura 2028/1 ≥ dez/2027). Lacuna crítica: portfólio sem evidência de Figma e processo de descoberta → resolvida pela E2
- **Ordem definida dos projetos no `projects.json` (controla a home, 3 primeiros):**
  1. Kinetic (intro reescrita com foco em design)
  2. App integração prédio Design UnB (novo — E2)
  3. Preservação espécies Cerrado UnB (novo — E2)
  4. JetPack Guy
  5. Design gráfico e editorial (opcional — E2)
  6. Agência de Viagens

#### E5.1 — Reescrever Kinetic (meio termo design + CC) + display

- **Status:** [x] concluído (2026-07-30)
- **Commit sugerido:** `feat(projects): reescrever Kinetic e corrigir display de case studies`
- **Arquivos:** `data/projects.json`, `projects.js`, `style.css`
- **Notas:** textos em HTML estruturado; renderer preserva parágrafos; imagens do detalhe limitadas (grid mobile-friendly); seções ricas com overflow controlado

#### E5.2 — Reposicionar hero e página Sobre (+ experiência CAL)

- **Status:** [x] concluído (2026-07-30)
- **Commit sugerido:** `feat(content): ajustar apresentação UX/UI e adicionar extensão CAL`
- **Arquivos:** `index.html`, `sobre.html`, `main.js`, `js/site-config.js`
- **Notas:** hero/sobre como "Designer e desenvolvedor UX/UI em formação"; experiência CAL/UnB (voluntário → bolsista) adicionada — detalhes podem ser refinados pelo usuário

#### E5.3 — Reordenar projetos no JSON

- **Status:** [ ] pendente (depende de E2)
- **Commit sugerido:** `feat(projects): reordenar projetos para destaque de design`
- **Arquivos:** `data/projects.json`
- **Critério de aceite:** home exibe Kinetic + 2 case studies UnB

#### Cronograma até o prazo

| Dia | Entrega |
|-----|---------|
| 30–31/07 | Usuário: textos + exports Figma dos 2 case studies UnB |
| 01/08 | E2 (adicionar projetos) + E5.1 + E5.2 + E5.3 |
| 02/08 | E3 (currículo orientado a design) |
| 03/08 | E4 (estabilidade em produção + decisão config.js EmailJS) |
| 04/08 | Revisão final + envio do formulário (1 dia de folga) |

---

## Fase 2 — Média prioridade (adiada até fim da Fase E)

Decisões fechadas no Checkpoint A (ver [`DECISOES.md`](DECISOES.md)). Detalhamento das subtarefas será feito ao iniciar a fase.

| ID | Tarefa | Definição pós-checkpoint |
|----|--------|--------------------------|
| T2.1 | Migração para Astro + deploy Vercel | Scaffold Astro estático; `projects.json` → `src/content/projects/*.mdx`; aposentar `admin/` |
| T2.2 | Redesign dark-first premium | Tokens dark como padrão; definir acento + fonte display; GIF JetPack no hero |
| T2.3 | Case study Agência (imagens) | Screenshots pendentes |
| T2.4 | i18n PT + EN com seletor | Rotas `/en/` nativas do Astro; CV EN já existe |
| T2.5 | ~~Decap CMS~~ | Cancelada — decisão A2 foi MDX no repo |

---

## Fase 3 — Diferenciação (bloqueada até Fase 2)

| ID | Tarefa |
|----|--------|
| T3.1 | Seção Playground na home |
| T3.2 | Filtros de projetos por tecnologia |
| T3.3 | Widget GitHub activity |
| T3.4 | Animações scroll (GSAP/CSS) |
| T3.5 | PWA básico |

---

## Log de mudanças

| Data | Tarefa | Commit |
|------|--------|--------|
| 2026-07-29 | T0.1 | `87de5d8` `docs(roadmap): adicionar checkpoint e plano de atualização` |
| 2026-07-29 | T1.1 | `066c493` `docs: alinhar README, CRUD_GUIDE e admin com arquitetura estática` |
| 2026-07-29 | T1.2 | `2d3f0b1` `fix(i18n): corrigir chaves duplicadas de skills no hero` |
| 2026-07-29 | T1.3 | `9e0cac0` + `0871a13` `refactor(projects): unificar renderização via ProjectsAPI` (duplicado — retrabalho de agente) |
| 2026-07-29 | T1.4 | `6846163` `perf(projects): adicionar lazy loading nas imagens` |
| 2026-07-29 | T1.5 | `b3aa75a` `feat(seo): adicionar meta tags, favicon e open graph` |
| 2026-07-29 | T1.6 | `0a23854` `feat(contact): integrar formulário com EmailJS` |
| 2026-07-29 | T1.7 | `a5719bc` `fix(projects): escapar conteúdo dinâmico contra XSS` |
| 2026-07-29 | T1.8 | `5cd428d` `feat(admin): validar slug único e permitir importar JSON` |
| 2026-07-29 | (extra) | `924a3c3` `add(Kinetic): new project` — fora da convenção; deveria ser `feat(projects): ...` |
| 2026-07-30 | (fix) | `a1b595a` `fix(projects): corrigir barras inversar path imagens` |
| 2026-07-30 | Checkpoint A | decisões registradas em `DECISOES.md` |
| 2026-07-30 | E1 | `f03c6a4` `chore(seo): adicionar sitemap.xml referenciado pelo robots.txt` |
| 2026-07-30 | E5.1 + E5.2 | `4e395a9` `feat(projects): reescrever Kinetic, corrigir display e ajustar apresentacao UX/UI` |
| 2026-07-30 | (consistência) | `fd84115` `feat(projects): reescrever JetPack Guy no mesmo formato do Kinetic` |
| 2026-07-31 | E2.0 | `feat(projects): permitir títulos de seção customizados por projeto` |
