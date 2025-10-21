# Usar la imagen oficial de Python como base
FROM python:3.9-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos web
COPY ./html /app/html

# Instalar Flask
RUN pip install flask

# Copiar el archivo de aplicación Flask
COPY app.py /app/app.py

# Exponer puerto 80
EXPOSE 80

# Iniciar la aplicación Flask
CMD ["python", "app.py"]
