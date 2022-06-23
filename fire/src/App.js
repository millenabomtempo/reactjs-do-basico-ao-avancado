import { useState, useEffect } from 'react'
import firebase from './firebaseConnection'

import './styles.css'

function App() {
  // const [ idPost, setIdPost ] = useState('')
  // const [ titulo, setTitulo ] = useState('')
  // const [ autor, setAutor ] = useState('')
  // const [ posts, setPosts ] = useState([])

  const [ email, setEmail ] = useState('')
  const [ senha, setSenha ] = useState('')
  const [ cargo, setCargo ] = useState('')
  const [ nome, setNome ] = useState('')

  // const [ user, setUser ] = useState(false)
  const [ userLogged, setUserLogged ] = useState({})

  // useEffect(() => {

  //   async function loadPost() {
  //     await firebase
  //     .firestore()
  //     .collection('posts')
  //     .onSnapshot((snapshot) => {
  //       let meusPosts = []

  //       snapshot.forEach((doc) => {
  //         meusPosts.push({
  //           id: doc.id,
  //           titulo: doc.data().titulo,
  //           autor: doc.data().autor
  //         })
  //       })

  //       setPosts(meusPosts)
  //     })
  //   }

  //   loadPost()
  // },[])

  // useEffect(() => {
    
  //   async function checkLogin() {

  //     await firebase.auth().onAuthStateChanged((user) => {

  //       if(user) {

  //         setUser(true)
  //         setUserLogged({
  //           uid: user.uid,
  //           email: user.email
  //         })

  //       } else {
  //         setUser(false)
  //         setUserLogged({})
  //       }

  //     })
  //   }
    
  //   checkLogin()
  // }, [])
  
  // async function handleAdd() {

  //   await firebase
  //     .firestore()
  //     .collection('posts')
  //     .add({
  //       titulo: titulo,
  //       autor: autor
  //     })
  //     .then(() => {
  //       console.log('Dados cadastrados com sucesso')
  //       setTitulo('')
  //       setAutor('')
  //     })
  //     .catch((error) => {
  //       console.log('Gerou algum erro: ' + error)
  //     })
    
  // }

  // async function handleSearch() {
  //   await firebase
  //     .firestore()
  //     .collection('posts')
  //     .get()
  //     .then((snapshot) => {
  //       let lista = []

  //       snapshot.forEach((doc) => {
  //         lista.push({
  //           id: doc.id,
  //           titulo: doc.data().titulo,
  //           autor: doc.data().autor
  //         })
  //       })

  //       setPosts(lista)
  //     })
  //     .catch(() => {
  //       console.log('Algo de errado não está certo');
  //     })
  // }

  // async function handleEdit() {
  //   await firebase
  //     .firestore()
  //     .collection('posts')
  //     .doc(idPost)
  //     .update({
  //       titulo: titulo,
  //       autor: autor
  //     })
  //     .then(() => {
  //       console.log('Dados atualizados com sucesso')
  //       setIdPost('')
  //       setTitulo('')
  //       setAutor('')
  //     })
  //     .catch(() => {
  //       console.log('Algo de errado não está certo');
  //     })
  // }

  // async function handleDelete(id) {

  //   await firebase
  //     .firestore()
  //     .collection('posts')
  //     .doc(id)
  //     .delete()
  //     .then(() => {
  //       alert('Esse post foi excluido')
  //     })
  // }

  async function handleNewUser() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, senha)
      .then(async (value) => {
        
        await firebase
          .firestore()
          .collection('users')
          .doc(value.user.uid)
          .set({
            nome: nome,
            cargo: cargo,
            status: true
          })
          .then(() => {
            setNome('')
            setCargo('')
            setEmail('')
            setSenha('')
          })

      })
      .catch((error) => {
        if(error.code === 'auth/weak-password') {
          alert('senha muito fraca')
        } else if (error.code === 'auth/email-already-in-use') {
          alert('email já está cadastrado')
        }
      })
  }

  async function handleLogout() {
    await firebase.auth().signOut()
    setUserLogged({})
  }

  async function handleLogin() {
    await firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(async (value) => {
        
        await firebase
          .firestore()
          .collection('users')
          .doc(value.user.uid)
          .get()
          .then((snapshot) => {
            setUserLogged({
              nome: snapshot.data().nome,
              cargo: snapshot.data().cargo,
              status: snapshot.data().status,
              email: value.user.email
            })
          })
      })
      .catch((error) => {
        console.log('Erro ao efetuar login');
      })
  }

  return (
    <div>
      <h1>ReactJS & Firebase</h1>

      <div className="container">
        <label>Nome:</label>
        <input 
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        <br />
        <label>Cargo:</label>
        <input 
            type="text"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
        <br />
        <label>E-mail:</label>
        <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        <br />
        <label>Senha:</label>
        <input 
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        <br />
        <button onClick={handleLogin}>Entrar</button>
        <button onClick={handleNewUser}>Cadastrar</button>
        <button onClick={handleLogout}>Sair</button>
        <br /> <br />
      </div>

      <hr /> <br />

      {Object.keys(userLogged).length > 0 && (
        <div>
          <strong>Olá,  {userLogged.nome}</strong> <br />
          <strong>Cargo: </strong> {userLogged.cargo} <br />
          <strong>Email: </strong> {userLogged.email} <br />
          <strong>Status: </strong> {userLogged.status ? 'ATIVO' : 'INATIVO'} <br />
        </div>
      )}

      {/* <hr />

      <div className="container">
        <h2>Banco de dados</h2>
        <label>ID:</label>
          <input 
            type="text"
            value={idPost}
            onChange={(e) => setIdPost(e.target.value)}
          />

          <label>Título:</label>
          <textarea 
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          
          <label>Autor:</label>
          <input 
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />

          <button onClick={handleAdd}>Cadastrar</button>
          <button onClick={handleSearch}>Buscar Posts</button>
          <button onClick={handleEdit}>Editar</button>

          <br />
          <ul>
            {posts.map((post) => {
              return (
                <li key={post.id}>
                  <span>ID: {post.id}</span><br />
                  <span>Tílulo: {post.titulo}</span> <br />
                  <span>Autor: {post.autor}</span> <br />
                  <button onClick={() => handleDelete(post.id)}>Excluir</button> <br /><br />
                </li>
              )
            })}
          </ul>
      </div> */}
    </div>
  );
}

export default App;
