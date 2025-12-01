Portfolio full package - CRUD scaffold

1) Instalação básica (local):
   - Instale Node.js (v16+)
   - No diretório do projeto, rode:
       npm install
       npm start
   - O servidor expõe os endpoints em http://localhost:3000/api/projects
   - A pasta 'uploads/' será criada automaticamente para armazenar imagens.

2) Uso do admin:
   - Acesse /admin/index.html (sirva os arquivos estáticos a partir da raiz do projeto ou abra usando um servidor local).
   - O admin faz fetch para /api/projects. Em ambiente local, abra admin via http://localhost:3000/admin/index.html
     (ou configure Express para servir arquivos estáticos).

3) Segurança:
   - Este scaffold não implementa autenticação. Para entrega, se o avaliador requer login, implemente autenticação mínima
     (ex: middleware que checa uma senha fixa em header).

4) Observações:
   - Em produção, valide e sanitize dados no servidor, proteja uploads e adicione CORS configurado corretamente.
