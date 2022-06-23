import React from 'react'
import { Link } from 'react-router-dom'

export default function Contato() {
  return (
    <>
      <h1>Contato</h1>
      <hr />
      <Link to="/">Home</Link> <br />
      <Link to="/sobre">Contato</Link>
    </>
  )
}
