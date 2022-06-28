import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiPlus } from 'react-icons/fi'

import { AuthContext } from '../../contexts/auth'
import firebase from '../../services/firebaseConnection'

import Header from '../../components/Header'
import Title from '../../components/Title'

import './styles.css'

export default function New() {
  const { id } = useParams()
  const history = useHistory()

  const { user } = useContext(AuthContext)

  const [customers, setCustomers] = useState([])
  const [customerSelected, setCustomerSelected] = useState(0)
  const [loadCustomers, setLoadCustomers] = useState(true)
  const [idCustomer, setIdCustomer] = useState(false)

  const [assunto, setAssunto] = useState('Suporte')
  const [status, setStatus] = useState('Aberto')
  const [complemento, setComplemento] = useState('')
  
  useEffect(() => {
    
    async function loadCustomers() {
      await firebase.firestore()
        .collection('customers')
        .get()
        .then((snapshot) => {
          let lista = []

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia
            })
          })

          if (lista.length === 0 ) {
            console.log('NENHUMA EMPRESA ENCONTRADA');
            setCustomers([{id: '1', nomeFantasia: ''}])
            setLoadCustomers(false)
            return
          }

          setCustomers(lista)
          setLoadCustomers(false)

          if (id) {
            loadId(lista)
          }
        })
        .catch((error) => {
          setLoadCustomers(false)
          setCustomers([{id: '1', nomeFantasia: ''}])
        })
    }

    loadCustomers()
  }, [id])

  async function loadId(lista) {
    await firebase.firestore()
      .collection('chamados')
      .doc(id)
      .get()
      .then((snapshot) => {
        let index = lista.findIndex(item => item.id === snapshot.data().clienteId)
        
        setCustomerSelected(index)
        setAssunto(snapshot.data().assunto)
        setStatus(snapshot.data().status)
        setComplemento(snapshot.data().complemento)
        setIdCustomer(true)
      })
      .catch(() => {
        toast.error('Erro ao carregar usuário')
        setIdCustomer(false)
      })
  }

  function handleChangeCustomers(e) {
    setCustomerSelected(e.target.value)
  }

  function handleChangeSelect(e) {
    setAssunto(e.target.value)
  }

  function handleOptionChange(e) {
    setStatus(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (idCustomer) {
      await firebase.firestore()
      .collection('chamados')
      .doc(id)
      .update({
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        status: status,
        complemento: complemento,
        userId: user.uid
      })
      .then(() => {
        toast.success('Chamado editado com sucesso')
        setComplemento('')
        setCustomerSelected(0)
        history.push('/dashboard')
      })
      .catch(() => {
        toast.error("Ocorreu um erro ao registrar")
      })

      return
    }

    await firebase.firestore()
      .collection('chamados')
      .add({
        created: new Date(),
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        status: status,
        complemento: complemento,
        userId: user.uid
      })
      .then(() => {
        toast.success("Chamado criado com sucesso!")
        setComplemento('')
        setCustomerSelected(0)
      })
      .catch(() => {
        toast.error("Ocorreu um erro ao registrar")
      })

  }

  return (
    <div>
      <Header/>

      <div className="content">
        <Title name="Novo Chamado">
          <FiPlus size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit}>

            <label>Cliente</label>
            { loadCustomers
              ? ( 
                <input type="text" disabled value="Carregando clientes..." />
              )
              : (
                <select value={customerSelected} onChange={handleChangeCustomers}>
                  {customers.map((customer, index) => {
                    return(
                      <option key={customer.id} value={index}>{customer.nomeFantasia}</option>
                    )
                  })}
                </select>
              )
            }

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Técnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input 
                type="radio" 
                name='radio' 
                value='Aberto' 
                onChange={handleOptionChange} 
                checked={ status === 'Aberto'}
              />
              <span>Em Aberto</span>

              <input 
                type="radio" 
                name='radio' 
                value='Progresso' 
                onChange={handleOptionChange} 
                checked={ status === 'Progresso'}
              />
              <span>Em Progresso</span>

              <input 
                type="radio" 
                name='radio' 
                value='Atendido' 
                onChange={handleOptionChange} 
                checked={ status === 'Atendido'}
              />
              <span>Atendido</span>
            </div>

            <label>Complemento</label>
            <textarea 
              type="text" 
              placeholder='Descreva seu problema (opcional).' 
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
            <button type='submit'>Salvar</button>
          </form>
        </div>
      </div>
    </div>
  )
}
