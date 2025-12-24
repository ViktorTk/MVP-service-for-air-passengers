import ServiceItem from './ServiceItem/ServiceItem'
import { MOCK_SERVICES } from '../../mockData/mockData'
import { useDispatch } from 'react-redux'
import { clearCart } from '../../features/cartSlice'

function ServiceList() {
  const dispatch = useDispatch()

  const services = MOCK_SERVICES.map((item) => (
    <ServiceItem
      key={item.id}
      id={item.id}
      title={item.title}
      price={item.price}
    />
  ))

  return (
    <>
      <ul>{services}</ul>
      <button onClick={() => dispatch(clearCart())}>
        Очистить список услуг
      </button>
    </>
  )
}

export default ServiceList
