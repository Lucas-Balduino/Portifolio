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
| `--muted` | `#a7a7ad` / `#7b7b83` | Descrições |
| `--accent` | `#111111` / `#ffffff` | Títulos, links, botão primário do card |
| `--glass` | preto/branco em alpha | Bordas, chips, botões secundários |
| `--radius` | `12px` | Cards |

### Horizonte (A4) — não gravar escolha

| Token | Hex | Uso |
|---|---|---|
| Acento | `(pendente)` | CTA, links, foco. Sugestão **não decidida** em `DECISOES.md`: `#005CEE` (Kinetic) |
| Display / fundo dark | `(pendente)` | Superfícies e texto no default dark |

Não copiar a paleta por modalidade do Kinetic para o site inteiro.

## Tipo e espaço

| Camada | Agora | Horizonte |
|---|---|---|
| UI | Inter (Google Fonts 300–800), `system-ui` fallback | Inter pode permanecer no corpo; **fonte display `(pendente)`** — sugestão não decidida: Lexend |
| Espaço | `--container: 1100px`; cards `minmax(300px, 1fr)` | Redefinir na fase dark-first, não no scaffold |
| Motion | `--transition: 240ms`; hover `translateY(-8px)` nos cards; `.reveal` | GSAP = horizonte / fora do ROADMAP atual |
| Ícones sociais | Texto (“GitHub”, “LinkedIn”) | SVG `(pendente)` — artefato do autor |

## Fora (agora)

- Não tratar este arquivo como tarefa de implementar UI.
- Não inventar hex para “ficar completo”.
- Embeds Figma: wrapper `.figma-embed` já estabilizado (não `overflow: hidden` que quebra fullscreen; `min-zoom` + `fixed`).
