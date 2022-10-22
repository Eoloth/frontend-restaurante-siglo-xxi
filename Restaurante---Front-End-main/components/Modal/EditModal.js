import React, {Fragment, useState, useEffect, Children, isValidElement} from 'react'
import {MODAL_TYPES} from '../../constants/appConstants'
import Modal from './Modal'

const EditModal = ({getModalHandler, postModalHandler, modalTitle, children}) => {
  const [modalToggle, setModalToggle] = useState(false)
  const [modalInfo, setModalInfo] = useState({})
  const [hasModalInfo, setHasModalInfo] = useState(false)
  const [fetchModalInfo, setFetchModalInfo] = useState(false)

  const onButtonClick = () => {
    if (hasModalInfo) {
      setModalToggle(true)
      setFetchModalInfo(false)
    } else {
      setFetchModalInfo(true)
    }
  }

  const handleActionModal = async () => {
    await postModalHandler()
    setModalToggle(false)
  }

  const handleCloseModal = () => {
    setModalToggle(false)
    setFetchModalInfo(false)
  }

  useEffect(() => {
    if (!fetchModalInfo) return
    const modalHandler = async () => {
      const res = await getModalHandler()
      console.log('** res', res)
      setModalInfo(res.data)
      setHasModalInfo(true)
      setModalToggle(true)
    }
    modalHandler()
  }, [fetchModalInfo])

  const childWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return React.cloneElement(child, {modalInfo})
    }
    console.log('** modalInfo', modalInfo)
    return child
  })

  return (
    <Fragment>
      <button
        className="button is-responsive is-warning is-light"
        onClick={onButtonClick}
      >
        Editar
      </button>
      {modalToggle && (
        <Modal
          title={modalTitle}
          toggle={modalToggle}
          isButtonValid={true}
          toggleOnClick={handleCloseModal}
          type={MODAL_TYPES.TRANSACTION}
          onClick={handleActionModal}
        >
          {childWithProps}
        </Modal>
      )}
    </Fragment>
  )
}

export default EditModal
