import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

export default function Home() {
  const [ movies, setMovies ] = useState([])
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    
    async function loadMovies() {

      const response = await api.get('movie/now_playing', {
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: 'pt-BR',
          page: 1
        }
      })

      setMovies(response.data.results)
      setLoading(false)
    }

    loadMovies()
  },[])

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando...</h2>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className='lista-filmes'>
        {movies.map((movie) => {
          return(
            <article key={movie.id}>
              <strong>{movie.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
              <Link to={`/filme/${movie.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
