import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {noop} from '../constants/appConstants'

const useCreateForm = () => {
  const {register, handleSubmit, getValues} = useForm()
  const handleFileInput = (type, initialValue) => {
    const [value, setValue] = useState(initialValue)
    const onChangeHandler =
      type === 'text' ? (e) => setValue(e.target.value) : (e) => noop
    return [value, onChangeHandler]
  }
  return {
    handleSubmit,
    getValues,
    CreateForm: ({createFormProps}) => {
      return (
        <form encType={createFormProps.encType}>
          {Object.entries(createFormProps.props)
            .filter(([id]) => id !== 'id')
            .map(([id, props]) => {
              const {initialValue, type, text, ...otherProps} = props
              const [value, onChangeHandler] = handleFileInput(type, initialValue)
              if (type === 'list')
                return (
                  <div className="mb-6">
                    <label htmlFor={id}>{`${text.toUpperCase()}: `}</label>
                    <input
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      list={id}
                      {...register(id)}
                      onChange={onChangeHandler}
                      {...otherProps}
                    />
                    <datalist id={id}>
                      {value.map((option) => (
                        <option value={option.id}>{option.title}</option>
                      ))}
                    </datalist>
                  </div>
                )
              if (type === 'checkbox')
                return (
                  <div className="mb-6">
                    <label htmlFor={id}>{`${text.toUpperCase()}: `}</label>
                    <input
                      type={type}
                      className="form-control"
                      id={id}
                      value={value}
                      {...register(id)}
                      onChange={onChangeHandler}
                      {...otherProps}
                    />
                  </div>
                )
              return (
                <div className="mb-6">
                  <label htmlFor={id}>{`${text.toUpperCase()}: `}</label>
                  <input
                    type={type}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id={id}
                    value={value}
                    {...register(id)}
                    onChange={onChangeHandler}
                    {...otherProps}
                  />
                </div>
              )
            })}
        </form>
      )
    },
  }
}

export default useCreateForm
