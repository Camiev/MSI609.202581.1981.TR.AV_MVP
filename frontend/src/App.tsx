import { useState, useEffect } from 'react'
import './App.css'
import { Voucher, VoucherForm } from './components/VoucherForm'
import { VoucherList } from './components/VoucherList'
import { api } from './services/api'

function App() {
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVouchers = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.getVouchers()
      setVouchers(data)
    } catch (err: any) {
      setError(err.message || 'Error al cargar tarjetas')
      console.error('Error fetching vouchers:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVouchers()
  }, [])

  const handleAddVoucher = async (voucher: Omit<Voucher, 'id'>) => {
    try {
      const newVoucher = await api.createVoucher(voucher)
      setVouchers([...vouchers, newVoucher])
    } catch (err: any) {
      setError(err.message || 'Error al crear tarjeta')
    }
  }

  const handleUpdateVoucher = async (id: string, voucher: Partial<Voucher>) => {
    try {
      const updatedVoucher = await api.updateVoucher(id, voucher)
      setVouchers(vouchers.map(v => v.id === id ? updatedVoucher : v))
    } catch (err: any) {
      setError(err.message || 'Error al actualizar tarjeta')
    }
  }

  const handleDeleteVoucher = async (id: string) => {
    try {
      await api.deleteVoucher(id)
      setVouchers(vouchers.filter(v => v.id !== id))
    } catch (err: any) {
      setError(err.message || 'Error al eliminar tarjeta')
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎫 Generador de Tarjetas</h1>
        <p>Crea tarjetas simbólicas tipo "Vale por..."</p>
      </header>

      {error && (
        <div className="error-message">
          ⚠️ {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      <div className="app-content">
        <div className="form-section">
          <h2>Crear Nueva Tarjeta</h2>
          <VoucherForm onSubmit={handleAddVoucher} />
        </div>

        <div className="list-section">
          <div className="list-header">
            <h2>Mis Tarjetas ({vouchers.length})</h2>
            <button onClick={fetchVouchers} disabled={loading}>
              {loading ? '🔄' : '↻'} Actualizar
            </button>
          </div>
          
          {loading ? (
            <div className="loading">Cargando...</div>
          ) : (
            <VoucherList
              vouchers={vouchers}
              onUpdate={handleUpdateVoucher}
              onDelete={handleDeleteVoucher}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App


