import {DOMAINS} from '../constants/appConstants'
import buildUrl from '../utils/buildService'
import getApiUrl from '../utils/getApiUrl'

const getStatusesHandler = async () => {
  // const paymentsApiUrl = buildUrl(getApiUrl(DOMAINS.PAYMENTS).getAllPayments)
  // return await axios(paymentsApiUrl, {
  //   method: 'GET',
  //   headers: {accept: 'application/json'},
  // })
  return {
    data: [
      {id: 'PENDING', title: 'pending'},
      {id: 'DELIVERED', title: 'delivered'},
    ],
  }
}

export default getStatusesHandler
