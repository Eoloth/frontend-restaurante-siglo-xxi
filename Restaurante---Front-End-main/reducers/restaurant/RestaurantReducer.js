import {setCookies} from 'cookies-next'
import {useRouter} from 'next/router'
import {useReducer} from 'react'
import {RESTAURANT_ACTIONS} from './RestaurantActions'

const setMainPage = (prevState, mainPage) => {
  return {
    ...prevState,
    mainPage,
  }
}

const setTables = (prevState, tables) => {
  return {
    ...prevState,
    tables,
  }
}

const setCategories = (prevState, categories) => {
  return {
    ...prevState,
    categories,
  }
}

const setReloadComponent = (prevState, reloadComponent) => {
  return {
    ...prevState,
    reloadComponent,
  }
}

const logout = (prevState) => {
  const router = useRouter()
  setCookies('JWT_TOKEN', '', {
    expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'),
  })
  router.push('/login')
  return prevState
}

const reducer = (state, action) => {
  const {type, data} = action
  switch (type) {
    case RESTAURANT_ACTIONS.SET_MAIN_PAGE:
      return setMainPage(state, data)
    case RESTAURANT_ACTIONS.SET_TABLES:
      return setTables(state, data)
    case RESTAURANT_ACTIONS.LOGOUT:
      return logout(state)
    case RESTAURANT_ACTIONS.SET_CATEGORIES:
      return setCategories(state, data)
    case RESTAURANT_ACTIONS.SET_RELOAD_COMPONENT:
      return setReloadComponent(state, data)
    default:
      throw new Error()
  }
}

const useActions = (restaurantInitialState) => {
  const [state, dispatch] = useReducer(reducer, restaurantInitialState)
  const setMainPage = (dispatch) => (data) => {
    dispatch({type: RESTAURANT_ACTIONS.SET_MAIN_PAGE, data})
  }

  const setTables = (dispatch) => (data) => {
    dispatch({type: RESTAURANT_ACTIONS.SET_TABLES, data})
  }

  const setReloadComponent = (dispatch) => (data) => {
    dispatch({type: RESTAURANT_ACTIONS.SET_RELOAD_COMPONENT, data})
  }

  const setCategories = (dispatch) => (data) => {
    dispatch({type: RESTAURANT_ACTIONS.SET_CATEGORIES, data})
  }

  const logout = (dispatch) => () => {
    dispatch({type: RESTAURANT_ACTIONS.LOGOUT})
  }

  const actions = {
    setMainPage: setMainPage(dispatch),
    setTables: setTables(dispatch),
    setReloadComponent: setReloadComponent(dispatch),
    setCategories: setCategories(dispatch),
    logout: logout(dispatch),
  }
  return {
    state,
    actions,
  }
}

export {useActions}
