import React, {Fragment, useState, useEffect, Children, isValidElement} from 'react'
import {MODAL_TYPES} from '../../constants/appConstants'
import Modal from './Modal'

const DeleteModal = ({deleteModalHandler, modalTitle, children}) => {
  const [modalToggle, setModalToggle] = useState(false)
  const [makeDelete, setMakeDelete] = useState(false)

  const onButtonClick = () => {
    setModalToggle(true)
  }
  const handleCloseModal = () => {
    setModalToggle(false)
  }

  useEffect(() => {
    if (!makeDelete) return
    const modalHandler = async () => {
      await deleteModalHandler()
      setModalToggle(false)
    }
    modalHandler()
  }, [makeDelete])

  return (
    <Fragment>
      <button className="button is-responsive is-danger is-light" onClick={onButtonClick}>
        Eliminar
      </button>
      {modalToggle && (
        <Modal
          title={modalTitle}
          toggle={modalToggle}
          isButtonValid={true}
          toggleOnClick={handleCloseModal}
          type={MODAL_TYPES.DELETE}
          onClick={() => setMakeDelete(true)}
        >
          {children}
        </Modal>
      )}
    </Fragment>
  )
}

export default DeleteModal
