import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

let firebaseInitialized = false;

export const initializeFirebase = (): void => {
  if (firebaseInitialized) {
    return;
  }

  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    console.log('Project ID:', projectId)
    
    if (!projectId) {
      throw new Error('FIREBASE_PROJECT_ID environment variable is required');
    }

    // Verificar si hay credenciales de Firebase (archivo JSON)
    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || 
                            path.join(process.cwd(), 'firebase-service-account.json');

    console.log('Credentials path:', credentialsPath)
    
    console.log('Use emulator process.env.USE_FIREBASE_EMULATOR:', process.env.USE_FIREBASE_EMULATOR)
    const useEmulator = process.env.USE_FIREBASE_EMULATOR === 'true';

    console.log('Use emulator:', useEmulator)
    if (useEmulator) {
      // Configurar emulador de Firestore si está disponible
      const emulatorHost = process.env.FIRESTORE_EMULATOR_HOST || 'localhost:8080';
      process.env.FIRESTORE_EMULATOR_HOST = emulatorHost;
      console.log(`🔧 Using Firestore Emulator: ${emulatorHost}`);
      
      // Inicializar Firebase Admin con emulador
      if (!admin.apps.length) {
        admin.initializeApp({
          projectId: projectId,
        });
        console.log(`📦 Firebase project (Emulator): ${projectId}`);
      }
    } else {
      // Usar Firebase real con credenciales
      if (fs.existsSync(credentialsPath)) {
        const serviceAccount = require(credentialsPath);
        
        if (!admin.apps.length) {
          console.log('Initializing Firebase Admin with credentials')
          console.log('Service account:', serviceAccount)
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            projectId: projectId,
          });
          console.log(`🔥 Firebase Admin initialized (Production)`);
          console.log(`📦 Firebase project: ${projectId}`);
        }
      } else {
        // Intentar usar Application Default Credentials (para producción en GCP)
        if (!admin.apps.length) {
          try {
            admin.initializeApp({
              projectId: projectId,
            });
            console.log(`🔥 Firebase Admin initialized (Application Default Credentials)`);
            console.log(`📦 Firebase project: ${projectId}`);
          } catch (error) {
            throw new Error(
              `Firebase credentials not found. Please provide:\n` +
              `1. Set GOOGLE_APPLICATION_CREDENTIALS environment variable, OR\n` +
              `2. Place firebase-service-account.json in the backend directory, OR\n` +
              `3. Set USE_FIREBASE_EMULATOR=true to use emulator`
            );
          }
        }
      }
    }

    firebaseInitialized = true;
    console.log('✅ Firebase Admin initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing Firebase:', error);
    throw error;
  }
};

export const getFirestore = () => {
  if (!firebaseInitialized) {
    initializeFirebase();
  }
  return admin.firestore();
};

