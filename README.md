## Portfolio estático com CRUD via JSON

Este repositório contém um portfolio estático (HTML/CSS/JS) com uma interface de administração simples que gera um arquivo `projects.json`.  
Esse arquivo é a fonte de dados que o site usa para listar e exibir os projetos.

### Estrutura principal

- `public/` – tudo que precisa ser publicado (HTML, CSS, JS, imagens, JSON):
  - `index.html` – home com projetos recentes
  - `projetos.html` – lista de todos os projetos
  - `projeto.html` – página de projeto individual (usa `?slug=meu-projeto`)
  - `projects.js` – lê `data/projects.json` e renderiza os projetos
  - `data/projects.json` – lista de projetos (fonte de dados estática)
  - `admin/index.html` – painel admin estático (CRUD em memória + download do JSON)

Não há mais servidor Node/Express ou banco SQLite. Tudo roda como site estático.

### Fluxo de edição de projetos

1. Abra `public/admin/index.html` no navegador (pode ser direto do arquivo).
2. Edite, crie ou exclua projetos pelo formulário.
3. No final, clique em **“Baixar JSON atualizado”**.
4. Substitua o arquivo `public/data/projects.json` pelo JSON baixado.
5. Faça **commit + push** para o GitHub.

As páginas `index.html`, `projetos.html` e `projeto.html` passarão a usar esses dados automaticamente.

### Publicando com GitHub Pages (sem Actions)

Opção mais simples, sem workflow:

1. No GitHub, vá em **Settings → Pages**.
2. Em **Source**, selecione:
   - **Deploy from a branch**
   - Branch: normalmente `main` (ou a que você usa)
   - Folder: `/(root)`
3. Confirme.

Nesse caso, o GitHub vai servir a raiz do repositório.  
Você tem duas opções:

- Acessar o site em `https://seu-usuario.github.io/seu-repo/public/`  
- Ou mover o conteúdo de `public/` para a raiz se quiser que a URL principal aponte direto para o `index.html` (opcional, depende de como você prefere organizar).

### Publicando com GitHub Actions (apontando para `public/`)

Se você prefere usar um workflow de GitHub Actions que faça deploy automático de `public/`, a ideia geral é:

1. Criar um workflow em `.github/workflows/deploy.yml` que:
   - Faça checkout do repositório.
   - Publique apenas a pasta `public/` como artefato da Pages.

Exemplo de workflow mínimo (para um projeto estático sem build):

```yaml
name: Deploy static site

on:
  push:
    branches: [ "main" ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Upload artefatos da pasta public
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy para GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Depois de commitar esse arquivo:

1. Vá em **Settings → Pages** e selecione **GitHub Actions** como fonte.
2. Cada push na branch configurada (por exemplo, `main`) publicará o conteúdo da pasta `public/`.

### Limpeza de arquivos desnecessários

Para manter o repositório leve para uso estático, não são necessários:

- `node_modules/`
- `data.db`
- `server.js`
- `package.json` e `package-lock.json`
- pasta `uploads/` (fluxo antigo de upload do servidor)

Eles foram removidos/sugeridos para remoção porque não fazem parte do deploy estático.


