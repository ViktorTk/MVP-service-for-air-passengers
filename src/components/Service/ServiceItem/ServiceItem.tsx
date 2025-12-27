import type { serviceType } from '../../../types'
import { addService } from '../../../features/cartSlice'
import { useDispatch } from 'react-redux'
import style from './ServiceItem.module.css'

function ServiceItem({ id, title, price }: serviceType) {
  const dispatch = useDispatch()

  return (
    <li className={style['service-item']}>
      <span>{title}</span>
      <span className={style['service-item__price']}>{price}₽</span>
      <button onClick={() => dispatch(addService({ id, title, price }))}>
        Добавить в корзину
      </button>
    </li>
  )
}

export default ServiceItem
