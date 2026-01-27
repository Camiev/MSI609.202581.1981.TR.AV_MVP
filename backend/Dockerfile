FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Exponer puertos
EXPOSE 3001 5001

# Comando por defecto (se sobrescribe en docker-compose)
CMD ["npm", "run", "dev"]


