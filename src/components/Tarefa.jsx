import React from "react";

//Desestruturação do props (Props (propriedades) são a forma como passamos dados de um componente pai para um componente filho)
const Tarefa = ({ nome }) => {
  return <li>{nome}</li>;
};

export default Tarefa;
