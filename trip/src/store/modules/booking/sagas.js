import { call, put, all, takeLatest, select } from 'redux-saga/effects'
import { addBookingSuccess, updateBookingAmountSuccess } from './actions'
import api from '../../../services/api'
import history from '../../../services/history'

function* addToBooking({ id }) {

  const tripExists = yield select(
    state => state.booking.find(trip => trip.id === id)
  )

  const myStock = yield call(api.get, `/stock/${id}`)

  const stockAmount = myStock.data.amount

  const currentAmount = tripExists ? tripExists.amount : 0

  const amount = currentAmount + 1

  if (amount > stockAmount) {
    alert('Quantidade máxima atingida.')
    return
  }

  if (tripExists) {

    const amount = tripExists.amount + 1;

    yield put(updateBookingAmountSuccess(id, amount))
    
  } else {
    
    const response = yield call(api.get, `trips/${id}`)

    const data = {
      ...response.data,
      amount: 1
    }
  
    yield put(addBookingSuccess(data))
    history.push('/reservas')
  }
}

function* updateBookingAmount({ id, amount}) {

  if (amount <= 0) return

  const myStock = yield call(api.get, `/stock/${id}`)

  const stockAmount = myStock.data.amount

  if (amount > stockAmount) {
    alert('Quantidade máxima atingida.')
    return
  }

  yield put(updateBookingAmountSuccess(id, amount))
}

export default all([
  takeLatest('ADD_BOOKING_REQUEST', addToBooking),
  takeLatest('UPDATE_BOOKING_REQUEST', updateBookingAmount),
])