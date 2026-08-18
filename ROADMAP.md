# ROADMAP — Portfólio Lucas Balduino

Spec em `docs/context/`. Este arquivo é **execução**: uma tarefa por conversa, aceite testável, um commit.

Agente: **não ler o ROADMAP inteiro**. Ler só **Como usar**, **Progresso** e a **tarefa escolhida**.

## Como usar

SDD neste repo: uma tarefa = um objetivo, docs explícitos, aceite testável, um commit. Sem “faça a fase inteira”. Tipo `autor` ou bloqueada: parar e mostrar o prompt do autor. Fases 0, 1 e E já cumpridas no site estático — não reabrir.

## Prompt mestre — agente

```text
Uma tarefa por conversa.
Ler AGENTS.md por completo.
Pegar a primeira - [ ] da fase mais baixa não bloqueada.
Tipo autor ou bloqueada: parar e dizer o prompt do autor.
Decisão registrada (pendente): perguntar, não chutar.
Só arquivos permitidos; fora de escopo à risca.
Testar → aceite → checkbox → commit da mensagem sugerida (Conventional Commits).
Não executar a próxima na mesma conversa.
```

## Prompt mestre — autor

Tarefas `autor` / `autor+agente`: o humano passa fatos; o agente só formata. Não confirmado = `pendente`. O agente não marca revisão humana como verdadeira. Forks (pacotes, URL Vercel, acento, fonte): responder na tarefa com **Decisão registrada** antes de o agente implementar.

## Prompt de continuação

```text
Continuar o ROADMAP: uma tarefa, a primeira aberta da fase mais baixa não bloqueada. Não pular gate do autor.
```

## Fechar uma tarefa

1. Implementar só o escopo da tarefa.
2. Testar com os passos de "Como testar".
3. Conferir todos os critérios de aceite.
4. Se passou: marcar `[x]` no Progresso **e** no título da tarefa.
5. Commit com a mensagem sugerida, só arquivos permitidos + `ROADMAP.md`.
6. Parar. Não puxar a próxima tarefa na mesma conversa.

Não marcar `[x]` por “quase pronto”, linter verde sem o teste da tarefa, ou arquivos escritos sem o aceite.

## Decisão do autor

Se a tarefa tiver **PARAR — decisão do autor** e **Decisão registrada:** `(pendente)`: não implementar. Perguntar. Esperar o autor gravar a decisão na tarefa.

## Regras permanentes

- Não `git add -A`; não amend; não force push; não `--no-verify`.
- Windows: `git commit -m "type(id): descrição"` (Conventional Commits, uma linha).
- Sem datas no ROADMAP. Horizonte ≠ backlog.
- Não commitar `js/config.js` nem segredos.
- Paths de imagem com `/`.
- Não apagar o site estático antes da paridade da Fase 2 (tarefa 2.14).

## Progresso

- [x] Fase 0 — Setup do site estático e ROADMAP legado
- [x] Fase 1 — Docs, i18n hero, render unificado, lazy, SEO, EmailJS, XSS, admin
- [x] Fase E — Sitemap, cases UnB, currículo, estabilidade, inscrição
- [ ] Fase 2 — Migração paridade Astro + MDX + Vercel
- [x] Tarefa 2.1 — Decidir gerenciador de pacotes
- [x] Tarefa 2.2 — Scaffold Astro com ilhas React
- [x] Tarefa 2.3 — Schema Content Collections e Kinetic em MDX
- [x] Tarefa 2.4 — Migrar os quatro projetos restantes para MDX
- [x] Tarefa 2.5 — Layout: header, footer, nav e tema
- [x] Tarefa 2.6 — Página home em paridade
- [x] Tarefa 2.7 — Listagem de projetos e cards
- [x] Tarefa 2.8 — Página de detalhe (seções, galeria, Figma)
- [ ] Tarefa 2.9 — Página Sobre e download do CV
- [ ] Tarefa 2.10 — Página Contato (mailto)
- [ ] Tarefa 2.11 — SEO: sitemap, robots, Open Graph
- [ ] Tarefa 2.12 — Criar projeto na Vercel
- [ ] Tarefa 2.13 — Ligar SITE_URL à URL Vercel
- [ ] Tarefa 2.14 — Aposentar HTML legado, admin e JSON runtime
- [ ] Fase 3 — Identidade dark-first
- [ ] Tarefa 3.1 — Decidir acento e fonte display
- [ ] Tarefa 3.2 — Tokens dark-first e light como alternativa
- [ ] Tarefa 3.3 — Aplicar identidade nas páginas
- [ ] Fase 4 — i18n PT + EN
- [ ] Tarefa 4.1 — Rotas `/` e `/en/` com seletor
- [ ] Tarefa 4.2 — Traduzir chrome (nav, hero, sobre, contato)
- [ ] Tarefa 4.3 — Fallback PT quando o case não tiver EN

