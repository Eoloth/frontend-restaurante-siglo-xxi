import axios from 'axios'
import {DOMAINS, HTTP_STATUSES} from '../../../constants/appConstants'
import buildUrl from '../../../utils/buildService'
import getApiUrl from '../../../utils/getApiUrl'
import {getCookie} from 'cookies-next'


const deleteOrder = (id, actions) => async () => {
  const orderApiUrl = buildUrl(getApiUrl(DOMAINS.ORDERS).deleteOrder, {id})
  const token = getCookie('JWT_TOKEN')
  const res = await axios(orderApiUrl, {
    method: 'DELETE',
    headers: {accept: 'application/json', Authorization: `Bearer ${token}`},
  })
  if (res.status === HTTP_STATUSES.NO_CONTENT) {
    actions.setReloadComponent(true)
  }
}

const fetchOrderInfoHandler = (id) => async () => {
  const categoryApiUrl = buildUrl(getApiUrl(DOMAINS.ORDERS).getOrder, {id})
  const token = getCookie('JWT_TOKEN')
  return await axios(categoryApiUrl, {
    method: 'GET',
    headers: {accept: 'application/json', Authorization: `Bearer ${token}`},
  })
}

const updateOrderHandler = (id, actions) => async (data) => {
  const orderApiUrl = buildUrl(getApiUrl(DOMAINS.ORDERS).updateOrder, {id})
  const token = getCookie('JWT_TOKEN')
  const formData = new FormData()
  formData.append('crated_at', data.crated_at)
  formData.append('status', data.status)
  formData.append('payment', data.payment)
  formData.append('products', data.products)
  formData.append('table', data.table)
  const res = await axios.patch(orderApiUrl, formData, {
    headers: {'content-type': 'multipart/fosrm-data', Authorization: `Bearer ${token}`},
  })
  if (res.status === HTTP_STATUSES.OK) {
    actions.setReloadComponent(true)
  }
}

const fetchAllOrdersInfoHandler = async () => {
  const tableApiUrl = buildUrl(getApiUrl(DOMAINS.ORDERS).getAllOrders)
  return await axios(tableApiUrl, {
    method: 'GET',
    headers: {accept: 'application/json'},
  })
}

export {fetchOrderInfoHandler, deleteOrder, updateOrderHandler, fetchAllOrdersInfoHandler}
