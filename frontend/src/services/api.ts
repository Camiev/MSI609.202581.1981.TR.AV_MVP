import axios from 'axios'
import { Voucher } from '../components/VoucherForm'

// Usar proxy de Vite en desarrollo, o URL completa en producción
const isDev = import.meta.env.DEV
const API_URL = isDev ? '/api' : (import.meta.env.VITE_API_URL || 'http://localhost:3001/api')

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = {
  async getVouchers(): Promise<Voucher[]> {
    const response = await apiClient.get<Voucher[]>('/vouchers')
    return response.data
  },

  async getVoucher(id: string): Promise<Voucher> {
    const response = await apiClient.get<Voucher>(`/vouchers/${id}`)
    return response.data
  },

  async createVoucher(voucher: Omit<Voucher, 'id'>): Promise<Voucher> {
    const response = await apiClient.post<Voucher>('/vouchers', voucher)
    return response.data
  },

  async updateVoucher(id: string, voucher: Partial<Voucher>): Promise<Voucher> {
    const response = await apiClient.put<Voucher>(`/vouchers/${id}`, voucher)
    return response.data
  },

  async deleteVoucher(id: string): Promise<void> {
    await apiClient.delete(`/vouchers/${id}`)
  },
}