### Decisões do autor

| Tarefa | O que decidir | Registrada |
|---|---|---|
| 2.1 | Gerenciador de pacotes (npm / pnpm / yarn) | **npm** |
| 2.12 | Projeto Vercel e URL de produção | `(pendente)` |
| 3.1 | Hex de acento + família display | `(pendente)` |
| 4.3 | Quais cases ganham EN depois do fallback | `(pendente)` — não bloqueia 4.3 |

---

## Fase 0 — Setup (histórico)

**Objetivo:** ROADMAP legado e baseline do estático.
**Pronto quando:** cumprido (commit `87de5d8` e seguintes).
**Depende de:** nada

Não reexecutar. Detalhe antigo não vira tarefa SDD.

## Fase 1 — Alta prioridade (histórico)

**Objetivo:** consertar docs, i18n, render, SEO, contato, XSS, admin.
**Pronto quando:** 8/8 no ROADMAP legado.
**Depende de:** Fase 0

## Fase E — Estabilização e candidatura (histórico)

**Objetivo:** cases UnB, currículo, checklist de estabilidade, inscrição CEIA.
**Pronto quando:** 5/5 no ROADMAP legado (`65401fd` e anteriores).
**Depende de:** Fase 1

---

## Fase 2 — Migração paridade Astro + MDX + Vercel

**Objetivo:** o mesmo portfólio (cinco projetos, sobre, contato, CV) em Astro com Content Collections, no ar na Vercel, sem perder conteúdo.
**Pronto quando:** critérios da 2.14 + URL Vercel servindo o build; site estático legado removido.
**Depende de:** Fase E (já `[x]`); gate 2.1

### Tarefa 2.1 — Decidir gerenciador de pacotes [x]

- **Tipo:** autor
- **Bloqueada por:** nada
- **Docs obrigatórios:** `docs/context/03-tech-stack.md`, `docs/context/06-roadmap-briefing.md`
- **Arquivos permitidos (novos):** nenhum
- **Arquivos permitidos (editar):** `ROADMAP.md`

**Pergunta:** Qual gerenciador de pacotes este repositório passa a usar no Astro?
**Opções:** npm / pnpm / yarn
**Decisão registrada:** `npm`

**Fazer:**

1. O autor responde com uma das opções.
2. O agente grava a escolha nesta tarefa (Decisão registrada + tabela Progresso) e commita só o ROADMAP.

**Fora de escopo:** criar `package.json`; instalar Astro; escolher hex ou URL.

**Critérios de aceite:**

- Decisão registrada diferente de `(pendente)`.
- Tabela de decisões do Progresso atualizada.

**Como testar:**

- Abrir este arquivo e ler a linha **Decisão registrada** da 2.1.

**Commit sugerido:** `docs(2.1): registra gerenciador de pacotes da migracao`

### Tarefa 2.2 — Scaffold Astro com ilhas React [x]

- **Tipo:** agente
- **Bloqueada por:** 2.1
- **Docs obrigatórios:** `AGENTS.md`, `docs/context/03-tech-stack.md`, `docs/context/01-information-architecture.md`
- **Arquivos permitidos (novos):** `package.json`, lockfile do gerenciador escolhido, `astro.config.*`, `tsconfig.json` se o scaffold gerar, `src/pages/index.astro`, `src/layouts/` se o scaffold gerar, `.gitignore` entradas de `node_modules`/`dist`, arquivos mínimos que o `create astro` exigir
- **Arquivos permitidos (editar):** `README.md`, `AGENTS.md`, `ROADMAP.md`, `.gitignore`

