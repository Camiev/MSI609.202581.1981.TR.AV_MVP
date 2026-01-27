import { useState } from 'react'
import { Voucher } from './VoucherForm'
import './VoucherList.css'

interface VoucherListProps {
  vouchers: Voucher[]
  onUpdate: (id: string, voucher: Partial<Voucher>) => void
  onDelete: (id: string) => void
}

const DESIGN_OPTIONS = [
  { 
    value: 'classic', 
    label: 'Clásico Elegante', 
    class: 'design-classic',
    icon: '✨'
  },
  { 
    value: 'modern', 
    label: 'Moderno Geométrico', 
    class: 'design-modern',
    icon: '🔷'
  },
  { 
    value: 'festive', 
    label: 'Festivo Colorido', 
    class: 'design-festive',
    icon: '🎉'
  },
]

export function VoucherList({ vouchers, onUpdate, onDelete }: VoucherListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValePor, setEditValePor] = useState('')
  const [editPara, setEditPara] = useState('')
  const [editDe, setEditDe] = useState('')
  const [editDesign, setEditDesign] = useState('classic')

  const startEdit = (voucher: Voucher) => {
    setEditingId(voucher.id)
    setEditValePor(voucher.valePor)
    setEditPara(voucher.para)
    setEditDe(voucher.de)
    setEditDesign(voucher.design || 'classic')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditValePor('')
    setEditPara('')
    setEditDe('')
    setEditDesign('classic')
  }

  const saveEdit = async (id: string) => {
    if (!editValePor.trim()) {
      return
    }

    await onUpdate(id, {
      valePor: editValePor.trim(),
      para: editPara.trim(),
      de: editDe.trim(),
      design: editDesign
    })
    cancelEdit()
  }

  if (vouchers.length === 0) {
    return (
      <div className="empty-state">
        <p>🎫 No hay tarjetas aún. ¡Crea una para comenzar!</p>
      </div>
    )
  }

  return (
    <div className="voucher-list">
      {vouchers.map((voucher) => {
        const designClass = DESIGN_OPTIONS.find(d => d.value === (voucher.design || 'classic'))?.class || 'design-classic'
        
        if (editingId === voucher.id) {
          return (
            <div key={voucher.id} className="voucher-card-edit">
              <div className="voucher-edit">
                <input
                  type="text"
                  value={editValePor}
                  onChange={(e) => setEditValePor(e.target.value)}
                  className="edit-input"
                  placeholder="Vale por..."
                />
                <input
                  type="text"
                  value={editPara}
                  onChange={(e) => setEditPara(e.target.value)}
                  className="edit-input"
                  placeholder="Para..."
                />
                <input
                  type="text"
                  value={editDe}
                  onChange={(e) => setEditDe(e.target.value)}
                  className="edit-input"
                  placeholder="De..."
                />
                <div className="design-selector">
                  {DESIGN_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`design-option ${editDesign === option.value ? 'active' : ''} ${option.class}`}
                      onClick={() => setEditDesign(option.value)}
                    >
                      <span className="design-icon">{option.icon}</span>
                      <span className="design-label">{option.label}</span>
                    </button>
                  ))}
                </div>
                <div className="edit-actions">
                  <button onClick={() => saveEdit(voucher.id)} className="save-btn">
                    💾 Guardar
                  </button>
                  <button onClick={cancelEdit} className="cancel-btn">
                    ✕ Cancelar
                  </button>
                </div>
              </div>
            </div>
          )
        }

        return (
          <div key={voucher.id} className={`voucher-card ${designClass}`}>
            <div className="voucher-content">
              <div className="voucher-header">
                <h2 className="voucher-title">VALE POR</h2>
              </div>
              <div className="voucher-main">
                <p className="voucher-vale-por">{voucher.valePor}</p>
              </div>
              {(voucher.para || voucher.de) && (
                <div className="voucher-footer">
                  {voucher.para && <p className="voucher-para">Para: {voucher.para}</p>}
                  {voucher.de && <p className="voucher-de">De: {voucher.de}</p>}
                </div>
              )}
              {voucher.createdAt && (
                <div className="voucher-date">
                  {new Date(voucher.createdAt).toLocaleDateString('es-ES')}
                </div>
              )}
            </div>
            <div className="voucher-actions">
              <button onClick={() => startEdit(voucher)} className="edit-btn">
                ✏️ Editar
              </button>
              <button onClick={() => onDelete(voucher.id)} className="delete-btn">
                🗑️ Eliminar
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

