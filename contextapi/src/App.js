import Alunos from "./Alunos";
import UserProvider from "./contexts/user";

function App() {
  return (
    <UserProvider>
      <h1>Escola</h1>
      <Alunos/>
    </UserProvider>
  );
}

export default App;
