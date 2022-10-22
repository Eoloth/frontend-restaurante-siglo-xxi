import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import buildUrl from '../../utils/buildService'
import getApiUrl from '../../utils/getApiUrl'
import {DOMAINS} from '../../constants/appConstants'
import {setCookie} from 'cookies-next'
import {useRouter} from 'next/router'

const FormLogin = () => {
  const [logged, setLogged] = useState(false)
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm()
  const router = useRouter()
  const onSubmit = async (data) => {
    const authApiUrl = buildUrl(getApiUrl(DOMAINS.AUTH).login)
    const res = await axios.post(authApiUrl, data)
    
    if (res.data.access) {
      setCookie('JWT_TOKEN', res.data.access)
      setLogged(true)
      
      
    }
  }

  useEffect(() => {
    if (logged) {
      router.push('/admin')
    }
  }, [logged])

  return (

    
    <form onSubmit={handleSubmit(onSubmit)} className="loginForm"  >
      <div className="mb-6">
        <input
          type="text"
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="exampleFormControlInput2"
          placeholder="Email address"
          {...register('email')}
        />
      </div>
      <div className="mb-6">
        <input
          type="password"
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="exampleFormControlInput2"
          placeholder="Password"
          {...register('password')}
        />
      </div>
      <div className="text-center lg:text-left">
        <button
          type="submit"
          className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Login
        </button>
      </div>
    </form>
  )
}

export default FormLogin
