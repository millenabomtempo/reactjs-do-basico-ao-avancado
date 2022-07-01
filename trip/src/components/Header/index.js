import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'

import './style.css'

export default function Header() {
  const bookingSize = useSelector(state => state.booking.length)
  return (
    <header className='container'>
      <Link to='/'>
        <img src={logoImg} alt="Logo do projeto" className='logo' />
      </Link>
      <Link to='/reservas' className='reserva'>
        <div>
          <strong>Minhas reservas</strong>
          <span>{bookingSize} reservas</span>
        </div>
      </Link>
    </header>
  )
}
