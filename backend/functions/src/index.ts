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
  console.log('Getting stats from Firebase Functions')
  try {
    console.log('Getting items from Firestore')
    const itemsSnapshot = await db.collection('items').get();
    console.log('Items snapshot:', itemsSnapshot.docs.map(doc => doc.data()))
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


