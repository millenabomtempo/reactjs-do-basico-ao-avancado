import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

export default function Header() {
  return (
    <header>
      <h2>Header</h2>
      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/contato">Contato</Link>
      </div>
    </header>
  )
}
