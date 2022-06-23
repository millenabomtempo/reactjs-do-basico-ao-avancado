import React from 'react'
import { Link } from 'react-router-dom'

export default function Sobre() {
  return (
    <>
      <h1>Sobre</h1>
      <hr />
      <Link to="/">Home</Link> <br />
      <Link to="/contato">Contato</Link>
    </>
  )
}
