import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import './styles.css'

export default function Favoritos() {
  const [ movies, setMovies ] = useState([])

  useEffect(() => {

    const minhaLista = localStorage.getItem('@primeflix')

    setMovies(JSON.parse(minhaLista) || [])

  },[])

  function excluirFilme(id) {

    let filtroFilmes = movies.filter((item) => { return ( item.id !== id)})

    setMovies(filtroFilmes)
    localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes))

    toast.success('Filme removido com sucesso.')

  }

  return (
    <div className='meus-filmes'>
      <h1>Meus filmes</h1>

      {movies.length === 0 && <span>Você não tem filmes salvo.</span>}

      <ul>
        {movies.map((movie) => {
          return(
            <li key={movie.id}>
              <span>{movie.title}</span>
              <div>
                <Link to={`/filme/${movie.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirFilme(movie.id)}>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
