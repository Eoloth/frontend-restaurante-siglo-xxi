import {useState} from 'react'
import Modal from '../Modal/Modal'
import axios from 'axios'
import {getCookie} from 'cookies-next'
import buildUrl from '../../utils/buildService'
import getApiUrl from '../../utils/getApiUrl'
import {DOMAINS, HTTP_STATUSES, FORMS_INPUTS} from '../../constants/appConstants'
import useCreateForm from '../../utils/useCreateForm'

const CreateCategory = ({state, actions}) => {
  const [modalToggle, setModalToggle] = useState(false)
  const {getValues, CreateForm} = useCreateForm()
  const buttonClickHandler = () => {
    setModalToggle(!modalToggle)
  }
  const handleCloseModal = () => {
    setModalToggle(false)
  }
  const onSubmit = async () => {
    const createCategoryApi = buildUrl(getApiUrl(DOMAINS.CATEGORIES).createCategory)
    const token = getCookie('JWT_TOKEN')
    const requestBody = getValues()
    const formData = new FormData()
    formData.append('image', requestBody.image.item(0))
    formData.append('title', requestBody.title)
    const res = await axios.post(createCategoryApi, formData, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.status === HTTP_STATUSES.CREATED) {
      actions.setReloadComponent(true)
      handleCloseModal()
    }
  }
  return (
    <div
      id="create-Category"
      className="panel-heading is-flex is-align-items-flex-end is-justify-content-flex-end"
    >
      <button
        className="button is-large is-responsive is-fullwidth is-info is-light"
        onClick={buttonClickHandler}
      >
        Crear Categoría
      </button>
      {modalToggle && (
        <Modal
          title={'Crear Categoría'}
          toggle={modalToggle}
          isButtonValid={true}
          toggleOnClick={handleCloseModal}
          onClick={onSubmit}
        >
          <CreateForm createFormProps={FORMS_INPUTS[DOMAINS.CATEGORIES]} />
        </Modal>
      )}
    </div>
  )
}

export default CreateCategory
