# Usar la imagen oficial de Nginx como base
FROM nginx:alpine

# Copiar archivos personalizados
COPY ./web/html /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY ./nginx.conf /etc/nginx/nginx.conf

# Exponer puerto 80
EXPOSE 80

# Iniciar Nginx cuando se inicie el contenedor
CMD ["nginx", "-g", "daemon off;"]