**Fazer:**

1. Scaffold Astro **estático** com integração React (`@astrojs/react`) no mesmo repositório, usando o gerenciador da 2.1.
2. Não apagar `index.html`, `data/`, `admin/` nem `img/` nesta tarefa.
3. `astro build` deve passar. Página index do Astro pode ser placeholder.
4. Documentar em `AGENTS.md` / `README.md` os comandos reais (`dev`, `build`) — sem inventar versão; usar a que o scaffold instalou.

**Fora de escopo:** MDX; migrar páginas; Vercel; dark-first; i18n; apagar o estático.

**Critérios de aceite:**

- `package.json` existe; lockfile do gerenciador da 2.1 existe.
- `astro.config` com output estático e React.
- `astro build` conclui sem erro.
- Arquivos HTML/JSON atuais ainda no repo.

**Como testar:**

- Rodar o comando de build do gerenciador escolhido.
- Confirmar que `index.html` da raiz e `data/projects.json` ainda existem.

**Commit sugerido:** `build(2.2): adiciona scaffold astro com ilhas react`

### Tarefa 2.3 — Schema Content Collections e Kinetic em MDX [x]

- **Tipo:** agente
- **Bloqueada por:** 2.2
- **Docs obrigatórios:** `docs/context/02-content-model.md`, `data/projects.json`
- **Arquivos permitidos (novos):** `src/content.config.*` (ou path equivalente do Astro), `src/content/projects/kineticFitnessApp.mdx`
- **Arquivos permitidos (editar):** `ROADMAP.md`, `astro.config.*` se precisar habilitar MDX

**Fazer:**

1. Definir collection `projects` com os campos do `02` (frontmatter + body).
2. Migrar **somente** Kinetic: metadados, galeria como lista, seções no corpo, ordem `1`.
3. Não reescrever o case; copiar o conteúdo já publicado no JSON (HTML→MDX fiel).
4. Schema rejeita slug vazio.

**Fora de escopo:** os outros quatro projetos; páginas de detalhe visíveis; admin.

**Critérios de aceite:**

- Collection valida no build.
- Um arquivo MDX Kinetic com `slug` `kineticFitnessApp` e os campos obrigatórios do `02`.
- `astro build` passa.

**Como testar:**

- Conferir frontmatter contra `02` e contra o objeto Kinetic no JSON.
- Rodar `astro build`.

**Commit sugerido:** `feat(2.3): adiciona collection de projetos e case kinetic em mdx`

### Tarefa 2.4 — Migrar os quatro projetos restantes para MDX [x]

- **Tipo:** agente
- **Bloqueada por:** 2.3
- **Docs obrigatórios:** `docs/context/02-content-model.md`, `data/projects.json`
- **Arquivos permitidos (novos):** `src/content/projects/mapaVirtualIdA.mdx`, `src/content/projects/descubraCerrado.mdx`, `src/content/projects/jetPackGuy.mdx`, `src/content/projects/agenciaDeViagens.mdx`
- **Arquivos permitidos (editar):** `ROADMAP.md`

**Fazer:**

1. Migrar IdA, Cerrado, JetPack Guy e Agência com a mesma fidelidade da 2.3.
2. Preservar `section_titles` onde existirem; embeds Figma (parâmetros já estáveis) no corpo de IdA e Cerrado.
3. `order`: IdA 2, Cerrado 3, JetPack 4, Agência 5.
4. Paths de imagem com `/`.

**Fora de escopo:** novas screenshots; redesign dos cases; página de detalhe.

**Critérios de aceite:**

