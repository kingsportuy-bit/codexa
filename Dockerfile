# Usar la imagen oficial de Node.js como base
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Exponer puerto 3000
EXPOSE 3000

# Iniciar la aplicación Next.js
CMD ["npm", "start"]