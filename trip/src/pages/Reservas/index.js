import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBooking, updateBookingAmountRequest } from '../../store/modules/booking/actions'
import { MdAddCircle, MdDelete, MdRemoveCircle } from 'react-icons/md'
import './style.css'

export default function Reservas() {
  const dispatch = useDispatch()
  const bookings = useSelector(state => state.booking)
  
  function handleDelete(id) {
    dispatch(removeBooking(id))
  }

  function decrementAmount(booking) {
    dispatch(updateBookingAmountRequest(booking.id, booking.amount - 1))
  }

  function incrementAmount(booking) {
    dispatch(updateBookingAmountRequest(booking.id, booking.amount + 1))
  }

  return (
    <div>
      <h1 className='title'>Você solicitou {bookings.length} reservas</h1>
      
      {bookings.map(booking => (
        <div className="reservas" key={booking.id}>
          <img
          src={booking.image}
          alt={booking.title}
          />
          <strong>{booking.title}</strong>

          <div id="amount">
            <button type="button" onClick={()=> decrementAmount(booking) }>
              <MdRemoveCircle size={25} color="#191919" />
            </button>
            <input type="text" readOnly value={booking.amount} />
            <button type="button" onClick={()=> incrementAmount(booking) }>
              <MdAddCircle size={25} color="#191919" />
            </button>
          </div>
          <button
          type="button"
          onClick={()=> handleDelete(booking.id)}
          >
            <MdDelete size={20} color="#191919" />
          </button>
        </div>
      ))}

      <footer>
        <button type="button">Solicitar Reservas</button>
      </footer>
    </div>
  )
}
