# Usar la imagen oficial de Python como base
FROM python:3.9-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos web
COPY ./html /app/html

# Instalar servidor web simple
RUN pip install flask

# Crear aplicación Flask simple
RUN echo '\
from flask import Flask, send_from_directory\n\
import os\n\
app = Flask(__name__)\n\
@app.route("/")\n\
def index():\n\
    return send_from_directory("html", "index.html")\n\
if __name__ == "__main__":\n\
    app.run(host="0.0.0.0", port=80)\n'\
> app.py

# Exponer puerto 80
EXPOSE 80

# Iniciar la aplicación Flask
CMD ["python", "app.py"]