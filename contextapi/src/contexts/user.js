import { createContext, useState } from 'react'

export const UserContext  = createContext({})

export default function UserProvider({children}) {
  const [ alunos, setAlunos ] = useState('Masha')
  const [ qtdAlunos, setQtdAlunos ] = useState(80)

  return (
    <UserContext.Provider value={{ alunos, setAlunos, qtdAlunos }}>
      {children}
    </UserContext.Provider>
  )
}
