# Sistema Marmoraria

Sistema de gestão para marmorarias, com tela de login e dashboard administrativo. Projeto em desenvolvimento — atualmente cobre autenticação (tela) e a estrutura inicial do painel.

🔗 Deploy: https://sistema-marmoraria-eight.vercel.app

## Stack

- React 19 + Vite
- React Router DOM
- React Icons
- ESLint

## Como rodar localmente

```bash
# instalar dependências
npm install

# rodar em modo desenvolvimento
npm run dev

# gerar build de produção
npm run build

# rodar lint
npm run lint
```

## Estrutura do projeto

```
src/
├── components/     # componentes reutilizáveis (sidebar, header, cards, etc.)
├── pages/          # páginas da aplicação (login, dashboard)
├── routes/         # definição das rotas (react-router-dom)
├── assets/         # imagens e ícones
├── app.jsx         # componente raiz
└── main.jsx        # ponto de entrada
```

## Status / próximos passos

- [ ] Autenticação real (hoje o login é apenas visual, sem validação nem backend)
- [ ] Definir backend/banco de dados (clientes, orçamentos, estoque)
- [ ] Popular o dashboard com dados reais
- [ ] Testes automatizados