# 00 — Project brief

## O que é

Portfólio pessoal **já publicado** de Lucas Balduino: site estático (HTML/CSS/JS na raiz) com cinco projetos em `data/projects.json`, páginas Início / Projetos / Detalhe / Sobre / Contato, e painel `admin/` que exporta JSON. O visitante vê um designer e desenvolvedor UX/UI em formação (Design UnB + Ciência da Computação UniCEUB). Não é um caderno de notas nem um CMS; é um site de candidatura que o autor mantém sozinho.

## Por que existe

Recrutadores e o próprio autor precisam de um lugar único onde case studies (Figma + produto) e projetos de código apareçam com o mesmo nível de cuidado — problema, processo, resultado — sem depender de LinkedIn ou de um PDF. O site atual cumpre isso; JSON como fonte de verdade já apertou (HTML em strings, títulos de seção gambiarrados, admin sem `section_titles`).

## Para quem é (agora)

1. **Lucas** — único autor e operador (edita conteúdo, commita, publica).
2. **Recrutadores / gestores de produto** que abrem o link do currículo — em especial vagas de UX/UI e front-end. Visitante anônimo no GitHub Pages não muda o destinatário: não há conta, feed nem submissão pública.

## Como o projeto avança

O artefato útil **já existe** (site no ar, inscrição CEIA enviada, Fase E do ROADMAP antigo fechada). O próximo passo não é “começar um site”: é **migrar o mesmo conteúdo** para a stack decidida no Checkpoint A (Astro + MDX + Vercel), depois identidade dark-first e i18n PT+EN. Loop: uma tarefa SDD → aceite testável → um commit. Conteúdo novo só quando o autor tiver case real; não preencher vitrine por quota.

## Escopo — dentro (agora)

1. Manter o site estático **estável** até a migração ter paridade (mesmas páginas, mesmos cinco projetos, CV baixável).
2. Documentar spec (`docs/context/`) e lista executável (`ROADMAP.md`) para a Fase 2.
3. Preparar a migração: Content Collections MDX no lugar de `projects.json`; aposentar `admin/` **depois** da paridade.

## Escopo — fora (agora)

- Playground, filtros por stack, widget GitHub, animações GSAP, PWA (antiga Fase 3).
- Redesign dark-first e seletor PT/EN **antes** da paridade Astro (são fases seguintes, já decididas, não o primeiro commit).
- Inventar projetos, traduzir todos os cases de uma vez, ou redesenhar IdA/Cerrado.
- Screenshots da Agência de Viagens e GIF do JetPack Guy — artefatos do autor, não bloqueiam a migração.
- Backend, auth, CMS hospedado, domínio pago.

## Critério de sucesso (agora)

Abrir o portfólio e conseguir explicar, em poucos cliques, quem é o autor e o que ele fez nos cases de design e nos projetos de código — sem console quebrado e sem conteúdo inventado. A spec + ROADMAP SDD permitem que um modelo menor execute **uma** tarefa da migração sem reabrir a Fase E.

## Horizonte (não é o foco agora)

Site em Astro com ilhas React, cases em MDX, deploy na Vercel, visual dark-first premium, rotas `/` (PT) e `/en/` com seletor. Depois: diferenciação (playground, filtros, PWA). Documentar isso evita reinventar a stack; **não autoriza** tratar o horizonte como backlog da próxima conversa.
