# 🎫 Generador de Tarjetas - MVP MIT Design Full Stack

Aplicación web para generar tarjetas simbólicas tipo "Vale por..." con TypeScript, React en el frontend, Node.js + Express + Firebase Functions en el backend, y Firestore como base de datos.

## 🚀 Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript + Firebase Functions
- **Base de Datos**: Firebase Firestore
- **Orquestación**: Docker Compose
- **Desarrollo**: Hot-reload habilitado

## 📋 Prerrequisitos

- Docker Desktop instalado (incluye Docker Compose)
- Node.js 18+ (para desarrollo local opcional)

### Instalación de Docker Desktop

Si no tienes Docker instalado:

**macOS:**
```bash
# Opción 1: Usando Homebrew (recomendado)
brew install --cask docker

# Opción 2: Descarga manual
# Ve a https://www.docker.com/products/docker-desktop/
# Descarga e instala Docker Desktop para Mac
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose-plugin

# O instala Docker Desktop para Linux desde:
# https://www.docker.com/products/docker-desktop/
```

**Windows:**
- Descarga Docker Desktop desde: https://www.docker.com/products/docker-desktop/

Después de instalar, inicia Docker Desktop y verifica la instalación:
```bash
docker --version
docker compose version
```

> **Nota**: Este proyecto usa `docker compose` (sin guión), que es el comando moderno incluido en Docker Desktop. Si tienes una versión antigua que requiere `docker-compose`, puedes instalarlo con `brew install docker-compose` o actualizar Docker Desktop.

## 🛠️ Instalación y Uso

### Opción 1: Docker Compose con Firebase Real (Recomendado para Producción)

