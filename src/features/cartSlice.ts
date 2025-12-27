import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { serviceType, serviceTypeItem } from '../types'

interface CartState {
  items: serviceTypeItem[]
}

const initialState: CartState = {
  items: [],
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
    },
    clearCart: (state) => {
      state.items = []
    },
    hydrateCart: (state, action: PayloadAction<serviceTypeItem[]>) => {
      state.items = action.payload
    },
    minusCart: (state, action: PayloadAction<serviceTypeItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      )
      if (existingItem) {
        existingItem.count -= 1

        if (existingItem.count <= 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          )
        }
      }
    },
    plusCart: (state, action: PayloadAction<serviceTypeItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      )
      if (existingItem) {
        existingItem.count += 1
      }
    },
  },
})

export const { addService, clearCart, hydrateCart, minusCart, plusCart } =
  cartSlice.actions
export default cartSlice.reducer