- Cinco MDX no total; slugs iguais aos do JSON.
- Build valida a collection.
- Nenhum path com `\`.

**Como testar:**

- Diff conceitual: cada campo do JSON tem correspondente no MDX.
- `astro build`.

**Commit sugerido:** `feat(2.4): migra ida cerrado jetpack e agencia para mdx`

### Tarefa 2.5 — Layout: header, footer, nav e tema [x]

- **Tipo:** agente
- **Bloqueada por:** 2.2
- **Docs obrigatórios:** `docs/context/04-design-system.md`, `index.html`, `style.css`, `main.js`
- **Arquivos permitidos (novos):** componentes/layouts em `src/` (Header, Footer, Layout)
- **Arquivos permitidos (editar):** `src/` CSS ou `style.css` importado, `ROADMAP.md`

**Fazer:**

1. Replicar nav (Início, Projetos, Sobre, Contato), brand `lucas.`, footer social (email, GitHub, LinkedIn, Instagram) e toggle de tema com `localStorage`.
2. Default **light** (paridade). Não implementar dark-first (Fase 3).
3. Ilha React só se o toggle precisar; senão script Astro/vanilla.

**Fora de escopo:** i18n seletor; hex novo; páginas de conteúdo; PWA.

**Critérios de aceite:**

- Layout usado por uma página de teste ou index Astro mostra nav e footer.
- Toggle persiste recarregando a página.
- Links sociais iguais aos do HTML atual.

**Como testar:**

- `astro dev`: clicar cada link da nav; alternar tema; recarregar.

**Commit sugerido:** `feat(2.5): replica header footer nav e toggle de tema`

### Tarefa 2.6 — Página home em paridade [x]

- **Tipo:** agente
- **Bloqueada por:** 2.3, 2.5
- **Docs obrigatórios:** `index.html`, `docs/context/01-information-architecture.md`
- **Arquivos permitidos (novos):** `src/pages/index.astro` (substituir placeholder)
- **Arquivos permitidos (editar):** componentes da home em `src/`, `ROADMAP.md`

**Fazer:**

1. Hero com o copy atual (designer + UX/UI), foto `img/FotoMinha.jpg`, CTAs Ver projetos / Contrate-me, skills rápidas.
2. Três projetos: os de `order` 1–3 (Kinetic, IdA, Cerrado), não hardcodar títulos no HTML além do que vier da collection.
3. Sem cards estáticos duplicados.

**Fora de escopo:** listagem completa; detalhe; i18n EN.

**Critérios de aceite:**

- Home mostra exatamente 3 cards, ordem Kinetic → IdA → Cerrado.
- Copy do hero igual ao `index.html` atual (PT).

**Como testar:**

- `astro dev`: conferir textos e ordem dos cards contra a home estática.

**Commit sugerido:** `feat(2.6): implementa home astro em paridade`

### Tarefa 2.7 — Listagem de projetos e cards [x]

- **Tipo:** agente
- **Bloqueada por:** 2.4, 2.5
- **Docs obrigatórios:** `projetos.html`, `projects.js` (`renderProjectCard`), `style.css` (`.card-tags`, `.card-actions`)
- **Arquivos permitidos (novos):** `src/pages/projetos.astro` (ou slug equivalente da IA), componente de card
- **Arquivos permitidos (editar):** `ROADMAP.md`, CSS do card

**Fazer:**

1. Página lista os cinco projetos por `order`.
2. Card: capa, título, `short_desc`, tags, ações GitHub / Live Demo / Ver detalhes só quando houver URL — grid de ações no rodapé (paridade E4), sem `margin-left: auto` misturando tags e botões.

**Fora de escopo:** filtros; playground.

**Critérios de aceite:**

- Cinco cards; Kinetic sem Live Demo; IdA/Cerrado sem GitHub; JetPack com os três links; Agência sem Live Demo.
- Tags e botões em regiões separadas.

**Como testar:**

- Abrir `/projetos` e comparar com `projetos.html` servido pelo `npx serve` legado.

**Commit sugerido:** `feat(2.7): lista projetos com cards em paridade`

### Tarefa 2.8 — Página de detalhe (seções, galeria, Figma) [x]

- **Tipo:** agente
- **Bloqueada por:** 2.4, 2.5
- **Docs obrigatórios:** `projeto.html`, `projects.js` (`renderProjectDetail`, `formatRichText`), `docs/context/02-content-model.md`
- **Arquivos permitidos (novos):** `src/pages/projetos/[slug].astro` (ou equivalente)
- **Arquivos permitidos (editar):** `ROADMAP.md`, CSS de detalhe/galeria/`.figma-embed`

**Fazer:**

1. Rota por slug; 404 se não existir.
2. Renderizar seções na ordem do modelo; omitir seção vazia; usar `section_titles` quando houver.
3. Galeria: paisagem vs retrato como hoje (`is-landscape`).
4. Embeds Figma: mesmos parâmetros estáveis; `allowfullscreen`.
5. Copiar `img/` para `public/img/` **se** o Astro não servir a pasta atual — só o necessário para as imagens dos cinco projetos + capa.

**Fora de escopo:** admin; i18n do corpo; lightbox novo.

**Critérios de aceite:**

- Os cinco slugs abrem. Slug inexistente não quebra o build e mostra fallback.
- IdA e Cerrado mostram iframe Figma.
- Imagens das galerias carregam.

**Como testar:**

- Abrir cada slug; inspecionar um iframe; quebrar um slug na URL.

**Commit sugerido:** `feat(2.8): renderiza detalhe de projeto a partir do mdx`

### Tarefa 2.9 — Página Sobre e download do CV

- **Tipo:** agente
- **Bloqueada por:** 2.5
- **Docs obrigatórios:** `sobre.html`
- **Arquivos permitidos (novos):** `src/pages/sobre.astro`
- **Arquivos permitidos (editar):** `ROADMAP.md`; copiar `Resume/` para `public/Resume/` se necessário

**Fazer:**

1. Paridade de seções: quem sou, formação (Design UnB e CC UniCEUB), experiência (CAL, monitor, projetos), skills, idiomas, disponibilidade.
2. Botão Baixar Currículo aponta para `Resume/CurriculoPT.pdf` (não renomear o arquivo).

**Fora de escopo:** reescrever biografia; CV EN na UI (arquivo já existe; link EN só na Fase 4 se o autor pedir).

**Critérios de aceite:**

- Copy PT alinhado a `sobre.html`.
- Download do PDF responde 200 no `astro preview` / `dev`.

**Como testar:**

- Diff visual/textual contra `sobre.html`; clicar o download.

**Commit sugerido:** `feat(2.9): implementa pagina sobre e download do cv`

### Tarefa 2.10 — Página Contato (mailto)

- **Tipo:** agente
- **Bloqueada por:** 2.5
- **Docs obrigatórios:** `contato.html`, `js/contact.js`, `docs/context/03-tech-stack.md`
- **Arquivos permitidos (novos):** `src/pages/contato.astro`
- **Arquivos permitidos (editar):** `ROADMAP.md`

**Fazer:**

1. Página com email direto `lucasgbalduino@gmail.com` e o mesmo copy de disponibilidade.
2. Formulário: ou mailto/`mailto:` de fallback visível, ou estados de “use o email direto” se EmailJS não estiver configurado. **Não** commitar chaves.
3. Não implementar env Vercel nesta tarefa (fork em aberto).

**Fora de escopo:** `js/config.js` no git; backend.

**Critérios de aceite:**

- Email direto clicável.
- Sem 404 de `config.js` no HTML publicado.
- Sem segredos no commit.

**Como testar:**

- Network: nenhum `config.js` obrigatório no `index.html` da página.
- Clique no mailto.

**Commit sugerido:** `feat(2.10): implementa contato com mailto como fallback`

### Tarefa 2.11 — SEO: sitemap, robots, Open Graph

- **Tipo:** agente
- **Bloqueada por:** 2.6, 2.7, 2.8, 2.9, 2.10
- **Docs obrigatórios:** `docs/context/01-information-architecture.md`, `js/site-config.js`, `sitemap.xml`, `robots.txt`
- **Arquivos permitidos (novos):** integração sitemap Astro se o scaffold precisar
- **Arquivos permitidos (editar):** `src/pages` heads, `public/robots.txt`, `ROADMAP.md`, `js/site-config.js` só se ainda for a fonte — senão equivalente Astro

**Fazer:**

1. Cada rota pública: `title`, `description`, OG, canonical. Detalhe: title do projeto.
2. Sitemap com home, projetos, sobre, contato e os cinco slugs.
3. `robots.txt` aponta para o sitemap. Favicon linkado.
4. URL base: enquanto 2.12 estiver pendente, usar a Pages atual **ou** placeholder documentado — não inventar `*.vercel.app`.

**Fora de escopo:** analytics; domínio custom pago.

**Critérios de aceite:**

- Build gera sitemap cobrindo as rotas da IA “horizonte” em PT (sem `/en/` ainda).
- Nenhuma página pública sem description.

**Como testar:**

- Abrir o sitemap gerado; view-source de home e de um detalhe.

**Commit sugerido:** `feat(2.11): adiciona seo sitemap e open graph no astro`

### Tarefa 2.12 — Criar projeto na Vercel

- **Tipo:** autor
- **Bloqueada por:** 2.11
- **Docs obrigatórios:** `docs/context/03-tech-stack.md`, `DECISOES.md`
- **Arquivos permitidos (novos):** nenhum
- **Arquivos permitidos (editar):** `ROADMAP.md`

> **PARAR — decisão do autor.** Não inventar URL.

**Pergunta:** Qual é a URL de produção na Vercel (projeto criado, deploy de preview ou production ok)?
**Opções:** colar a URL `https://….vercel.app` (ou domínio que o autor ligou)
**Decisão registrada:** `(pendente)`

