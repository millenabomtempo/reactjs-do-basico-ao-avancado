import { useContext } from "react"
import { UserContext } from "../contexts/user"

export default function Nome() {

  const { alunos, setAlunos } = useContext(UserContext)

  return (
    <div>
      <span>Olá, {alunos}</span>
      <br />
      <button onClick={() => setAlunos('Maria')}>Traduz nome</button>
    </div>
  )
}
