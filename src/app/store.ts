import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cartSlice'
import cartListenerMiddleware from '../features/cartListenerMiddleware'
import { hydrateCart } from '../features/cartSlice'
import { getFromLocalStorage } from '../features/cartListenerMiddleware'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(cartListenerMiddleware.middleware),
})

const savedCart = getFromLocalStorage()
store.dispatch(hydrateCart(savedCart))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