**Fazer:**

1. Autor cria o projeto na Vercel apontando este repo, output estático.
2. Agente grava a URL nesta tarefa e na tabela de decisões.

**Fora de escopo:** desligar GitHub Pages; custom domain pago se o autor não tiver.

**Critérios de aceite:**

- URL registrada ≠ `(pendente)`.
- Autor confirma que um deploy respondeu 200.

**Como testar:**

- Abrir a URL no browser (autor confirma).

**Commit sugerido:** `docs(2.12): registra url de producao na vercel`

### Tarefa 2.13 — Ligar SITE_URL à URL Vercel

- **Tipo:** agente
- **Bloqueada por:** 2.12
- **Docs obrigatórios:** tarefa 2.12 (URL gravada), `docs/context/03-tech-stack.md`
- **Arquivos permitidos (editar):** config de site/canonical/sitemap/`README.md`/`AGENTS.md`/`ROADMAP.md`

**Fazer:**

1. Substituir `https://lucas-balduino.github.io/Portifolio` pela URL da 2.12 em canonical, OG, sitemap, README.
2. Não deixar `SITE_URL` apontando para Pages se a produção passou a ser Vercel.

**Fora de escopo:** apagar HTML legado (2.14); DNS extra.

**Critérios de aceite:**

- Nenhuma canonical de página Astro aponta para github.io, salvo menção histórica no README.
- Sitemap usa a URL nova.