1. Configura Firebase real siguiendo las instrucciones en la sección [🔥 Configuración de Firebase](#-configuración-de-firebase)

2. Inicia los servicios:
```bash
docker compose up --build
```

3. Accede a las aplicaciones:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:3001

### Opción 1b: Docker Compose con Firebase Emulator (Desarrollo)

1. Inicia los servicios con el emulador:
```bash
USE_FIREBASE_EMULATOR=true docker compose --profile emulator up --build
```

2. Accede a las aplicaciones:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:3001
   - **Firebase Emulator UI**: http://localhost:4000

### Opción 2: Desarrollo Local

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

#### Firebase Emulators
```bash
cd backend
npm run emulators
```

## 📁 Estructura del Proyecto

```
mvp/
├── frontend/          # React + TypeScript
├── backend/           # Express + Firebase Functions
├── docker-compose.yml # Orquestación de servicios
└── README.md
```

## 🔥 Configuración de Firebase

El proyecto puede usar **Firebase real** (producción) o **Firebase Emulator** (desarrollo local).

> 📖 **Guía detallada**: Ver [FIREBASE_SETUP.md](./docs/FIREBASE_SETUP.md) para instrucciones paso a paso.

### Opción 1: Firebase Real (Producción) ⭐

#### Paso 1: Crear un proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Anota el **Project ID** de tu proyecto

#### Paso 2: Obtener las credenciales de Service Account

1. En Firebase Console, ve a **Project Settings** (⚙️)
2. Ve a la pestaña **Service Accounts**
3. Haz clic en **Generate New Private Key**
4. Descarga el archivo JSON (este es tu `firebase-service-account.json`)

#### Paso 3: Configurar el proyecto

1. Copia el archivo JSON descargado a `backend/firebase-service-account.json`
2. Crea un archivo `.env` en la raíz del proyecto:

```env
FIREBASE_PROJECT_ID=tu-project-id
USE_FIREBASE_EMULATOR=false
```

3. O configura las variables de entorno en `docker-compose.yml`:

```yaml
environment:
  - FIREBASE_PROJECT_ID=tu-project-id
  - USE_FIREBASE_EMULATOR=false
  - GOOGLE_APPLICATION_CREDENTIALS=/app/firebase-service-account.json
```

4. Inicia los servicios:

```bash
docker compose up --build
```

**Nota**: El servicio `firebase-emulator` no se iniciará automáticamente cuando uses Firebase real.

### Opción 2: Firebase Emulator (Desarrollo Local)

Para usar el emulador en lugar de Firebase real:

1. Crea un archivo `.env` en la raíz:

```env
FIREBASE_PROJECT_ID=mvp-dev
USE_FIREBASE_EMULATOR=true
```

2. Inicia los servicios con el emulador:

```bash
# Opción A: Usar el archivo de configuración del emulador
docker compose -f docker-compose.yml -f docker-compose.emulator.yml --profile emulator up --build

# Opción B: Usar variables de entorno
USE_FIREBASE_EMULATOR=true FIRESTORE_EMULATOR_HOST=firebase-emulator:8080 docker compose --profile emulator up --build
```

**Puertos del Emulator**:
- **Firestore Emulator**: Puerto 8080
- **Functions Emulator**: Puerto 5001
- **Emulator UI**: Puerto 4000

Los datos del emulador se almacenan en memoria y se resetean al reiniciar.

## 📝 API Endpoints

### Backend (Express)
- `GET /api/health` - Health check
- `GET /api/vouchers` - Obtener todas las tarjetas
- `POST /api/vouchers` - Crear una nueva tarjeta
- `GET /api/vouchers/:id` - Obtener una tarjeta por ID
- `PUT /api/vouchers/:id` - Actualizar una tarjeta
- `DELETE /api/vouchers/:id` - Eliminar una tarjeta

### Firebase Functions
- Las funciones están disponibles en `/api/functions/*`

## 🧪 Desarrollo

- Hot-reload está habilitado en todos los servicios
- Los cambios en el código se reflejan automáticamente
- Los logs de todos los servicios se muestran en la consola

## 🛑 Detener los Servicios

```bash
docker compose down
```

Para eliminar también los volúmenes:
```bash
docker compose down -v
```

## 📦 Scripts Disponibles

### Backend
- `npm run dev` - Inicia el servidor en modo desarrollo
- `npm run build` - Compila TypeScript
- `npm run start` - Inicia el servidor en producción
- `npm run emulators` - Inicia Firebase Emulators

### Frontend
- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye para producción
- `npm test` - Ejecuta los tests

## 🔐 Variables de Entorno

### Para Firebase Real (Producción)

Crea un archivo `.env` en la raíz del proyecto:

```env
FIREBASE_PROJECT_ID=tu-project-id
USE_FIREBASE_EMULATOR=false
```

Y coloca `firebase-service-account.json` en el directorio `backend/`.

### Para Firebase Emulator (Desarrollo)

Crea un archivo `.env` en la raíz:

```env
FIREBASE_PROJECT_ID=mvp-dev
USE_FIREBASE_EMULATOR=true
```

### Desarrollo Local sin Docker

#### Backend (.env en `backend/`)
```env
FIREBASE_PROJECT_ID=tu-project-id
NODE_ENV=development
PORT=3001
USE_FIREBASE_EMULATOR=false
# O para emulador:
# USE_FIREBASE_EMULATOR=true
# FIRESTORE_EMULATOR_HOST=localhost:8080
```

#### Frontend (.env en `frontend/`)
```env
VITE_API_URL=http://localhost:3001
REACT_APP_FIREBASE_PROJECT_ID=tu-project-id
```

### Seguridad ⚠️

**IMPORTANTE**: Nunca subas `firebase-service-account.json` al repositorio. Este archivo ya está en `.gitignore`.

## 👥 Autores

- **Camila Eyzaguirre**
- **Héctor Salinas** 

## 📚 Fuentes y Referencias

### Documentación Oficial
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Vite Documentation](https://vitejs.dev/guide/)

### Herramientas y Librerías
- [Node.js](https://nodejs.org/)
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 📄 Licencia

MIT

