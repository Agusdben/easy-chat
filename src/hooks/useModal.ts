import { useState } from 'react'
import { type Modal } from '../types/modal'

interface Props {
  title: string
}

const useModal = ({ title = '' }: Props): Modal => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleModal = (): void => {
    setIsOpen(last => !last)
  }

  return {
    isOpen,
    title,
    handleModal
  }
}

export default useModal
