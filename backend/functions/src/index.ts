import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Inicializar Firebase Admin si no está inicializado
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// Ejemplo de Cloud Function
export const helloWorld = functions.https.onRequest((request, response) => {
  response.json({ message: 'Hello from Firebase Functions!' });
});

// Función para obtener estadísticas
export const getStats = functions.https.onRequest(async (request, response) => {
  try {
    const itemsSnapshot = await db.collection('items').get();
    const stats = {
      totalItems: itemsSnapshot.size,
      timestamp: new Date().toISOString()
    };
    response.json(stats);
  } catch (error: any) {
    console.error('Error getting stats:', error)
    response.status(500).json({ error: error.message });
  }
});


