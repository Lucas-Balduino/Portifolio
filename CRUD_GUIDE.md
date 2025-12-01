# Guia do Sistema CRUD de Projetos

## 📋 Visão Geral

Este sistema permite gerenciar projetos do portfólio através de uma interface administrativa, sem precisar editar HTML manualmente. Os projetos são armazenados em um banco de dados SQLite e exibidos dinamicamente nas páginas do site.

## 🚀 Como Usar

### 1. Iniciar o Servidor

```bash
npm start
# ou
node server.js
```

O servidor iniciará na porta 3000 (ou na porta definida pela variável de ambiente PORT).

### 2. Acessar a Interface Admin

Abra seu navegador e acesse:
```
http://localhost:3000/admin
```

### 3. Adicionar um Projeto

1. Preencha o formulário na página admin:
   - **Título**: Nome do projeto (obrigatório)
   - **Slug**: URL amigável (gerado automaticamente a partir do título, mas pode ser editado)
   - **Resumo curto**: Breve descrição
   - **Imagem principal**: URL da imagem (relativa ou completa)
   - **Repositório**: Link do GitHub/GitLab
   - **Demo/Live**: Link para versão ao vivo
   - **Tecnologias**: Separadas por vírgula (ex: HTML, CSS, JavaScript)
   - **Descrição longa**: Descrição completa (HTML permitido)

2. Clique em "Salvar"

### 4. Editar um Projeto

1. Na lista de projetos, clique em "Editar"
2. O formulário será preenchido com os dados do projeto
3. Faça as alterações necessárias
4. Clique em "Atualizar"

### 5. Excluir um Projeto

1. Na lista de projetos, clique em "Excluir"
2. Confirme a exclusão

## 📁 Estrutura de Arquivos

```
Portifolio/
├── server.js              # Servidor Express com API REST
├── data.db                # Banco de dados SQLite
├── public/
│   ├── index.html         # Página inicial (carrega projetos recentes)
│   ├── projetos.html      # Lista todos os projetos
│   ├── projeto.html       # Página individual de projeto (dinâmica)
│   ├── projects.js        # Script para carregar projetos da API
│   ├── admin/
│   │   └── index.html     # Interface administrativa
│   └── ...
└── uploads/               # Diretório para uploads de imagens
```

## 🔌 API Endpoints

### GET `/api/projects`
Retorna todos os projetos ordenados por data de criação (mais recentes primeiro).

**Resposta:**
```json
[
  {
    "id": 1,
    "slug": "meu-projeto",
    "title": "Meu Projeto",
    "short_desc": "Descrição curta",
    "description": "Descrição completa",
    "technologies": "HTML, CSS, JS",
    "image_url": "img/projeto.png",
    "repo_url": "https://github.com/user/project",
    "live_url": "https://projeto.com",
    "created_at": "2024-01-01 12:00:00",
    "updated_at": "2024-01-01 12:00:00"
  }
]
```

### GET `/api/projects/:id`
Retorna um projeto específico por ID.

### GET `/api/projects/slug/:slug`
Retorna um projeto específico por slug.

### POST `/api/projects`
Cria um novo projeto.

**Body:**
```json
{
  "title": "Título do Projeto",
  "slug": "titulo-do-projeto",
  "short_desc": "Descrição curta",
  "description": "Descrição completa",
  "technologies": "HTML, CSS, JS",
  "image_url": "img/projeto.png",
  "repo_url": "https://github.com/user/project",
  "live_url": "https://projeto.com"
}
```

### PUT `/api/projects/:id`
Atualiza um projeto existente.

### DELETE `/api/projects/:id`
Exclui um projeto.

## 🎨 Como Funciona

1. **Frontend Dinâmico**: As páginas `index.html` e `projetos.html` usam o script `projects.js` para buscar projetos da API e renderizá-los dinamicamente.

2. **Páginas Individuais**: Cada projeto pode ter sua própria página acessível através de `/projeto.html?slug=nome-do-projeto`.

3. **Banco de Dados**: SQLite armazena todos os dados dos projetos. O arquivo `data.db` é criado automaticamente na primeira execução.

## ⚠️ Solução de Problemas

### Projetos não aparecem no site
- Verifique se o servidor está rodando
- Abra o console do navegador (F12) para ver erros
- Verifique se há projetos cadastrados em `/admin`

### Erro ao salvar projeto
- Verifique se o título e slug estão preenchidos
- Verifique se o slug é único (não pode haver dois projetos com o mesmo slug)
- Veja o console do servidor para mais detalhes

### Imagens não aparecem
- Verifique se o caminho da imagem está correto
- Use caminhos relativos (ex: `img/projeto.png`) ou URLs completas
- Certifique-se de que as imagens existem no diretório `public/img/` ou `uploads/`

## 🔒 Segurança

**Nota**: Esta implementação é para uso local/desenvolvimento. Para produção, considere:
- Adicionar autenticação na interface admin
- Validar e sanitizar inputs
- Implementar rate limiting
- Usar HTTPS
- Adicionar validação de uploads de arquivos

## 📝 Próximos Passos

- [ ] Adicionar upload de imagens
- [ ] Implementar autenticação
- [ ] Adicionar preview de projetos antes de publicar
- [ ] Melhorar validação de formulários
- [ ] Adicionar busca/filtros na lista de projetos

