# Imagen base de Node.js
FROM node:22-alpine

# Crea el directorio de la app
WORKDIR /usr/src/app

# Copia dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expón el puerto (debe ser 8080 para Cloud Run)
ENV PORT=8080
EXPOSE 8080

# Comando de inicio
CMD ["npm", "start"]
