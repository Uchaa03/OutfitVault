# Etapa de construcción
FROM node:18 AS build

WORKDIR /app

# Copiamos archivos de dependencias e instalamos
COPY package.json package-lock.json ./
RUN npm install

# Copiamos el resto del código y construimos la aplicación
COPY . .
RUN npm run build

# Etapa final: servidor Nginx para servir el frontend
FROM nginx:alpine
# Se copia la carpeta generada por Vite que es "dist" y no "build"
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]