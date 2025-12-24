import type { serviceType } from '../../../types'
import { addService } from '../../../features/cartSlice'
import { useDispatch } from 'react-redux'

function ServiceItem({ id, title, price }: serviceType) {
  const dispatch = useDispatch()

  return (
    <li>
      <span>{title}</span>
      <span>{price}</span>
      <button onClick={() => dispatch(addService({ id, title, price }))}>
        Добавить в корзину
      </button>
    </li>
  )
}

export default ServiceItem
