\# Trabalho de PAM - E-Commerce



Projeto de loja virtual de artigos esportivos desenvolvido com a stack MERN para a disciplina de Programação de Aplicativos Mobile.



\## 👥 Integrantes do Grupo



\- Henrique Roveroto de Jesus

\- Murilo Gaspar de Moura

\- Vitor Zamboni Balthazar



\## 🛠 Tecnologias Utilizadas



| Frontend | Backend | Banco de Dados |

|----------|---------|----------------|

| React + Vite | Node.js + Express | MongoDB Atlas |

| React Router DOM | JWT Authentication | Mongoose |

| Context API | CORS | |

| Axios | Bcrypt | |



\## ✅ Funcionalidades



\- Cadastro e login de usuários

\- Autenticação com JWT

\- Painel administrativo

\- Cadastro, edição e remoção de produtos

\- Listagem de produtos com cards

\- Carrinho de compras

\- Finalização de pedidos

\- Status de pedidos (Pendente 🟡 / Enviado 🔵 / Entregue 🟢)

\- Controle de estoque automático



\## 📁 Estrutura do Projeto



backend/

├── config/         (conexão com MongoDB)

├── models/         (User, Product, Order)

├── controllers/    (auth, user, product, order)

├── routes/         (auth, user, product, order)

├── middleware/      (auth, admin)

└── server.js



frontend/

├── pages/          (8 páginas)

├── components/     (5 componentes)

├── context/        (Auth, Cart)

├── services/       (conexão API)

└── App.jsx



\## 🚀 Como Executar



\### Backend

cd backend

npm install

node server.js



\### Frontend

cd frontend

npm install

npm run dev



Acesse: http://localhost:5173



\## 📊 Status do Projeto



✅ Concluído e funcional

