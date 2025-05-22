import Tarefa from "./components/Tarefa";
import Titulo from "./components/Titulo";
import { useState, useEffect } from "react";

function App() {
  const [tarefas, setTarefas] = useState([
    {
      id: 1,
      nome: "Estudar React",
      concluida: false,
      favorita: false,
      filtro: "nao-concluidas",
    },
    {
      id: 2,
      nome: "Fazer exercícios",
      concluida: false,
      favorita: false,
      filtro: "nao-concluidas",
    },
    {
      id: 3,
      nome: "Ler um livro",
      concluida: false,
      favorita: false,
      filtro: "nao-concluidas",
    },
  ]);
  const [filtro, setFiltro] = useState("todos");

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === "concluidas") return tarefa.concluida;
    if (filtro === "nao-concluidas") return !tarefa.concluida;
    if (filtro === "favoritas") return tarefa.favorita;
    return true; // todas
  });

  //estamos atualizando o estado das tarefas, adicionando uma nova tarefa ao array existente -> '...'Spread operador para copiar o array de tarefas e garantir que as tarefas não serão perdidas

  const [novaTarefa, setNovaTarefa] = useState("");
  const adicionarTarefa = () => {
    const nova = {
      id: tarefas.length + 1,
      nome: novaTarefa,
      concluida: false,
      favorita: false,
      filtro: "nao-concluidas",
    };
    setTarefas([...tarefas, nova]);
    alert(`Tarefa "${nova.nome}" adicionada com sucesso!`);
    setNovaTarefa("");
  };

  const removerTarefa = (id) => {
    const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(novasTarefas);
  };

  const editarTarefa = (id, novoNome) => {
    const tarefasAtualizada = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, nome: novoNome } : tarefa
    );
    setTarefas(tarefasAtualizada);
  };

  const favoritarTarefa = (id) => {
    const tarefasFavoritadas = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, favorita: !tarefa.favorita } : tarefa
    );
    setTarefas(tarefasFavoritadas);
  };

  //Usando hook para alterar o compente caso ele seja marcado como concluido

  const concluirTarefa = (id) => {
    const tarefasAtualizadas = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    );
    setTarefas(tarefasAtualizadas);
  };

  useEffect(() => {
    console.log("Componente montado ou atualizado!");
  }, [tarefas]);

  return (
    <div>
      <h1>Gerenciador de Tarefas 📝</h1>
      <Titulo texto={"Lista de Tarefas"} />

      <div style={{ marginBottom: "1rem" }}>
        <strong>Filtro: </strong>
        <button onClick={() => setFiltro("todas")}>Todas</button>
        <button onClick={() => setFiltro("favoritas")}>Favoritas</button>
        <button onClick={() => setFiltro("concluidas")}>Concluídas</button>
        <button onClick={() => setFiltro("nao-concluidas")}>
          Não concluídas
        </button>
      </div>

      <ul>
        {tarefasFiltradas.map((tarefa) => (
          <li
            key={tarefa.id}
            style={{
              textDecoration: tarefa.concluida ? "line-through" : "none",
              color: tarefa.favorita ? "yellow" : "none",
            }}
          >
            <Tarefa
              nome={tarefa.nome}
              onConcluir={() => concluirTarefa(tarefa.id)}
              onFavorit={() => favoritarTarefa(tarefa.id)}
              onEdit={(e) => editarTarefa(tarefa.id, e.target.value)}
            />
            <button onClick={() => removerTarefa(tarefa.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && adicionarTarefa()}
        placeholder="Adicionar nova tarefa"
      />
      <button onClick={adicionarTarefa}>Adicionar</button>
    </div>
  );
}
export default App;
