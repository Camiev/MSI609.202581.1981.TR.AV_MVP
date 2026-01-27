import { Router, Request, Response } from 'express';
import { getFirestore } from '../config/firebase';

const router = Router();
const db = getFirestore();
const COLLECTION_NAME = 'vouchers';

// GET /api/vouchers - Obtener todas las tarjetas
router.get('/', async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection(COLLECTION_NAME).get();
    const vouchers = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(vouchers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/vouchers/:id - Obtener una tarjeta por ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doc = await db.collection(COLLECTION_NAME).doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Voucher not found' });
    }
    
    res.json({ id: doc.id, ...doc.data() });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/vouchers - Crear una nueva tarjeta
router.post('/', async (req: Request, res: Response) => {
  try {
    const { valePor, para, de, design } = req.body;
    
    if (!valePor) {
      return res.status(400).json({ error: 'Vale por es requerido' });
    }
    
    const newVoucher = {
      valePor: valePor.trim(),
      para: para?.trim() || '',
      de: de?.trim() || '',
      design: design || 'classic',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const docRef = await db.collection(COLLECTION_NAME).add(newVoucher);
    res.status(201).json({ id: docRef.id, ...newVoucher });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/vouchers/:id - Actualizar una tarjeta
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { valePor, para, de, design } = req.body;
    
    const updateData: any = {
      updatedAt: new Date().toISOString()
    };
    
    if (valePor !== undefined) updateData.valePor = valePor.trim();
    if (para !== undefined) updateData.para = para?.trim() || '';
    if (de !== undefined) updateData.de = de?.trim() || '';
    if (design !== undefined) updateData.design = design;
    
    await db.collection(COLLECTION_NAME).doc(id).update(updateData);
    
    const doc = await db.collection(COLLECTION_NAME).doc(id).get();
    res.json({ id: doc.id, ...doc.data() });
  } catch (error: any) {
    if (error.code === 5) {
      return res.status(404).json({ error: 'Voucher not found' });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/vouchers/:id - Eliminar una tarjeta
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.collection(COLLECTION_NAME).doc(id).delete();
    res.json({ message: 'Voucher deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export { router as vouchersRouter };


