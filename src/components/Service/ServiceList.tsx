import ServiceItem from './ServiceItem/ServiceItem'
import { MOCK_SERVICES } from '../../mockData/mockData'
import style from './ServiceList.module.css'

function ServiceList() {
  const services = MOCK_SERVICES.map((item) => (
    <ServiceItem
      key={item.id}
      id={item.id}
      title={item.title}
      price={item.price}
    />
  ))

  return <ul className={style['service-list']}>{services}</ul>
}

export default ServiceList
