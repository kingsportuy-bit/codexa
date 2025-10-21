# Usar la imagen oficial de Python como base
FROM python:3.9-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos web
COPY ./html /app/html

# Instalar servidor web simple
RUN pip install flask

# Crear aplicación Flask simple
RUN echo 'from flask import Flask, send_from_directory' > app.py
RUN echo 'import os' >> app.py
RUN echo 'app = Flask(__name__)' >> app.py
RUN echo '@app.route("/")' >> app.py
RUN echo 'def index():' >> app.py
RUN echo '    return send_from_directory("html", "index.html")' >> app.py
RUN echo 'if __name__ == "__main__":' >> app.py
RUN echo '    app.run(host="0.0.0.0", port=80)' >> app.py

# Exponer puerto 80
EXPOSE 80

# Iniciar la aplicación Flask
CMD ["python", "app.py"]