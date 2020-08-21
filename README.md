<hr>
<h2>Pacotes Instalados</h2>
<dl>
<dt>1 - Criar o arquivo package</dt>
    <dd>npm init -y</dd>

<dt>2 - Gerenciar as requisições, rotas e URLs, entr outras funcionalidades</dt>    
    <dd>npm install express</dd>

<dt>3 - Instalar o módulo para reiniciar o servidor sempre que houver alteração no código fonte</dt>
    <dd>npm install -D nodemon</dd>

<dt>4 - Produz código JS válido  - para ES6</dt>
    <dd>Adicionado nova versão JS ES6:</dd>
    <dd>npm install -D sucrase<dd>
    <dd>packege.json:
        "scripts": {
        "dev": "nodemon src/server.js ",
        "build": "sucrase ./src -d ./outDir --transforms imports"}<dd>

<dt>5 - Instalar o MongoDB</dt>
    <dd>npm install --save mongodb</dt>

<dt>6 - Intalar o Mongoose (traduz os dados do banco de dados para objetos JS, permitindo serem utilizados na aplicação)</dt>
    <dd>npm install --save mongoose</dd>

<dt>7 - Instalar YUP valdar dados</dt>
    <dd>npm install --save yup</dd>

<dt>8 - Instalar Bycript para criptografia de senhas</dt>
    <dd>npm install --save bcrypt</dd>

<dt>9 - Instalar JWT JSON token</dt>
    <dd>npm install --save jsonwebtoken</dd>

<hr>

