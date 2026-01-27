# 🚀 Inicio Rápido

## Verificación Rápida

Antes de comenzar, verifica que tengas Docker instalado:

```bash
docker --version
docker compose version
```

Si obtienes `command not found`, necesitas instalar Docker Desktop primero.

## Pasos Rápidos

### 1. Instalar Docker (si no lo tienes)

**macOS:**
```bash
brew install --cask docker
```

Luego abre Docker Desktop desde Aplicaciones.

### 2. Configurar Firebase Real

1. Obtén `firebase-service-account.json` de Firebase Console
2. Colócalo en `backend/firebase-service-account.json`
3. Crea `.env` en la raíz:
```env
FIREBASE_PROJECT_ID=tu-project-id
USE_FIREBASE_EMULATOR=false
```

### 3. Iniciar la Aplicación

```bash
docker compose up --build
```

### 4. Acceder

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Solución de Problemas

### Error: "docker: command not found"
- Instala Docker Desktop desde https://www.docker.com/products/docker-desktop/
- Asegúrate de que Docker Desktop esté ejecutándose

### Error: "docker compose: command not found"
- Actualiza Docker Desktop a la versión más reciente
- O instala el plugin: `brew install docker-compose-plugin`

### Error: "Cannot connect to the Docker daemon"
- Abre Docker Desktop y espera a que inicie completamente
- Verifica que Docker Desktop esté ejecutándose

### Error: "Firebase credentials not found"
- Verifica que `backend/firebase-service-account.json` exista
- Verifica que `FIREBASE_PROJECT_ID` esté configurado en `.env`

