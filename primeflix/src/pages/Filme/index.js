import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import api from '../../services/api'

import './styles.css'

export default function Filme() {
  const { id } = useParams()
  const navegate = useNavigate()

  const [ movie, setMovie ] = useState({})
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {

    async function loadMovie() {

      await api.get(`/movie/${id}`, {
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: 'pt-BR'
        }
      })
      .then((response) => { 
        setMovie(response.data)
        setLoading(false)
      })
      .catch(() => {
        navegate('/', { replace: true })
        return
      })
    }

    loadMovie()

    return () => {}
  },[id, navegate])

  function saveMovie () {
    
    const minhaLista = localStorage.getItem('@primeflix')
    
    let filmesSalvo = JSON.parse(minhaLista) || []

    const hasFilme = filmesSalvo.some((filmesSalvo) => filmesSalvo.id === movie.id)

    if (hasFilme) {
      toast.warn('Esse filme já está na sua lista.!')
      return
    }

    filmesSalvo.push(movie)
    localStorage.setItem('@primeflix', JSON.stringify(filmesSalvo))
    toast.success('Filme salvo com sucesso!')
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  return (
    <div className="filme-info">
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
      <h3>Sinopse</h3>
      <span>{movie.overview}</span>
      <strong>Avaliação: {movie.vote_average} / 10</strong>

      <div className="area-buttons">
        <button
          onClick={saveMovie}
        >
          Salvar
        </button>
        <button>
          <a 
            target='_blank' 
            rel="external noreferrer" 
            href={`https://youtube.com/results?search_query=${movie.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}
