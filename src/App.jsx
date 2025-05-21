import Tarefa from "./components/Tarefa";
import Titulo from "./components/Titulo";
import { useState, useEffect } from "react";

function App() {
  //UseState recebe o estado atual e uma função para re-renderizar
  const [tarefas, setTarefas] = useState([
    { id: 1, nome: "Estudar React" },
    { id: 2, nome: "Fazer exercícios" },
    { id: 3, nome: "Ler um livro" },
  ]);

  //Executa algo quando o estado de um componente mudar
  useEffect(() => {
    console.log("Componente montado ou atualizado!");
  }, [tarefas]);

  //Função para adicionar tarefas
  const [novaTarefa, setNovaTarefa] = useState("");
  const adicionarTarefa = () => {
    const nova = { id: tarefas.length + 1, nome: novaTarefa };
    // //estamos atualizando o estado das tarefas, adicionando uma nova tarefa ao array existente ->
    // '...'Spread operador para copiar o array de tarefas e garantir que as tarefas não serão perdidas

    setTarefas([...tarefas, nova]);
    //Após adicionar a tarefa, limpamos o campo de input.
    setNovaTarefa("");
  };

  return (
    <div>
      <h1>Gerenciador de Tarefas 📝</h1>
      <Titulo texto={"Lista de Tarefas"} />
      <ul>
        {tarefas.map((tarefa) => (
          <Tarefa key={tarefa.id} nome={tarefa.nome} />
        ))}
      </ul>
      <input
        type="text"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
        placeholder="Adicionar nova tarefa"
      />
      <button onClick={adicionarTarefa}>Adicionar</button>
    </div>
  );
}
export default App;
