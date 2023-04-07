export type HandleModal = () => void

export interface Modal {
  isOpen: boolean
  title: string
  handleModal: HandleModal
}

export type ModalIsOpenAndTitle = Pick<Modal, 'isOpen' | 'title'>
