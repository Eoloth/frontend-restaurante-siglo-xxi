import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {FORMS_INPUTS, noop} from '../constants/appConstants'

const useEditableForm = () => {
  const {register, handleSubmit} = useForm()
  const handleFileInput = (type, initialValue) => {
    const [value, setValue] = useState(initialValue)
    const onChangeHandler =
      type === 'text' ? (e) => setValue(e.target.value) : (e) => noop
    return [value, onChangeHandler]
  }
  return {
    handleSubmit,
    EditableForm: ({modalInfo, domain, encType}) => {
      return (
        <form encType={encType}>
          {Object.entries(modalInfo)
            .filter(([id]) => id !== 'id')
            .map(([id, initialValue]) => {
              const prop = FORMS_INPUTS[domain].props[id]
              if (!prop) return
              const {type, value: defaultValue, ...otherProps} = prop
              const [value, onChangeHandler] = handleFileInput(
                type,
                type === 'password' ? defaultValue : initialValue,
              )
              if (type === 'file')
                return (
                  <div className="mb-6">
                    <label htmlFor={id}>{`${id.toUpperCase()}: `}</label>
                    <input
                      type={type}
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id={id}
                      {...register(id)}
                      onChange={onChangeHandler}
                      {...otherProps}
                    />
                    <img src={value} />
                  </div>
                )
              if (type === 'checkbox')
                return (
                  <div className="mb-6">
                    <label htmlFor={id}>{`${id.toUpperCase()}: `}</label>
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
              if (type === 'list')
                return (
                  <div className="mb-6">
                    <label htmlFor={id}>{`${id.toUpperCase()}: `}</label>
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
              return (
                <div className="mb-6">
                  <label htmlFor={id}>{`${id.toUpperCase()}: `}</label>
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

export default useEditableForm
