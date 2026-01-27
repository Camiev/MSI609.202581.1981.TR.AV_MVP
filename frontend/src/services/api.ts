import axios from 'axios'
import { Item } from '../components/ItemForm'

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
  async getItems(): Promise<Item[]> {
    console.log('Getting items from API')
    const response = await apiClient.get<Item[]>('/items')
    console.log('Items received from API:', response.data)
    return response.data
  },

  async getItem(id: string): Promise<Item> {
    const response = await apiClient.get<Item>(`/items/${id}`)
    return response.data
  },

  async createItem(item: Omit<Item, 'id'>): Promise<Item> {
    console.log('Creating item in API:', item)
    const response = await apiClient.post<Item>('/items', item)
    console.log('Response from API:', response.data)
    return response.data
  },

  async updateItem(id: string, item: Partial<Item>): Promise<Item> {
    const response = await apiClient.put<Item>(`/items/${id}`, item)
    return response.data
  },

  async deleteItem(id: string): Promise<void> {
    await apiClient.delete(`/items/${id}`)
  },
}

