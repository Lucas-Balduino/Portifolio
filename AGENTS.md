# AGENTS.md

Contexto operacional para qualquer agente trabalhando **neste** repositório. Leia este arquivo inteiro antes de alteração estrutural.

## O que é este projeto

Portfólio pessoal publicado de Lucas Balduino (site estático hoje; migração Astro no ROADMAP). Visão completa: `docs/context/00-project-brief.md` — leia-o. Não resuma o brief aqui.

## Spec vs execução

A spec está em `docs/context/`. A lista de execução está em `ROADMAP.md`.

Se o autor pediu para avançar o projeto, implementar uma fase, ou “continuar o roadmap”:

- **Com** `ROADMAP.md`: não invente um plano. Siga o **Prompt mestre — agente** no topo. Uma tarefa.
- **Sem** `ROADMAP.md`: não invente um plano. A spec está em `docs/context/` (o `06` é o briefing). Gerar a lista é trabalho do `roadmap-sdd`.

Checkpoint A (stack, CMS, host, visual, idioma): `DECISOES.md`. Não contradizer A1–A5.

## Documentos de contexto (só os que existem)

- `docs/context/00-project-brief.md` — o que o repo é, para quem, dentro/fora, horizonte
- `docs/context/01-information-architecture.md` — páginas e pastas agora vs sitemap Astro
- `docs/context/02-content-model.md` — campos de projeto (JSON hoje, MDX depois)
- `docs/context/03-tech-stack.md` — stack agora vs migração
- `docs/context/04-design-system.md` — tokens atuais; acento/display pendentes
- `docs/context/06-roadmap-briefing.md` — restrições se for **alterar** o ROADMAP

Não há `05-editorial-guidelines.md`: este repo não é caderno de notas.

`ROADMAP.md` — SDD: prompts mestre, progresso, tarefas, aceite, commit.

`CRUD_GUIDE.md` — só vale enquanto `admin/` existir. `README.md` — como servir o estático.

## Onde está o conteúdo / o código

- Código e páginas: raiz (`*.html`, `style.css`, `main.js`, `projects.js`, `js/`, `admin/`)
- Cases: `data/projects.json` + `img/`
- CV: `Resume/`
- Spec: `docs/context/`
- Não misturar copy de case na spec nem copiar o AgentHub para este repo

## Regras que um agente não deve quebrar

- Não tratar horizonte (playground, PWA, GSAP, dark-first, `/en/`) como a próxima tarefa se o ROADMAP ainda está na paridade Astro.
- Não inventar dado não confirmado (usar `pendente`).
- Não marcar revisão humana / “case pronto” como verdadeira.
- Não scaffoldar Astro a menos que a **tarefa escolhida** do ROADMAP seja essa.
- Não escolher sozinho fork importante (pacotes, hex, fonte, URL Vercel).
- Não commitar `js/config.js` nem segredos.
- Paths de imagem com `/`. Não `git add -A`, não amend, não `--no-verify`, não force push.
- Uma tarefa por conversa; Windows: `git commit -m "type(id): descrição"`.

## Comandos esperados

```bash
npx serve .
# http://localhost:3000
# Admin: http://localhost:3000/admin/index.html
```

Comandos `astro` / `dev` / `build` só depois do scaffold da tarefa correspondente no ROADMAP — não inventar script aqui antes disso.
