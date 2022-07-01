export function addBookingRequest(id) {
  return {
    type: 'ADD_BOOKING_REQUEST',
    id
  }
}

export function addBookingSuccess(trip) {
  return {
    type: 'ADD_BOOKING_SUCCESS',
    trip
  }
}


export function removeBooking(id) {
  return {
    type: 'REMOVE_BOOKING',
    id
  }
}

export function updateBookingAmountRequest(id, amount) {
  return {
    type: 'UPDATE_BOOKING_REQUEST',
    id,
    amount
  }
}

export function updateBookingAmountSuccess(id, amount) {
  return {
    type: 'UPDATE_BOOKING_SUCCESS',
    id,
    amount
  }
}