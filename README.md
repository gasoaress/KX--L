
# Loja KX

Este projeto é um sistema de controle de vendas chamado Loja KX, desenvolvido com uma arquitetura de front-end em React e back-end em Node.js, utilizando um banco de dados MySQL. Foi feita uma tentativa de uso do docker mas acabou não funcionando, de todo modo, meu dockerfile está no repositório.

## Tecnologias Utilizadas

- **Docker Desktop**: Para a criação e gerenciamento de contêineres.
- **MySQL (versão 8)**: Banco de dados relacional utilizado para armazenar os dados do sistema.
- **Node.js (versão 20)**: Ambiente de execução utilizado para o back-end.
- **React**: Biblioteca JavaScript utilizada para o desenvolvimento do front-end.
- **Postman**: Utilizado para testar a API do back-end.
- **Visual Studio Code (versão 1.89)**: Editor de código usado no desenvolvimento.

## Estrutura do Projeto

Na raiz do projeto, estão disponíveis:
 Um arquivo de **dump** do banco de dados MySQL, configurado para operar na rede `127.0.0.1:3306`.
- Um arquivo **JSON** com as coleções do Postman para testar as rotas da API.

-  O front-end é configurado para rodar na porta 3000. Se a porta já estiver ocupada, será perguntado se deseja subir em outra porta. Caso deseje, digite y e pressione Enter para confirmar.
-  O servidor backend será iniciado na porta 8080.

## Pré-requisitos

Certifique-se de ter os seguintes programas instalados:

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js (versão 20)](https://nodejs.org/)
- [Visual Studio Code (versão 1.89)](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/)
- [MySQL (versão 8)](https://dev.mysql.com/downloads/installer/)

## Como Rodar o Projeto

1. Clone o repositório para o seu ambiente local:
    - git clone https://github.com/seu-usuario/projeto-loja-kx.git
2.  Navegue até a pasta raiz do projeto:
    - cd projeto-loja-kx
3. Instalar dependencias
    - npm install
## Front-End
0. Não foi possível subir a pasta "nodemodules" para o repositório, assim zipei o arquivo e subi. Antes de rodas os comandos abaixo extraia a pasta "nodemodules" dentro da pasta "Frontend"

1. Navegue até a pasta raiz do projeto:
    - cd projeto-loja-kx
2. Navegue até a pasta do frontend:
    - cd frontend
3. Execute o comando para iniciar o servidor de desenvolvimento:
    - npm run dev
## Backend
1. Navegue até a pasta raiz do projeto:
    - cd projeto-loja-kx
2. Navegue até a pasta do backend:
    - cd api-node
3. Execute o comando para iniciar o servidor backend:
    - npm run dev
  