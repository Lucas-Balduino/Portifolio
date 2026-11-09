# 02 — Modelo de conteúdo

Fonte de verdade dos campos de **projeto**. Não inventar campo no JSON/MDX sem atualizar este arquivo. Valores não confirmados: `pendente`.

## Rascunho vs. revisado

Não há flag `revisado_por_curador`. Publicação = o autor commita `data/projects.json` (hoje) ou o `.mdx` (horizonte). O agente **não** marca case como “pronto para vaga” nem inventa atuação individual (`[CONFIRMAR]` e equivalentes).

## Tipos

### Projeto (único tipo de conteúdo de vitrine)

Um registro por case. Campos **agora** em `data/projects.json`:

```text
id: number
title: string
slug: string                    # único; usado na query ?slug=
short_desc: string              # card
image_url: string               # capa; path com / nunca \
repo_url: string                # "" se não houver
live_url: string                # "" se não houver (demo Figma ou site)
technologies: string            # lista separada por vírgula
description: string             # fallback se seções ricas vazias; hoje em geral ""
introduction: string            # HTML rico ou vazio (seção some)
main_idea: string
images_section: string          # paths separados por vírgula
technical_details: string
presentation: string
how_to_run: string              # pode incluir <iframe> de embed Figma
section_titles: object|ausente  # chaves opcionais: introduction, main_idea, images,
                                # technical_details, presentation, how_to_run
```

`section_titles` ausente = rótulos padrão de código (“Detalhes Técnicos”, “Como Executar”). Cases de design (IdA, Cerrado) **já usam** o objeto.

Campos simples (`title`, `short_desc`, `technologies`, URLs, `alt`) são escapados na renderização. Campos ricos passam por `formatRichText()` — conteúdo confiável, só o autor edita.

### Mapeamento horizonte (MDX, não criar arquivos agora)

Quando A2 valer: um arquivo `src/content/projects/<slug>.mdx`. Frontmatter = metadados; corpo = seções em Markdown/MDX no lugar das strings HTML.

```text
title, slug, short_desc, image, repo_url, live_url, technologies[]
                                # technologies: nomes listados em src/lib/technologies.ts
                                # viram "Ferramentas" com ícone (simple-icons); o resto
                                # vira "Competências" em texto. Ferramenta nova = mapear lá.
order: number                   # substitui a ordem do array JSON; preservar a ordem atual
section_titles: record opcional
gallery: string[]               # substitui images_section CSV
design_system: objeto opcional  # painel visual após a ideia principal:
                                # title?, colors[{name, hex}] (com botão de
                                # copiar), fonts[{role, family, weights?, webfont}],
                                # link?{href, label}. Padrão único para todos os
                                # cases: sem escalas de tom nem prints de
                                # componentes. `webfont: true` só se a família
                                # existir no Google Fonts.
summary: objeto opcional        # ficha no topo do case: type, context, period,
                                # advisor, role, team, deliverable (todos string).
                                # "pendente" ou ausente = não aparece. Só o autor
                                # confirma role/team/period — agente não inventa.
draft: não usar                 # publicação = arquivo no repo
```

Corpo: headings alinhados às chaves `introduction` / `main_idea` / `technical_details` / `presentation` / `how_to_run` (ou aos títulos custom). Embed Figma continua iframe no MDX, com os parâmetros já estabilizados (`scaling=scale-down-width`, `content-scaling=fixed`, `hide-ui=1`, sem `show-proto-sidebar`), seguido do botão `.figma-open` "Abrir em tela cheia no Figma".

Menos texto corrido no corpo:

- Seção `##` com dois ou mais `###` vira **grade de cards**, um por subtítulo (2 ou 4 cards = duas colunas). Texto antes do primeiro `###` vira introdução da seção.
- Uma linha `![alt](/img/...)` (com `/` no início, senão o MDX tenta importar o arquivo) dentro do `###` vira a **imagem do card**. Se a imagem estiver na `gallery`, clicar nela abre a galeria ampliada.
- `> pergunta` vira citação em destaque (a pergunta que orientou o projeto).
- Escrever para cards: 1 a 3 frases ou até 4 tópicos curtos por subtítulo.

### Página estática (não é collection)

Sobre, contato, hero: copy no layout/página, não no modelo de projeto. i18n hoje = `main.js`; horizonte = strings por locale do Astro, cases traduzidos **gradualmente** (A5).

## Regras

- Não criar tipo “artigo”, “playground” ou “zine” até existir um arquivo real que não caiba em Projeto.
- Agência de Viagens **retirada do site pelo autor** (por enquanto). O MDX e a imagem estão no histórico do git; voltar só se o autor pedir.
- Não inventar URL, hex, data de formatura diferente da que já está em `sobre.html`, nem atuação de grupo não confirmada.
- Path de imagem: sempre `/` (Windows Explorer gera `\` — rejeitar).
