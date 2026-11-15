# 04 — Sistema visual

Direção **do site**. Não aplicar tokens novos nesta conversa da spec. Hex novo só com o autor nesta tabela.

## Intenção (quando houver UI)

**Agora:** vitrine clara, light-first, acento quase preto, Inter, cards com tags separadas das ações (E4). Serve para ler cases e baixar CV.

**Horizonte (A4):** dark-first premium — dark como padrão, tipografia display grande, gradientes sutis; light vira alternativa. Não é “tema genérico de SaaS”: é o mesmo portfólio, mais próximo de produto de design do que de template de desenvolvedor.

## Paleta

### Agora (código em `style.css`)

| Token | Hex / valor | Uso |
|---|---|---|
| `--bg` | `#ffffff` light / `#0b0b0d` dark | Fundo |
| `--surface` | `#f7f7f8` / `#0f1113` | Cards, header |
| `--text` | `#0b0b0b` / `#f5f5f6` | Texto |
| `--muted` | `#5d5d66` / `#9a9aa2` | Descrições (contraste ≥ 4.5:1 nos dois temas) |
| `--accent` | `#111111` / `#ffffff` | Títulos, links, botão primário do card |
| `--glass` | preto/branco em alpha | Bordas, chips, botões secundários |
| `--radius` | `8px` | Cards, blocos, foto; botões e chips `6px`; pílulas e círculos ficam como estão |

### Horizonte (A4)

| Token | Hex / família | Uso |
|---|---|---|
| Acento | `#F5F5F6` | CTA, links, foco. Monocromático (3.1): contraste com os prints coloridos dos cases. Não é Kinetic `#005CEE` nem Cursor `#F54E00`. |
| Display | **Inter** (Syne descartada pelo autor) | Títulos grandes (hero / títulos de página) via `--font-display`. Nova display = `(pendente)`, decisão do autor. |
| Fundo dark | `(pendente)` até a 3.2 | Superfícies e texto no default dark — tokens atuais de `style.css` até a 3.2 aplicar |

Não copiar a paleta por modalidade do Kinetic para o site inteiro.

Fundo liso (`--bg`), sem brilho radial. Seleção de texto, contorno de foco e barra de rolagem usam a paleta (branco/cinza no escuro, preto/cinza no claro).

## Tipo e espaço

| Camada | Agora | Horizonte |
|---|---|---|
| UI | Inter variável servida pelo próprio site (`@fontsource-variable/inter`, arquivo latino pré-carregado), `system-ui` fallback | Inter no corpo e nos títulos; display própria `(pendente)` — Syne descartada |
| Escala de tipo | 7 degraus em `tokens.css`: `--text-xs` 12 · `--text-sm` 14 · `--text-base` 16 · `--text-md` 18 · `--text-lg` 24 · `--text-xl` 32–48 (título de página) · `--text-display` 44–76 (título da home). Nenhum `font-size` solto fora dos tokens (exceto `/curriculo`, que é A4) | Fonte display `(pendente)` — B7 |
| Espaço | Escala `--space-1`…`--space-9` (4 · 8 · 12 · 16 · 24 · 32 · 48 · 72 · 112px); ritmos `--rhythm-item` (12), `--rhythm-group` (32), `--rhythm-section` (72–112) | — |
| Grade | Uma largura para todas as páginas: `--container: 1100px`, conteúdo alinhado ao "lucas." do cabeçalho. Texto longo limitado a `--measure` (68ch) e colunas de texto a `--column` (46rem), sempre à esquerda | — |
| Superfícies | Máximo 2 níveis. Seções do case sem caixa: linha fina (`--line`, texto a 10%) + título. Caixa só para objetos: card de projeto, card de decisão, ficha, bloco de código, amostras | — |
| Home | Topo (título, cargo, frase, botões de mesma largura) → faixa de uma linha entre linhas finas ("Agora", "Formação"; sem ferramentas) → projetos um por linha: capa 16:10 em 2/3 da largura e texto ao lado, alternando o lado (no celular, capa em cima), com tipo · ano, título `--text-xl`, descrição e até 3 ferramentas → fechamento "Vamos conversar?" | — |
| Página do case | Caminho "Projetos / case" → título → descrição → botões (demo/protótipo, GitHub) → capa na largura da grade, em 16:10 e sem faixas (no JetPack, botão "Jogar" embaixo; o jogo cresce para caber em pé depois do clique) → ficha ("Meu papel" em destaque à esquerda, campos curtos à direita, ferramentas embaixo) → seções com um índice perto da borda esquerda da janela, longe do texto, fixo no meio da altura da janela durante toda a página, como guia de rolagem (≥1536px: lista "Neste case" com a seção atual marcada; 1280–1535px: um traço por seção, nome no hover/foco; abaixo de 1280px: só uma linha de progresso de 2px sob o cabeçalho) → seções → "Próximo projeto" com a capa → fechamento de contato. Ferramentas aparecem uma vez (na ficha). Telas numa faixa horizontal com encaixe e setas, altura fixa (520px; 420px no celular), legenda sob cada tela | — |
| Fechamento | Mesmo bloco no fim da home, do Sobre e de cada case: "Vamos conversar?" entre 24 e 36px (menor que o título da página), email clicável com botão de copiar, "Entrar em contato", LinkedIn e GitHub. Rodapé sem slogan | Ícones SVG de redes `(pendente)` |
| Sobre | Página de leitura na largura da coluna: título e frase com foto redonda ao lado (em cima no celular) → "Por que Design e Computação" → "Como eu trabalho" (3 princípios numerados, cada um com o case de exemplo) → "Agora" → "O que procuro" com "Ver currículo" e "Baixar PDF" → fechamento. Sem listas de formação, ferramentas ou idiomas (ficam no currículo) | — |
| Contato | Sem formulário: o bloco de fechamento como página, com título "Contato", frase sobre o que procura, email com copiar, LinkedIn e GitHub | — |
| Rótulos | Maiúsculas com espaçamento só nos rótulos da ficha do case; nos demais lugares, texto normal em `--muted` | — |
| Motion | `--transition: 240ms`; topo da home entra em cascata (50ms entre itens, `cubic-bezier(0.23, 1, 0.32, 1)`), uma vez; botões afundam a 97% no clique, sem pular no hover. Transição entre páginas (`<ClientRouter />`): a capa do projeto passa do card/linha para o topo do case e volta, só quando está visível nas duas páginas; o resto da página faz um fade. Capas e imagens grandes abaixo da dobra entram com opacidade + 12px em 500ms, uma vez; texto não anima. Capas: cor principal do projeto com o nome na identidade dele, como uma marca (molde no Figma, 1600×1000). Hover nos projetos (só com mouse): a capa de marca dá lugar à capa com as telas (`hover_image`) em 300ms; no toque essa imagem nem é baixada. Scripts rodam a cada página com `onPage` (`src/lib/page.ts`). Respeita `prefers-reduced-motion` | GSAP = horizonte / fora do ROADMAP atual |
| Ícones sociais | Texto (“GitHub”, “LinkedIn”) | SVG `(pendente)` — artefato do autor |

## Fora (agora)

- Não tratar este arquivo como tarefa de implementar UI.
- Não inventar hex para “ficar completo”.
- Embeds Figma: wrapper `.figma-embed` já estabilizado (não `overflow: hidden` que quebra fullscreen; `scale-down-width` + `fixed` + `hide-ui=1`; `min-zoom` cortava o frame).
