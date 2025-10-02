# Etapa 1: Build de la aplicación
FROM node:23-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir la app con un servidor web (nginx o similar)
FROM nginx:stable-alpine

# Elimina archivos por defecto de nginx y copia tu build
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html

# Copia config opcional si la tienes
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]