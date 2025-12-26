import { useSelector } from 'react-redux'
import type { RootState } from '../../../app/store.ts'

function CartItem() {
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const cartItemsLi = cartItems.map((el) => (
    <li key={el.id}>
      <span>{el.title}</span>/<span>{el.price}</span>/<span>{el.count}</span>
    </li>
  ))

  return <ul>{cartItemsLi}</ul>
}

export default CartItem
