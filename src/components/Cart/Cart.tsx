import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'

function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items)

  console.log(cartItems)
  return <h1>{cartItems.length}</h1>
}

export default Cart
