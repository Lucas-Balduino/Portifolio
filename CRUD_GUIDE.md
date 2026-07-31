# Guia do Sistema CRUD de Projetos (modo estático)

## Visão geral

Gerencie projetos do portfólio pela interface em `admin/index.html`, sem editar HTML manualmente. Os dados ficam em `data/projects.json` versionado no Git.

Não há servidor Node, Express ou banco SQLite — tudo roda como site estático.

## Como usar

### 1. Ambiente local

O admin carrega `../data/projects.json` via `fetch`. Abrir o HTML direto (`file://`) pode falhar; use um servidor local:

```bash
npx serve .
```

Acesse: `http://localhost:3000/admin/index.html`

### 2. Adicionar projeto

1. Preencha o formulário (título e slug são obrigatórios).
2. Slug é gerado automaticamente a partir do título (editável).
3. Clique em **Salvar**.
4. Ao finalizar, **Baixar JSON atualizado** e substitua `data/projects.json`.

### 3. Editar projeto

1. Clique em **Editar** na lista.
2. Altere os campos e clique em **Atualizar**.
3. Baixe o JSON e substitua no repositório.

### 4. Excluir projeto

1. Clique em **Excluir** e confirme.
2. Baixe o JSON atualizado.

### 5. Importar JSON existente

Use **Importar JSON** para carregar um arquivo `projects.json` exportado ou do repositório.

## Campos do projeto

| Campo | Descrição |
|-------|-----------|
| `title`, `slug` | Obrigatórios; slug único na lista |
| `short_desc` | Resumo nos cards |
| `image_url` | Caminho relativo (`img/...`) ou URL |
| `repo_url`, `live_url` | Links externos |
| `technologies` | Separadas por vírgula |
| `introduction`, `main_idea`, `technical_details`, `presentation`, `how_to_run` | Seções da página de detalhe |
| `images_section` | URLs separadas por vírgula ou linha |
| `description` | Fallback se seções vazias |
| `section_titles` | Opcional; renomeia os títulos das seções (ver abaixo) |

### Títulos de seção customizados

Por padrão as seções aparecem como "Introdução", "Ideia Principal", "Imagens", "Detalhes Técnicos", "Apresentação" e "Como Executar" — rótulos pensados para projetos de código. Projetos de design podem sobrescrevê-los com o campo opcional `section_titles`:

```json
"section_titles": {
  "introduction": "Contexto e Problema",
  "main_idea": "Decisões de Design",
  "images": "Telas",
  "technical_details": "Processo e Pesquisa",
  "presentation": "Resultado e Aprendizados",
  "how_to_run": "Protótipo Interativo"
}
```

Todas as chaves são opcionais; a ausente usa o título padrão.

> O formulário do admin **não tem input para `section_titles`**. Ao criar um projeto novo o campo não é gerado — adicione-o à mão no JSON depois de baixar. Ao editar um projeto existente o admin preserva o campo.

### Conteúdo HTML e XSS

- **Campos simples (`title`, `short_desc`, `technologies`, URLs, tags `alt`):** sanitizados via `escapeHtml()` na renderização para evitar XSS (por exemplo, `<script>` no título é exibido como texto puro).
- **Campos ricos (`technical_details`, `how_to_run`, `introduction`, `main_idea`, `presentation`, `description`):** permitem formatação com HTML ou blocos de código ` ```lang ... ``` `. São processados por `formatRichText()` (uso confiável, controlado no `projects.json`).

## Estrutura de arquivos

```
Portifolio/
├── data/projects.json
├── projects.js             # Lê JSON e renderiza cards/detalhe
├── admin/index.html        # Interface CRUD
└── img/                    # Imagens referenciadas nos projetos
```

## Solução de problemas

**Projetos não aparecem:** sirva via HTTP; verifique console (F12); confirme `data/projects.json` válido.

**Erro ao carregar no admin:** use `npx serve .`; confirme que `data/projects.json` existe.

**Slug duplicado:** o admin bloqueia slugs repetidos na lista local.

**Imagens:** use caminhos relativos (`img/projeto.png`) e confirme que o arquivo existe em `img/`.

## Segurança

- Admin **sem autenticação** — não publique link visível ou proteja via hosting.
- Não commite credenciais (EmailJS em `js/config.js` está no `.gitignore`).

## Próximos passos (ver ROADMAP.md)

- [ ] Decap CMS ou MDX (Fase 2, após Checkpoint A)
- [ ] Upload de imagens integrado
- [ ] Preview da página de projeto no admin
