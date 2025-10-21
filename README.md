# Codexa Web App

Aplicación web simple para Codexa con fondo negro y texto centrado.

## Descripción

Esta es una aplicación web minimalista que muestra "codexa" en el centro de una pantalla con fondo negro. Está diseñada para ser desplegada en un VPS con Traefik como proxy inverso.

## Tecnologías utilizadas

- HTML5
- CSS3
- Docker
- Python Flask
- Traefik

## Despliegue

1. Clonar el repositorio:
   ```
   git clone https://github.com/kingsportuy-bit/codexa.git
   ```

2. Navegar al directorio del proyecto:
   ```
   cd codexa
   ```

3. Ejecutar con Docker Compose:
   ```
   docker-compose up -d
   ```

## Configuración de Traefik

La aplicación está configurada para funcionar con Traefik mediante etiquetas en el archivo `docker-compose.yml`:

- Dominio: `codexa.uy`
- Red Docker compartida: `oraclelabsnet`
- Certificados SSL gestionados por Let's Encrypt

## Estructura del proyecto

```
.
├── Dockerfile
├── docker-compose.yml
└── html/
    └── index.html
```

## Actualizaciones

Para actualizar la aplicación:
```
git pull origin main
docker-compose up -d --build
```