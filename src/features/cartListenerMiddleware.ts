import { createListenerMiddleware } from '@reduxjs/toolkit'
import type { TypedStartListening } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import { addService, clearCart, minusCart, plusCart } from './cartSlice'
import type { serviceTypeItem } from '../types'

const STORAGE_KEY = 'air-line-service'

export const getFromLocalStorage = (): serviceTypeItem[] => {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.warn('Ошибка при загрузке данных из LocalStorage', error)
    return []
  }
}

export const saveToLocalStorage = (items: serviceTypeItem[]): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.warn('Ошибка при сохранении данных в LocalStorage', error)
  }
}

const cartListenerMiddleware = createListenerMiddleware()

type AppStartListening = TypedStartListening<RootState>

const startAppListening =
  cartListenerMiddleware.startListening as AppStartListening

startAppListening({
  actionCreator: addService,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState()
    saveToLocalStorage(state.cart.items)
  },
})

startAppListening({
  actionCreator: clearCart,
  effect: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  },
})

startAppListening({
  actionCreator: minusCart,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState()
    saveToLocalStorage(state.cart.items)
  },
})

startAppListening({
  actionCreator: plusCart,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState()
    saveToLocalStorage(state.cart.items)
  },
})

export default cartListenerMiddleware
