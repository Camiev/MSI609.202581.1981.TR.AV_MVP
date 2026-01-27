import { useState, FormEvent } from 'react'
import './VoucherForm.css'

export interface Voucher {
  id: string
  valePor: string
  para: string
  de: string
  design: string
  createdAt?: string
  updatedAt?: string
}

interface VoucherFormProps {
  onSubmit: (voucher: Omit<Voucher, 'id'>) => void
}

const DESIGN_OPTIONS = [
  { 
    value: 'classic', 
    label: 'Clásico Elegante', 
    class: 'design-classic',
    icon: '✨',
    description: 'Estilo vintage con bordes decorativos'
  },
  { 
    value: 'modern', 
    label: 'Moderno Geométrico', 
    class: 'design-modern',
    icon: '🔷',
    description: 'Formas y patrones contemporáneos'
  },
  { 
    value: 'festive', 
    label: 'Festivo Colorido', 
    class: 'design-festive',
    icon: '🎉',
    description: 'Vibrante y alegre con gradientes'
  },
]

export function VoucherForm({ onSubmit }: VoucherFormProps) {
  const [valePor, setValePor] = useState('')
  const [para, setPara] = useState('')
  const [de, setDe] = useState('')
  const [design, setDesign] = useState('classic')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!valePor.trim()) {
      return
    }

    setSubmitting(true)
    try {
      await onSubmit({ 
        valePor: valePor.trim(), 
        para: para.trim(),
        de: de.trim(),
        design: design
      })
      setValePor('')
      setPara('')
      setDe('')
      setDesign('classic')
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="voucher-form">
      <div className="form-group">
        <label htmlFor="valePor">Vale por *</label>
        <input
          id="valePor"
          type="text"
          value={valePor}
          onChange={(e) => setValePor(e.target.value)}
          placeholder="Ej: Un abrazo, Una cena, Un café..."
          required
          disabled={submitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="para">Para (opcional)</label>
        <input
          id="para"
          type="text"
          value={para}
          onChange={(e) => setPara(e.target.value)}
          placeholder="Nombre de la persona"
          disabled={submitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="de">De (opcional)</label>
        <input
          id="de"
          type="text"
          value={de}
          onChange={(e) => setDe(e.target.value)}
          placeholder="Tu nombre"
          disabled={submitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="design">Diseño de la tarjeta</label>
        <div className="design-selector">
          {DESIGN_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`design-option ${design === option.value ? 'active' : ''} ${option.class}`}
              onClick={() => setDesign(option.value)}
              disabled={submitting}
              title={option.description}
            >
              <span className="design-icon">{option.icon}</span>
              <span className="design-label">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button type="submit" disabled={submitting || !valePor.trim()}>
        {submitting ? 'Creando...' : '🎫 Crear Tarjeta'}
      </button>
    </form>
  )
}

