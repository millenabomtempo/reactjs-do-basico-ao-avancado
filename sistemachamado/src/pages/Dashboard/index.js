import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../services/firebaseConnection'
import { format } from 'date-fns'

import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from 'react-icons/fi'

import Header from '../../components/Header'
import Title from '../../components/Title'
import Modal from '../../components/Modal'

import './styles.css'

const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc')

export default function Dashboard() {
  const [chamados, setChamados] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [lastDocs, setLastDocs] = useState()
  const [showPostModal, setShowPostModal] = useState(false)
  const [detail, setDetail] = useState()

  useEffect(() => {

    async function loadChamados() {
      await listRef.limit(5)
        .get()
        .then((snapshot) => {
          updateState(snapshot)
        })
        .catch((error) => {
          console.log('Erro ao buscar ', error);
          setLoadingMore(false)
        })
  
        setLoading(false)
    }

    loadChamados()

    return () => {}
  },[])

  async function updateState(snapshot) {
    const isCollectionEmpty = snapshot.size === 0

    if (!isCollectionEmpty) {
      let lista = []

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          createdFormatted: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          status: doc.data().status,
          complemento: doc.data().complemento,
        })
      })

      const lastDoc = snapshot.docs[snapshot.docs.length - 1]

      setChamados(chamados => [...chamados, ...lista])
      setLastDocs(lastDoc)
    } else {
      setIsEmpty(true)
    }

    setLoadingMore(false)
  }

  async function handleMore() {
    setLoadingMore(true)

    await listRef.startAfter(lastDocs).limit(5)
      .get()
      .then((snapshot) => {
        updateState(snapshot)
      })
  }

  function togglePostModal(chamado) {
    setShowPostModal(!showPostModal)
    setDetail(chamado)
  }

  if (loading) {
    return (
      <div>
        <Header />
        <div className="content">
          <Title name="Atendimentos">
            <FiMessageSquare size={25}/>
          </Title>
        </div>

        <div className="container dashboard">
          <span>Buscando chamados...</span>
        </div>
        
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Atendimentos">
          <FiMessageSquare size={25}/>
        </Title>

        {
          chamados.length === 0 
          ?
          (
            <div className="container dashboard">
              <span>Nenhumm chamado registrado...</span>
              <Link to='new' className='new'>
                <FiPlus size={25} color="#FFF"/>
                Novo chamado
              </Link>
            </div>
          )
          :
          (
            <>
              <Link to='new' className='new'>
                <FiPlus size={25} color="#FFF"/>
                Novo chamado
              </Link>

              <table>
                <thead>
                  <th scope='col'>Cliente</th>
                  <th scope='col'>Assunto</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Cadastrado em</th>
                  <th scope='col'>#</th>
                </thead>
                <tbody>
                  {
                    chamados.map((chamado, index) => {
                      return (
                        <tr key={index}>
                          <td data-label="Cliente">{chamado.cliente}</td>
                          <td data-label="Assunto">{chamado.assunto}</td>
                          <td data-label="Status">
                            <span className="badge" style={{backgroundColor: chamado.status === 'Aberto' ? '#5cb85c' : '#999' }}>{chamado.status}</span>
                          </td>
                          <td data-label="Cadastrado">{chamado.createdFormatted}</td>
                          <td data-label="#">
                            <button className="action" style={{backgroundColor: '#3583f6' }} onClick={() => togglePostModal(chamado)}>
                              <FiSearch color="#FFF" size={17} />
                            </button>
                            <Link to={`/new/${chamado.id}`} className="action" style={{backgroundColor: '#F6a935' }}>
                              <FiEdit2 color="#FFF" size={17} />
                            </Link>
                          </td>
                        </tr>
                      )
                    })
                  }
                
                </tbody>
              </table>
              
              { loadingMore && <h3 style={{ textAlign: 'center', marginTop: 15 }}>Buscando dados...</h3>}
              { !loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais</button> }
              
            </>
          )
        }
        
      </div>

      {showPostModal && ( 
        <Modal 
          conteudo={detail}
          close={togglePostModal}
        />
      )}
    </div>
  )
}
