Live link: https://recipe-appbackend.vercel.app

📦 Backend Overview – Recipe Book API
This is the backend API built with Node.js, Express, and MongoDB for the Recipe Book App. It provides all the necessary endpoints to manage recipes including create, read, update, and delete (CRUD) operations. The backend is designed to work seamlessly with the React frontend and supports production deployment with environment-based configuration and CORS setup.

update.

🛠 Features
⚙️ Express.js REST API with clean, modular structure

📡 MongoDB Atlas integration using mongoose

🔐 Environment variables managed via .env (Mongo URI)

🌐 CORS configured for both development and production

🚫 Strict password validation, authentication logic handled on frontend

📁 Simple schema-less Recipe model with flexible fields (for rapid prototyping)

🔄 Full CRUD for recipe entries:

GET /recipes – Fetch all recipes

GET /recipes/:id – Fetch single recipe

POST /recipes – Add a new recipe

PUT /recipes/:id – Update a recipe

DELETE /recipes/:id – Delete a recipe

PATCH /recipes/:id/like - Like update

🚀 Deployment
Hosted on Vercel

MONGODB_URI is stored in .env
