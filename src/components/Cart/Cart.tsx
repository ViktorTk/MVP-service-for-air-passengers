import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../app/store.ts'
import Icon from '@mdi/react'
import { mdiCartVariant, mdiCartRemove, mdiCartArrowUp } from '@mdi/js'
import Modal from '../Modal/Modal.tsx'
import { clearCart } from '../../features/cartSlice.ts'
import CartItem from './CartContent/CartContent.tsx'
import style from './Cart.module.css'

type ModalStep = 'cart' | 'success'

function Cart() {
  const [openModal, setOpenModal] = useState(false)
  const [modalStep, setModalStep] = useState<ModalStep>('cart')
  const [countdown, setCountdown] = useState(3)
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()
  const intervalRef = useRef<number | null>(null)

  const handleCloseModal = () => {
    setOpenModal(false)
    setModalStep('cart')
    setCountdown(3)
  }

  useEffect(() => {
    if (modalStep === 'success' && countdown > 0) {
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            handleCloseModal()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [modalStep, countdown])

  const handleCheckout = () => {
    dispatch(clearCart())
    setModalStep('success')
  }

  return (
    <>
      <div className={style['service-title-card_block']}>
        <h2>Перечень услуг:</h2>
        <button
          className={style['cart-button']}
          onClick={() => setOpenModal(true)}
        >
          <Icon
            path={mdiCartVariant}
            size={1.15}
            className={style['cart-button__icon']}
          />
          {cartItems.length > 0 ? (
            <span className={style['cart-button__text']}>
              {cartItems.length}
            </span>
          ) : (
            ''
          )}
        </button>
      </div>

      <Modal isOpen={openModal} onClose={handleCloseModal}>
        {modalStep === 'cart' ? (
          <>
            <button
              className={style['cart-button__clear']}
              onClick={() => dispatch(clearCart())}
            >
              <Icon
                path={mdiCartRemove}
                size={1.15}
                className={style['cart-button__icon']}
              />
              <span>Очистить список услуг</span>
            </button>
            <CartItem />

            {cartItems.length > 0 ? (
              <button className={style['buy-card']} onClick={handleCheckout}>
                <Icon
                  path={mdiCartArrowUp}
                  size={1.15}
                  className={style['cart-button__icon']}
                />
                <span>Оплатить заказ</span>
              </button>
            ) : null}
          </>
        ) : (
          <div className={style['success-message']}>
            <h3>Оплата прошла успешно!</h3>
            <p>
              Модальное окно закроется через <strong>{countdown}</strong> сек...
            </p>
          </div>
        )}
      </Modal>
    </>
  )
}

export default Cart
