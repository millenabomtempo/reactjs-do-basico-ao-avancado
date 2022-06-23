import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <hr />
      <Link to="/sobre">Sobre</Link><br />
      <Link to="/contato">Contato</Link>
      <hr />
      <Link to="/produto/123456">Acessar Produto 123456</Link>
    </>
  )
}
