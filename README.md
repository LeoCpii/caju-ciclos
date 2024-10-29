<div align="center">
  <h1>Caju ciclos</h1>
  <br/>
  <p>
   <strong>Powered by</strong>

   ![Yarn](https://img.shields.io/badge/yarn-2C8EBB.svg?style=falt&logo=yarn&logoColor=white)
   ![Typescript](https://img.shields.io/badge/typescript-%23323330.svg?style=falt&logo=typescript&logoColor=%233178C6)
   ![React](https://img.shields.io/badge/react-222222?style=falt&logo=react&logoColor=%2300d8ff)
   ![GitHub](https://img.shields.io/badge/github_actions-2088FF.svg?style=falt&logo=githubactions&logoColor=white)
   ![Jest](https://img.shields.io/badge/jest-C53d15.svg?style=falt&logo=jest&logoColor=white)
  </p>
</div>

<br/>

## Descrição

Este repositório contém a solução para o desafio de Frontend da Caju

## Desafio proposto

Continuar o desenvolvimento de uma aplicação de admissão

Referência: [Caju Front End](https://github.com/caju-beneficios/caju-front-teste-1)

## Urls
Env | URL
--- | ---
SSO | https://sso-desafio-caju.web.app/
Manager | https://manager-desafio-caju.web.app/

## Arquitetura



## Solução desenvolvida

O projeto é composto por duas aplicações principais: a primeira, chamada [SSO](https://github.com/LeoCpii/caju-ciclos/tree/master/packages/app/sso), é responsável por autenticar e registrar os usuários na base de dados. A segunda aplicação, [Manager](https://github.com/LeoCpii/caju-ciclos/tree/master/packages/app/manager), gerencia os processos de admissão e candidaturas de usuários. Além dessas, foram desenvolvidos cinco módulos adicionais - `@caju/ui`, `@caju/toolkit`, `@caju/services`, `@caju/e2e` e `DB` - para ampliar as funcionalidades e suportar as operações do sistema.

### [@caju/ui](https://github.com/LeoCpii/caju-ciclos/tree/master/packages/ui)

Responsável por gerenciar tokens *CSS* e fornecer todos os componentes e utilitários visuais do projeto, garantindo consistência e reutilização em toda a interface.


### [@caju/toolkit](https://github.com/LeoCpii/caju-ciclos/tree/master/packages/toolkit)

É uma caixa de ferramentas JavaScript que oferece uma variedade de utilitários, incluindo formatação de dados, validações e mapeamento de objetos, facilitando o desenvolvimento e mantendo o código mais organizado e eficiente.

### [@caju/services](https://github.com/LeoCpii/caju-ciclos/tree/master/packages/services)

Atua como a camada intermediária entre o frontend e a API (Firebase), gerenciando as requisições, tratando validações de erros e mapeando queries e chamadas ao Firestore

### [@caju/e2e](https://github.com/LeoCpii/caju-ciclos/tree/master/packages/e2e)

Projeto para criação e execução dos testes e2e

### [db](https://github.com/LeoCpii/caju-ciclos/tree/master/packages/db)

O DB é um [emulador do Firebase](https://firebase.google.com/docs/emulator-suite?hl=pt-br). É utilizado para desenvolvimento local e para suportar testes de integração com execução `In-Memory`. Com esse recurso, é possível desenvolver e testar com tranquilidade, garantindo uma base de dados limpa para cada execução..

## Executando a aplicação

1. Clone o repositório

```bash
git clone git@github.com:LeoCpii/caju-ciclos.git
```

2. Acesse o diretório do projeto

```bash
cd caju-ciclos
```

3. Fazer o setup da aplicação:

```bash
make setup
```

4. Instalar o firebase tools

```bash
npm install -g firebase-tools
```

> 📝 Este passo é necessário para executar o emulador do firebase para executaro projeto localmente.

5. Levantar o firebase emulator

```bash
make db
```

6. Executar o projecto (manager ou sso)

> 💡 Para simplificar a execução da aplicação, foi criada uma função `run` no *Makefile*. Essa função facilita a navegação entre as pastas do monorepo e permite executar os scripts definidos em cada `package.json` correspondente.

```bash
make run ${PROJECT} ${COMMAND}
```
Ex: 

```bash
# Para rodar o SSO
make run sso dev

# Para rodar o Manager
make run manager dev
```

7. Após finalizar os steps anteriores você pode acessar o os projetos

Env | URL
--- | ---
SSO | http://localhost:5000
Manager | http://localhost:5001

8. Para se autenticar localmente utilize as credenciais `desafio@caju.com.br` e `Testando123` ou adicione um novo usuário no processo de criação de conta.

## Comandos adicionais

Após ter feito o setup do projeto você pode executar, individualmente, cada um dos módulos.

### Storybook

Nele temos a documentação e exemplos de utilização de todos os componentes usados no projeto.

```bash
make run ui storybook
```

### e2e

```bash
make run e2e test:manager:open
```

### Hot reload

Para utilizar o hot reload dos módulos basta executar

```bash
# modulo: toolkit, services

make run {modulo} watch
```