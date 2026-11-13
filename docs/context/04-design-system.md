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
| UI | Inter (Google Fonts 300–800), `system-ui` fallback | Inter no corpo e nos títulos; display própria `(pendente)` — Syne descartada |
| Escala de tipo | 7 degraus em `tokens.css`: `--text-xs` 12 · `--text-sm` 14 · `--text-base` 16 · `--text-md` 18 · `--text-lg` 24 · `--text-xl` 32–48 (título de página) · `--text-display` 44–76 (título da home). Nenhum `font-size` solto fora dos tokens (exceto `/curriculo`, que é A4) | Fonte display `(pendente)` — B7 |
| Espaço | Escala `--space-1`…`--space-9` (4 · 8 · 12 · 16 · 24 · 32 · 48 · 72 · 112px); ritmos `--rhythm-item` (12), `--rhythm-group` (32), `--rhythm-section` (72–112) | — |
| Grade | Uma largura para todas as páginas: `--container: 1100px`, conteúdo alinhado ao "lucas." do cabeçalho. Texto longo limitado a `--measure` (68ch) e colunas de texto a `--column` (46rem), sempre à esquerda | — |
| Superfícies | Máximo 2 níveis. Seções do case sem caixa: linha fina (`--line`, texto a 10%) + título. Caixa só para objetos: card de projeto, card de decisão, ficha, bloco de código, amostras | — |
| Rótulos | Maiúsculas com espaçamento só nos rótulos da ficha do case; nos demais lugares, texto normal em `--muted` | — |
| Motion | `--transition: 240ms`; topo da home entra em cascata (50ms entre itens, `cubic-bezier(0.23, 1, 0.32, 1)`), uma vez; botões afundam a 97% no clique, sem pular no hover; respeita `prefers-reduced-motion` | GSAP = horizonte / fora do ROADMAP atual |
| Ícones sociais | Texto (“GitHub”, “LinkedIn”) | SVG `(pendente)` — artefato do autor |

## Fora (agora)

- Não tratar este arquivo como tarefa de implementar UI.
- Não inventar hex para “ficar completo”.
- Embeds Figma: wrapper `.figma-embed` já estabilizado (não `overflow: hidden` que quebra fullscreen; `scale-down-width` + `fixed` + `hide-ui=1`; `min-zoom` cortava o frame).
