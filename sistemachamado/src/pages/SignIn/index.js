import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/logo.png'
import { AuthContext } from '../../contexts/auth'

import './styles.css'

export default function SignIn() {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  
  const { signIn, loadingAuth } = useContext(AuthContext)

  function handleSubmit(e) {
    e.preventDefault()

    if(email !== '' && password !== '') {
      signIn(email, password)
    }
  }

  return (
    <div className='container-center'>
      <div className="login">
        
        <div className="login-area">
          <img src={logoImg} alt="Imagem da logo do sistema" />
        </div>
        
        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input 
            type="email" 
            placeholder='email@email.com' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder='Digite a senha' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
        </form>

        <Link to="/register">Criar uma conta</Link>
      </div>
    </div>
  )
}
