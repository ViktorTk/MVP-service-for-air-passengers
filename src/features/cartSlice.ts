import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { serviceTypeItem, serviceType } from '../types'

interface CartState {
  items: serviceTypeItem[]
}

export const getLocalStorage = () => {
  const airLineServise = localStorage.getItem('air-line-service')
  return airLineServise ? JSON.parse(airLineServise) : []
}
export const setLocalStorage = (data: serviceTypeItem[]) => {
  localStorage.setItem('air-line-service', JSON.stringify(data))
}
export const clearLocalStorage = () => {
  localStorage.removeItem('air-line-service')
}

const initialState: CartState = {
  items: getLocalStorage(),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addService: (state, action: PayloadAction<serviceType>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      )
      if (existingItem) {
        existingItem.count += 1
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }

      setLocalStorage(state.items)
    },

    clearCart: (state) => {
      state.items = []
      clearLocalStorage()
    },
  },
})

export const { addService, clearCart } = cartSlice.actions
export default cartSlice.reducer