**Como testar:**

- Grep por `github.io/Portifolio` nos arquivos da build Astro / `src/`.

**Commit sugerido:** `chore(2.13): aponta canonical e sitemap para a vercel`

### Tarefa 2.14 — Aposentar HTML legado, admin e JSON runtime

- **Tipo:** agente
- **Bloqueada por:** 2.13
- **Docs obrigatórios:** `docs/context/01-information-architecture.md`, `CRUD_GUIDE.md`
- **Arquivos permitidos (editar):** remover ou parar de publicar: `index.html`, `projetos.html`, `projeto.html`, `sobre.html`, `contato.html`, `admin/`, `projects.js` de runtime, `data/projects.json` **se** os cinco MDX já forem a fonte; `CRUD_GUIDE.md` (marcar obsoleto ou apagar); `README.md`; `AGENTS.md`; `ROADMAP.md`

**Fazer:**

1. Só depois de a URL Vercel servir home, lista, cinco detalhes, sobre, contato e CV.
2. Remover o pipeline JSON+admin da produção. Manter `img/` e `Resume/` onde o Astro servir (`public/`).
3. README descreve `astro dev` / `astro build`, não `npx serve .` como fluxo principal.

**Fora de escopo:** Fase 3 visual; i18n; reescrever cases.

**Critérios de aceite:**

