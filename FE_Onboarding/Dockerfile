# =========================
# Etapa 1: Build
# =========================
FROM node:23-alpine AS build

WORKDIR /app

# Copiar dependencias y restaurar
COPY package*.json ./
RUN npm ci

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# =========================
# Etapa 2: Servidor estático
# =========================
FROM nginx:stable-alpine AS production

# Copiar los archivos estáticos generados al contenedor Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto (Nginx por defecto usa 80)
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]