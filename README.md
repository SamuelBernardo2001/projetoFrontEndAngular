# Pousada Brisa de Neve - Angular SPA

## Requisitos
- Node.js >= 18
- npm
- Angular CLI

## Instalação

1. Instalar dependências:
```bash
npm install
```

2. Iniciar JSON Server (API simulada):
```bash
npm run json-server
```

3. Iniciar aplicação Angular (em outro terminal):
```bash
npm start
```

## Acesso

- **Aplicação**: http://localhost:4200
- **API**: http://localhost:3000
- **Login Admin**: username=`admin` / password=`admin123`

## Funcionalidades

- Sistema de reservas com cálculo automático
- Cadastro de hóspedes
- Sistema de avaliações
- Galeria de fotos
- Painel administrativo (protegido)
- Exportação JSON/CSV
- Autenticação e autorização
- Tema claro/escuro

## Estrutura

- `src/app/core` - Serviços, guards, interceptors e models
- `src/app/features` - Componentes de funcionalidades
- `src/app/layout` - Layout principal
- `src/app/shared` - Componentes compartilhados
- `db.json` - Banco de dados simulado