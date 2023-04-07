import { type HandleModal, type ModalIsOpenAndTitle } from '@/types/modal'
import XMarkIcon from '../Icons/XMarkIcon'
import Portal from '../Portal'

interface Props extends ModalIsOpenAndTitle {
  onClose: HandleModal
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({ children, onClose, isOpen, title = '' }) => {
  return (
    <Portal elementID='modal'>
      {isOpen
        ? (
        <section className=''>
          <article className=''>
            <header className=''>
              <h2 className=''>{title}</h2>
              <button
                type='button'
                className=''
                onClick={onClose}
              >
                <XMarkIcon className=''/>
              </button>
            </header>
            <div className=''>
              {children}
            </div>
          </article>
          <button
            type='button'
            onClick={onClose}
            className=''
          />
        </section>
          )
        : null}
    </Portal>
  )
}

export default Modal
