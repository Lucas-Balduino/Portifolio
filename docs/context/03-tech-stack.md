# 03 — Stack técnica

Separar **agora** e **quando**. Não scaffoldar o “quando” para desbloquear a spec. Decisões A1–A5 estão em [`DECISOES.md`](../../DECISOES.md).

## Agora

| Decisão | Escolha | Por quê |
|---|---|---|
| Formato / linguagem | HTML + CSS + JS vanilla, sem bundler | Site já no ar; GitHub Pages na raiz |
| Dados | `data/projects.json` | CRUD via `admin/` + download; um commit publica |
| Onde vive | Arquivos na raiz do repo (não há `public/` de app) | |
| Versionamento | Git neste repositório (`main`) | |
| Preview / rodar | `npx serve .` (HTML legado) e `npm run dev` / `npm run build` (Astro) | Admin JSON ainda precisa do serve na raiz |
| Hosting | GitHub Pages — `https://lucas-balduino.github.io/Portifolio` | `SITE_URL` em `js/site-config.js` |
| Contato | Formulário + EmailJS **se** `js/config.js` local existir; senão mailto `lucasgbalduino@gmail.com` | `config.js` no `.gitignore`; em produção o HTML não referencia o arquivo (E4) |
| i18n | Detecção `navigator.language`; dicionário EN/ES em `main.js`; sem seletor | PT é o default do HTML |
| Tema | Light default; `.theme-dark` no `body`; persistência `localStorage` | Tokens em `style.css` |
| Gerenciador de pacotes | **npm** (2.1) | Decisão do autor; Kinetic também usa npm |
| Runtime | **Node ≥ 22.12** (`.nvmrc`) | Astro 7 |

## Quando passar à migração (Fase 2 do ROADMAP)

Critério (não data): spec + ROADMAP SDD prontos **e** o autor destravar o projeto Vercel (`06`). Gerenciador: **npm**. A candidatura CEIA já foi enviada; a migração não espera vaga.

| Decisão | Escolha | Por quê |
|---|---|---|
| Framework | **Astro 7 + ilhas React** (A1; `astro@7.2.2`, `@astrojs/react@6.0.2`) | React já usado no Kinetic; islands sem SPA inteira; OG por rota |
| Conteúdo | **MDX + Content Collections** (A2) | Cases longos em string JSON sofrem; schema no build; admin HTML aposenta |
| Estilo / UI | CSS do próprio site no início (paridade); dark-first na fase seguinte (A4) | Não misturar scaffold com redesign |
| Deploy | **Vercel** (A3), output estático | Preview por PR; URL final `(pendente)` |
| i18n | **PT + EN**, rotas `/` e `/en/`, seletor manual (A5) | **Depois** da paridade; ES atual do `main.js` não faz parte de A5 — não promover a terceiro locale sem o autor |
| Adapter | Estático (`output: 'static'` / adapter estático) | Decisão A3 + “scaffold Astro estático” em `DECISOES.md` |
| Pacotes | **npm** (2.1) | Autor escolheu npm |
| EmailJS no Vercel | `(pendente)` | E4 adotou mailto até haver env ou `config` no host novo |

Forks ainda abertos: listar no `06`, não escolher aqui. Não inventar versão do Astro nem nome do projeto Vercel.
