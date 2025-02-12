FROM node:18

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copia e instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código fuente
COPY . .

# Exponemos el puerto (asegúrate que en server.js se escucha en "0.0.0.0" y en el puerto 5000)
EXPOSE 5000

# Inicia el servidor
CMD ["npm", "start"]