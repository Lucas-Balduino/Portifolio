## Portfolio

Este repositório contém um portfolio estático (HTML/CSS/JS) com uma interface de administração simples que gera um arquivo `projects.json`.  
Esse arquivo é a fonte de dados que o site usa para listar e exibir os projetos.

### Estrutura principal

  - `index.html` – home com projetos recentes
  - `projetos.html` – lista de todos os projetos
  - `projeto.html` – página de projeto individual (usa `?slug=meu-projeto`)
  - `projects.js` – lê `data/projects.json` e renderiza os projetos
  - `data/projects.json` – lista de projetos (fonte de dados estática)
  - `admin/index.html` – painel admin estático (CRUD em memória + download do JSON)

### Fluxo de edição de projetos

1. Abra `public/admin/index.html` no navegador (pode ser direto do arquivo).
2. Edite, crie ou exclua projetos pelo formulário.
3. No final, clique em **“Baixar JSON atualizado”**.
4. Substitua o arquivo `public/data/projects.json` pelo JSON baixado.
5. Faça **commit + push** para o GitHub.
