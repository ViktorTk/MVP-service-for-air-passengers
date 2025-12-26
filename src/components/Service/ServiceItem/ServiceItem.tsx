import type { serviceType } from '../../../types'
import { addService } from '../../../features/cartSlice'
import { useDispatch } from 'react-redux'

function ServiceItem({ id, title, price }: serviceType) {
  const dispatch = useDispatch()

  return (
    <li className="service-item">
      <span className="service-item__title">{title}</span>
      <span className="service-item__price">{price}₽</span>
      <button onClick={() => dispatch(addService({ id, title, price }))}>
        Добавить в корзину
      </button>
    </li>
  )
}

export default ServiceItem
