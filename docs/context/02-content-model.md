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
order: number                   # substitui a ordem do array JSON; preservar a ordem atual
section_titles: record opcional
gallery: string[]               # substitui images_section CSV
draft: não usar                 # publicação = arquivo no repo
```

Corpo: headings alinhados às chaves `introduction` / `main_idea` / `technical_details` / `presentation` / `how_to_run` (ou aos títulos custom). Embed Figma continua iframe no MDX, com os parâmetros já estabilizados (`scaling=min-zoom`, `content-scaling=fixed`, sem `show-proto-sidebar`; `allowfullscreen` no iframe).

### Página estática (não é collection)

Sobre, contato, hero: copy no layout/página, não no modelo de projeto. i18n hoje = `main.js`; horizonte = strings por locale do Astro, cases traduzidos **gradualmente** (A5).

## Regras

- Não criar tipo “artigo”, “playground” ou “zine” até existir um arquivo real que não caiba em Projeto.
- Agência de Viagens permanece no JSON até o autor decidir remover; não exigir screenshots novos para a migração.
- Não inventar URL, hex, data de formatura diferente da que já está em `sobre.html`, nem atuação de grupo não confirmada.
- Path de imagem: sempre `/` (Windows Explorer gera `\` — rejeitar).
