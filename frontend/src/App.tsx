import { useState, useEffect } from 'react'
import './App.css'
import { Item, ItemForm } from './components/ItemForm'
import { ItemList } from './components/ItemList'
import { api } from './services/api'

function App() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.getItems()
      setItems(data)
    } catch (err: any) {
      setError(err.message || 'Error al cargar items')
      console.error('Error fetching items:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleAddItem = async (item: Omit<Item, 'id'>) => {
    try {
      console.log('Creating item:', item)
      const newItem = await api.createItem(item)
      console.log('New item created:', newItem)
      setItems([...items, newItem])
    } catch (err: any) {
      setError(err.message || 'Error al crear item')
    }
  }

  const handleUpdateItem = async (id: string, item: Partial<Item>) => {
    try {
      const updatedItem = await api.updateItem(id, item)
      setItems(items.map(i => i.id === id ? updatedItem : i))
    } catch (err: any) {
      setError(err.message || 'Error al actualizar item')
    }
  }

  const handleDeleteItem = async (id: string) => {
    try {
      await api.deleteItem(id)
      setItems(items.filter(i => i.id !== id))
    } catch (err: any) {
      setError(err.message || 'Error al eliminar item')
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 MVP Full-Stack</h1>
        <p>React + TypeScript + Express + Firebase</p>
      </header>

      {error && (
        <div className="error-message">
          ⚠️ {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      <div className="app-content">
        <div className="form-section">
          <h2>Agregar Nuevo Item</h2>
          <ItemForm onSubmit={handleAddItem} />
        </div>

        <div className="list-section">
          <div className="list-header">
            <h2>Items ({items.length})</h2>
            <button onClick={fetchItems} disabled={loading}>
              {loading ? '🔄' : '↻'} Actualizar
            </button>
          </div>
          
          {loading ? (
            <div className="loading">Cargando...</div>
          ) : (
            <ItemList
              items={items}
              onUpdate={handleUpdateItem}
              onDelete={handleDeleteItem}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App