- Produção não serve `admin/index.html`.
- Conteúdo dos cinco projetos ainda visível via MDX.
- README sem instruir o admin como fluxo atual.

**Como testar:**

- `astro build` + `astro preview`: rotas da Fase 2 abrem; `/admin` não.
- Conferir os cinco slugs.

**Commit sugerido:** `refactor(2.14): aposenta html admin e json em favor do astro`

---

## Fase 3 — Identidade dark-first

**Objetivo:** A4 — dark como padrão, light alternativa, acento e display definidos pelo autor.
**Pronto quando:** 3.3 aceita; tema default é dark.
**Depende de:** Fase 2 (2.14)

### Tarefa 3.1 — Decidir acento e fonte display

- **Tipo:** autor
- **Bloqueada por:** 2.14
- **Docs obrigatórios:** `docs/context/04-design-system.md`, `DECISOES.md`
- **Arquivos permitidos (editar):** `docs/context/04-design-system.md`, `ROADMAP.md`

> **PARAR — decisão do autor.** Não implementar tokens enquanto **Decisão registrada** for `(pendente)`.

**Pergunta:** Qual hex de acento e qual família display?
**Opções:** (a) Kinetic `#005CEE` + Lexend; (b) outros valores que o autor gravar aqui
**Decisão registrada:** `(pendente)`

**Fazer:**

1. Autor escolhe. Agente preenche a tabela de paleta no `04` e esta tarefa.

**Fora de escopo:** aplicar CSS; GSAP; ícones SVG (artefato opcional, ver Fora).

**Critérios de aceite:**

- `04` com hex e fonte **sem** `(pendente)` nesses dois tokens.
- Tabela de decisões do Progresso atualizada.

**Como testar:**

- Ler `04` seção horizonte.

**Commit sugerido:** `docs(3.1): registra acento e fonte display`

### Tarefa 3.2 — Tokens dark-first e light como alternativa

- **Tipo:** agente
- **Bloqueada por:** 3.1
- **Docs obrigatórios:** `docs/context/04-design-system.md`
- **Arquivos permitidos (editar):** CSS/tokens em `src/`, `ROADMAP.md`

**Fazer:**

1. Default do documento = dark. Light via toggle (persistir `localStorage`).
2. Aplicar acento e display da 3.1. Não inventar hex extra.

**Fora de escopo:** redesenhar cases no Figma; animações de scroll.

**Critérios de aceite:**

- Sem classe extra, a primeira pintura é dark.
- Toggle light funciona e persiste.
- Acento = hex da 3.1.

**Como testar:**

- Janela anônima: fundo dark. Alternar, recarregar.

**Commit sugerido:** `feat(3.2): define tokens dark-first e acento do autor`

### Tarefa 3.3 — Aplicar identidade nas páginas

- **Tipo:** agente
- **Bloqueada por:** 3.2
- **Docs obrigatórios:** `docs/context/04-design-system.md`
- **Arquivos permitidos (editar):** páginas/componentes em `src/`, `ROADMAP.md`

**Fazer:**

1. Hero, cards, detalhe, sobre, contato usando os tokens. Display grande no hero/títulos de página.
2. Embeds Figma continuam usáveis (não voltar `overflow: hidden` que quebra fullscreen).

**Fora de escopo:** playground; PWA; novos projetos.

**Critérios de aceite:**

- Nenhuma página pública com acento hardcoded antigo (`#111111` como marca) se o `04` mandou outro.
- Cards ainda com tags e ações separadas.

**Como testar:**

- Percorrer home, lista, um case Figma, sobre, contato em dark e light.

**Commit sugerido:** `feat(3.3): aplica identidade dark-first nas paginas`

---

## Fase 4 — i18n PT + EN

**Objetivo:** A5 — PT na `/`, EN em `/en/`, seletor manual; cases em EN só quando o autor traduzir.
**Pronto quando:** 4.3 aceita (chrome EN + fallback de case).
**Depende de:** Fase 2; default sequencial depois da Fase 3 (ver `06`)

