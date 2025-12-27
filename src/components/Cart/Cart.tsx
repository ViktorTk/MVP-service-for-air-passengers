import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../app/store.ts'
import Icon from '@mdi/react'
import { mdiCartVariant } from '@mdi/js'
import Modal from '../Modal/Modal.tsx'
import { clearCart } from '../../features/cartSlice.ts'
import CartItem from './CartItem/CartItem.tsx'

function Cart() {
  const [openModal, setOpenModal] = useState(false)
  const cartItems = useSelector((state: RootState) => state.cart.items)

  console.log(cartItems)
  const dispatch = useDispatch()

  return (
    <>
      <div className="service-title-card_block">
        <h2>Перечень услуг:</h2>
        <button
          className="cart-button"
          onClick={() => {
            setOpenModal(true)
          }}
        >
          <Icon
            path={mdiCartVariant}
            size={1.15}
            className="cart-button__icon"
          />
          {cartItems.length > 0 ? (
            <span className="cart-button__text">{cartItems.length}</span>
          ) : (
            ''
          )}
        </button>
      </div>
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        children={
          <>
            {' '}
            <button onClick={() => dispatch(clearCart())}>
              Очистить список услуг
            </button>
            <CartItem />
          </>
        }
      ></Modal>
    </>
  )
}

export default Cart
