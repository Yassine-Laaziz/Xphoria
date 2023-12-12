'use client'

import { Dispatch, SetStateAction } from 'react'
import { DisplayProduct } from '../types'
import Modal from './Modal'
import ProductPage from './ProductPage'

export default function ProductModal({ product, showModal, setShowModal }: props) {
  return (
    <Modal open={showModal} setOpen={setShowModal}>
      <ProductPage product={product} />
    </Modal>
  )
}

interface props {
  product: DisplayProduct
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}
