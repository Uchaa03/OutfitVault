FROM node:16-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de dependencias y realiza la instalación (en producción)
COPY package*.json ./
RUN npm install --production

# Copia el resto del código fuente
COPY . .

# Expone el puerto que usa el backend (asegúrate de que coincida con el puerto que escucha tu servidor)
EXPOSE 8000

# Inicia la aplicación
CMD ["npm", "start"]