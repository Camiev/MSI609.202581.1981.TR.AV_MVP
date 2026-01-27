import { Router, Request, Response } from 'express';
import { getFirestore } from '../config/firebase';

const router = Router();
const db = getFirestore();
const COLLECTION_NAME = 'items';

// GET /api/items - Obtener todos los items
router.get('/', async (req: Request, res: Response) => {
  try {
    console.log('Getting items from Firestore')
    const snapshot = await db.collection(COLLECTION_NAME).get();
    console.log('Items snapshot:', snapshot.docs.map(doc => doc.data()))
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Items:', items)
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/items/:id - Obtener un item por ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doc = await db.collection(COLLECTION_NAME).doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ id: doc.id, ...doc.data() });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/items - Crear un nuevo item
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const newItem = {
      title,
      description: description || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const docRef = await db.collection(COLLECTION_NAME).add(newItem);
    res.status(201).json({ id: docRef.id, ...newItem });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/items/:id - Actualizar un item
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    
    const updateData: any = {
      updatedAt: new Date().toISOString()
    };
    
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    
    await db.collection(COLLECTION_NAME).doc(id).update(updateData);
    
    const doc = await db.collection(COLLECTION_NAME).doc(id).get();
    res.json({ id: doc.id, ...doc.data() });
  } catch (error: any) {
    if (error.code === 5) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/items/:id - Eliminar un item
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.collection(COLLECTION_NAME).doc(id).delete();
    res.json({ message: 'Item deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export { router as itemsRouter };


