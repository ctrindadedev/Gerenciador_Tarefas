import React from "react";

//Desestruturação do props (Props (propriedades) são a forma como passamos dados de um componente pai para um componente filho)
const Tarefa = ({ nome, onConcluir, onFavorit, onEdit }) => {
  return (
    <div>
      <h3>{nome}</h3>
      <input onChange={onEdit} placeholder="Editar a tarefa"></input>
      <button onClick={onConcluir}>Concluir a tarefa!</button>
      <button onClick={onFavorit}>Favoritar a tarefa!</button>
    </div>
  );
};

export default Tarefa;

//Melhorar botão de edição.

// 5. Contagem de Tarefas: Adicione um contador que exibe o número total de tarefas e quantas delas foram concluídas.
