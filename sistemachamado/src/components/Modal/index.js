import React from 'react'
import { FiX } from 'react-icons/fi'

import './styles.css'

export default function Modal({ conteudo, close }) {
  return (
    <div className='modal'>
      <div className="container">
        <button className="close" onClick={close}>
          <FiX size={23} color="#FFF" />
          Voltar
        </button>

        <div>
          <h2>Detalhes do chamado</h2>
          
          <div className="row">
            <span>Cleinte: <i>{conteudo.cliente}</i></span>
          </div>

          <div className="row">
            <span>Assunto: <i>{conteudo.assunto}</i></span>
            <span>Cadastrado em: <i>{conteudo.createdFormatted}</i></span>
          </div>

          <div className="row">
            <span>Status: <i style={{ color: '#FFF', backgroundColor: conteudo.status === 'Aberto' ? '#5cb85c' : '#999'}}>{conteudo.status}</i></span>
          </div>

          {conteudo.complemento !== '' && (
            <>
              <h3>Complemento</h3>
              <p>{conteudo.complemento}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
