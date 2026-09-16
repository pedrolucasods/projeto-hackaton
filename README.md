# Projeto Hackathon - Enfermagem

Sistema de apoio à triagem e ao atendimento de enfermagem, desenvolvido durante o Hackathon do curso. A aplicação permite cadastrar pacientes, abrir consultas, realizar a triagem com cálculo automático de sinais vitais e registrar todo o histórico do atendimento.

## Funcionalidades

- **Cadastro de pacientes**: nome, sexo, data de nascimento, nome da mãe, CPF (com validação) e cartão SUS (com máscara de entrada).
- **Gestão de consultas**: abertura de consulta vinculada a um paciente, com motivo da vinda e queixa principal.
- **Triagem com sinais vitais**: cálculo automático de IMC e classificação de pressão arterial, frequência cardíaca e temperatura, com feedback em tempo real.
- **Registro de sintomas** e **perguntas/respostas** da anamnese.
- **Orientações** ao paciente e **resumo final da consulta**.
- **Listagens e histórico**: lista de pacientes, consultas por paciente, detalhes do paciente e contadores na tela inicial.

## Tecnologias

- **Node.js** + **Express** — backend em arquitetura de camadas (routes / controllers / models)
- **Sequelize** — ORM sobre **MySQL** (com suporte a SQLite)
- **Handlebars** — renderização das views
- **express-session** — controle de sessão
- **Multer** — upload de arquivos
- **Terser** / **cssnano** — build e minificação de JS/CSS

## Estrutura do projeto

```
src/
├── backend/
│   ├── associations/   # Associações entre os models (Sequelize)
│   ├── controllers/     # Regras de negócio (paciente, consulta, homepage)
│   ├── db/               # Configuração de conexão com o banco
│   ├── models/           # Paciente, Consulta, SinaisVitais, Sintomas, Perguntas, Orientacao
│   ├── routes/           # Rotas HTTP
│   └── server/           # Setup do Express (server.js)
└── frontend/
    ├── public/           # CSS/JS servidos estaticamente, organizados por módulo
    └── views/            # Templates Handlebars (homepage, paciente, consulta, layout)
```

## Como rodar o projeto

### Pré-requisitos
- Node.js
- MySQL (ou SQLite, conforme configuração)

### Instalação

```bash
npm install
```

### Configuração

Crie um arquivo `.env` na raiz do projeto com as variáveis de conexão do banco:

```env
DB_NAME=nome_do_banco
DB_USER=usuario
DB_PASSWORD=senha
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql
```

### Executando

```bash
node src/backend/server/server.js
```

O servidor sobe por padrão em `http://localhost:3000`.

### Build de assets (CSS/JS)

```bash
npm run build
```

## Licença

Este projeto está sob a licença MIT.
