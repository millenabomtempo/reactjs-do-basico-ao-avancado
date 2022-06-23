import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <>
      <h2>Eita! A página que está procurando não existe.</h2>
    
      <br />
      <span>Encontramos essas páginas aqui:</span><br />
      <Link to="/">Home</Link><br />
      <Link to="/sobre">Sobre</Link><br />
      <Link to="/contato">Contato</Link>
    </>
  )
}
