# Configurar Firebase Real

### 1. Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en **"Add project"** o selecciona un proyecto existente
3. Completa el proceso de creación del proyecto
4. **Anota el Project ID** (lo necesitarás después)

### 2. Habilitar Firestore

1. En el menú lateral, ve a **Firestore Database**
2. Haz clic en **"Create database"**
3. Selecciona **"Start in test mode"** (para desarrollo) o configura las reglas de seguridad
4. Elige una ubicación para tu base de datos
5. Haz clic en **"Enable"**

### 3. Obtener Credenciales de Service Account

1. En Firebase Console, haz clic en el ícono de ⚙️ (Settings) → **Project settings**
2. Ve a la pestaña **"Service accounts"**
3. Haz clic en **"Generate new private key"**
4. Se descargará un archivo JSON - **guárdalo de forma segura**
5. Renombra el archivo a `firebase-service-account.json`
6. Colócalo en el directorio `backend/`

### 4. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
FIREBASE_PROJECT_ID=tu-project-id-aqui
USE_FIREBASE_EMULATOR=false
```

**Reemplaza `tu-project-id-aqui` con el Project ID de tu proyecto de Firebase.**

### 5. Configurar Reglas de Firestore

En Firebase Console → Firestore Database → Rules, actualiza las reglas según tus necesidades:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura y escritura autenticada
    match /items/{itemId} {
      allow read, write: if request.auth != null;
    }
    
    // O para desarrollo (menos seguro):
    // match /{document=**} {
    //   allow read, write: if true;
    // }
  }
}
```

### 6. Iniciar la Aplicación

```bash
docker compose up --build
```

> **Nota**: Usa `docker compose` (sin guión) que es el comando moderno. Si tienes una versión antigua, puedes usar `docker-compose` o actualizar Docker Desktop.

¡Listo! Tu aplicación ahora está conectada a Firebase real.

## Verificar la Conexión

1. Abre http://localhost:3000
2. Crea un item desde la interfaz
3. Ve a Firebase Console → Firestore Database
4. Deberías ver la colección `items` con el nuevo documento

## Troubleshooting

### Error: "Firebase credentials not found"

- Verifica que `firebase-service-account.json` esté en `backend/`
- Verifica que el archivo JSON sea válido
- Verifica que `FIREBASE_PROJECT_ID` esté configurado correctamente

### Error: "Permission denied"

- Verifica las reglas de Firestore en Firebase Console
- Asegúrate de que el Service Account tenga los permisos necesarios

### Error: "Project not found"

- Verifica que el `FIREBASE_PROJECT_ID` coincida con tu proyecto
- Verifica que el proyecto esté activo en Firebase Console

## Seguridad ⚠️

- **NUNCA** subas `firebase-service-account.json` al repositorio
- Este archivo ya está en `.gitignore`
- Si accidentalmente lo subes, regenera las credenciales inmediatamente
- Usa variables de entorno para producción

