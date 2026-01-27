import { useState } from 'react'
import { Item } from './ItemForm'
import './ItemList.css'

interface ItemListProps {
  items: Item[]
  onUpdate: (id: string, item: Partial<Item>) => void
  onDelete: (id: string) => void
}

export function ItemList({ items, onUpdate, onDelete }: ItemListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const startEdit = (item: Item) => {
    setEditingId(item.id)
    setEditTitle(item.title)
    setEditDescription(item.description)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle('')
    setEditDescription('')
  }

  const saveEdit = async (id: string) => {
    if (!editTitle.trim()) {
      return
    }

    await onUpdate(id, {
      title: editTitle.trim(),
      description: editDescription.trim()
    })
    cancelEdit()
  }

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>📝 No hay items aún. ¡Agrega uno para comenzar!</p>
      </div>
    )
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <div key={item.id} className="item-card">
          {editingId === item.id ? (
            <div className="item-edit">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="edit-input"
                placeholder="Título"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="edit-textarea"
                placeholder="Descripción"
                rows={2}
              />
              <div className="edit-actions">
                <button onClick={() => saveEdit(item.id)} className="save-btn">
                  💾 Guardar
                </button>
                <button onClick={cancelEdit} className="cancel-btn">
                  ✕ Cancelar
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="item-content">
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
                {item.createdAt && (
                  <span className="item-date">
                    Creado: {new Date(item.createdAt).toLocaleString('es-ES')}
                  </span>
                )}
              </div>
              <div className="item-actions">
                <button onClick={() => startEdit(item)} className="edit-btn">
                  ✏️ Editar
                </button>
                <button onClick={() => onDelete(item.id)} className="delete-btn">
                  🗑️ Eliminar
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}


