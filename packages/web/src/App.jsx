import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:3000/tarefas";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  // Função para buscar as tarefas da API
  const buscarTarefas = async () => {
    try {
      const response = await axios.get(API_URL);
      setTarefas(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  // useEffect para buscar as tarefas quando o componente montar
  useEffect(() => {
    buscarTarefas();
  }, []);

  const adicionarTarefa = async () => {
    if (novaTarefa.trim() === "") {
      alert("O título da tarefa não pode ser vazio.");
      return;
    }
    try {
      const response = await axios.post(API_URL, {
        titulo: novaTarefa,
        concluida: false,
      });
      setTarefas([...tarefas, response.data]);
      setNovaTarefa("");
      alert(`Tarefa "${response.data.titulo}" adicionada com sucesso!`);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      alert("Falha ao adicionar a tarefa.");
    }
  };

  const removerTarefa = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
    } catch (error) {
      console.error("Erro ao remover tarefa:", error);
      alert("Falha ao remover a tarefa.");
    }
  };

  const concluirTarefa = async (tarefa) => {
    try {
      const tarefaAtualizada = {
        ...tarefa,
        concluida: !tarefa.concluida,
      };
      await axios.put(`${API_URL}/${tarefa.id}`, tarefaAtualizada);
      setTarefas(
        tarefas.map((t) => (t.id === tarefa.id ? tarefaAtualizada : t))
      );
    } catch (error) {
      console.error("Erro ao concluir tarefa:", error);
      alert("Falha ao atualizar a tarefa.");
    }
  };

  return (
    <div>
      <h1>Gerenciador de Tarefas 📝</h1>
      <h2>Lista de Tarefas</h2>

      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className={tarefa.concluida ? "concluida" : ""}>
            <span>{tarefa.titulo}</span>
            <div>
              <button onClick={() => concluirTarefa(tarefa)}>
                {tarefa.concluida ? "Desmarcar" : "Concluir"}
              </button>
              <button
                onClick={() => removerTarefa(tarefa.id)}
                className="remover"
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="add-tarefa">
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && adicionarTarefa()}
          placeholder="Adicionar nova tarefa"
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>
    </div>
  );
}
export default App;
