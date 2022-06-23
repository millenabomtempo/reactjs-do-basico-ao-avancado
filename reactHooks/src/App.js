import { useState, useEffect, useMemo, useCallback } from 'react'

function App() {
  const [ tarefas, setTarefas ] = useState([])
  const [ input, setInput ] = useState('')

  //executa ao iniciar o componente
  useEffect(() => {
    
    const tarefasStorage = localStorage.getItem('tarefas')

    if (tarefasStorage) {

      setTarefas(JSON.parse(tarefasStorage))
    
    }

  }, [])

  //executa toda vez que houver alteração no state tarefas
  useEffect(() => {
  
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
  
  }, [tarefas])

  const handleAdd = useCallback(() => {
  
    setTarefas([...tarefas, input])
    setInput('')
  
  }, [input, tarefas])

  const totalTarefas = useMemo(() => tarefas.length, [tarefas])

  return (
    <div>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>

      <br />
      <strong>Você tem {totalTarefas} tarefas!</strong>
      <br />
      <input 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)} 
      />

      <button
        type='button'
        onClick={handleAdd}
      >
        Adicionar
      </button>
    </div>
  );
}

export default App;
