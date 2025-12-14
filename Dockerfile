# 1. On part d'une base officielle Node.js (version légère "alpine")
FROM node:18-alpine

# 2. On définit le dossier de travail dans le conteneur
WORKDIR /app

# 3. On copie d'abord les fichiers de dépendances (optimisation du cache Docker)
COPY package*.json ./

# 4. On installe les dépendances
RUN npm install --production

# 5. On copie le reste du code de l'application
COPY . .

# 6. On indique que l'app écoute sur le port 3000
EXPOSE 3000

# 7. La commande pour démarrer l'app
CMD ["npm", "start"]