### Tarefa 4.1 — Rotas `/` e `/en/` com seletor

- **Tipo:** agente
- **Bloqueada por:** 3.3
- **Docs obrigatórios:** `docs/context/01-information-architecture.md`, `DECISOES.md`, `docs/context/03-tech-stack.md`
- **Arquivos permitidos (novos):** `src/pages/en/**`
- **Arquivos permitidos (editar):** `astro.config.*`, header (seletor), `ROADMAP.md`

**Fazer:**

1. i18n nativo Astro: default PT, prefixo `/en/` para EN.
2. Seletor no header (manual). Detecção `navigator.language` vira fallback no máximo, não substitui o seletor.
3. Não adicionar ES como locale.

**Fora de escopo:** traduzir cases; CV EN obrigatório no botão.

**Critérios de aceite:**

- `/` e `/en/` (ou `/en`) abrem a home.
- Seletor troca o locale e persiste (localStorage ou cookie — o que o Astro i18n já usar; não inventar terceiro sistema).

**Como testar:**

- Navegar PT→EN→PT; recarregar; conferir prefixo na URL.

**Commit sugerido:** `feat(4.1): adiciona rotas pt en e seletor de idioma`

### Tarefa 4.2 — Traduzir chrome (nav, hero, sobre, contato)

- **Tipo:** agente
- **Bloqueada por:** 4.1
- **Docs obrigatórios:** `main.js` (dicionário `en` existente), `sobre.html`, `contato.html`
- **Arquivos permitidos (novos):** arquivos de mensagem `src/` i18n
- **Arquivos permitidos (editar):** páginas, `ROADMAP.md`

**Fazer:**

1. Traduzir nav, hero, footer, sobre (seções), contato (labels). Reusar o EN já existente em `main.js` como base — não inventar tom novo.
2. PT permanece a fonte no HTML/MD das páginas PT.

**Fora de escopo:** traduzir corpos dos cinco MDX.

**Critérios de aceite:**

- `/en/` mostra nav e hero em inglês.
- `/` permanece em português.

**Como testar:**

- Comparar chaves EN de `main.js` com o que aparece em `/en/`.

**Commit sugerido:** `feat(4.2): traduz chrome do site para ingles`

### Tarefa 4.3 — Fallback PT quando o case não tiver EN

- **Tipo:** agente
- **Bloqueada por:** 4.2
- **Docs obrigatórios:** `docs/context/02-content-model.md`, `docs/context/06-roadmap-briefing.md`
- **Arquivos permitidos (editar):** páginas de detalhe/lista, collection se precisar de campo de locale, `ROADMAP.md`

**Fazer:**

1. Em `/en/projetos/...`, se não houver corpo EN, mostrar o PT com aviso curto (“conteúdo em português”) — não inventar tradução.
2. Não traduzir os cinco cases nesta tarefa.

**Fora de escopo:** quota de tradução; ES.

**Critérios de aceite:**

- Detalhe EN de um case só-PT não fica em branco e não alucina texto.
- Lista EN ainda lista os cinco projetos.

**Como testar:**

- Abrir `/en/` + slug Kinetic (sem MDX EN): aviso + texto PT visível.

**Commit sugerido:** `feat(4.3): usa fallback pt nos cases sem traducao`

---

## Fora do roadmap atual

Não executar até o autor pedir um novo briefing `06`:

- Playground na home; filtros por tecnologia; widget GitHub; animações GSAP; PWA (antiga Fase 3).
- Screenshots da Agência de Viagens; GIF/vídeo JetPack Guy; ícones SVG das redes.
- Terceiro idioma (ES do `main.js`).
- EmailJS com env na Vercel (mailto basta até o autor configurar).
- Agrupamento “design gráfico e editorial” UnB.
- Domínio custom pago; desligar GitHub Pages (o autor decide depois da 2.13).
- Conteúdo CAL/UnB no portfólio (experiência no Sobre já existe; produto do acervo não é case ainda).
