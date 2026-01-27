import { useState, FormEvent } from 'react'
import './ItemForm.css'

export interface Item {
  id: string
  title: string
  description: string
  createdAt?: string
  updatedAt?: string
}

interface ItemFormProps {
  onSubmit: (item: Omit<Item, 'id'>) => void
}

export function ItemForm({ onSubmit }: ItemFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      return
    }

    setSubmitting(true)
    try {
      await onSubmit({ title: title.trim(), description: description.trim() })
      setTitle('')
      setDescription('')
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <div className="form-group">
        <label htmlFor="title">Título *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ingresa un título"
          required
          disabled={submitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ingresa una descripción (opcional)"
          rows={3}
          disabled={submitting}
        />
      </div>

      <button type="submit" disabled={submitting || !title.trim()}>
        {submitting ? 'Guardando...' : '➕ Agregar Item'}
      </button>
    </form>
  )
}


