import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../../app/store.ts'
import { minusCard, plusCard } from '../../../features/cartSlice.ts'
import style from './CartItem.module.css'

function CartItem() {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()

  const cartItemsLi = cartItems.map((el) => (
    <tr key={el.id}>
      <td>{el.title}</td>
      <td>{el.price}</td>
      <td>{el.count}</td>
      <td>{el.price * el.count}</td>
      <td>
        <span onClick={() => dispatch(minusCard(el))}>-</span> /{' '}
        <span onClick={() => dispatch(plusCard(el))}>+</span>
      </td>
    </tr>
  ))

  const allSum = cartItems.reduce((acc, el) => {
    return acc + el.count * el.price
  }, 0)

  return (
    <table className={style['table']}>
      <thead>
        <th>Услуга</th>
        <th>Стоимость</th>
        <th>Кол-во</th>
        <th>Сумм. стоимость</th>
        <th>-/+</th>
      </thead>
      <tbody>
        {cartItemsLi}
        <tr className={style['all-sum-tr']}>
          <td>Итоговая стоимость:</td>
          <td>{allSum}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default CartItem
