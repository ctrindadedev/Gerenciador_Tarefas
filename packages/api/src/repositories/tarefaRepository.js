const Tarefa = require("../models/tarefa");
class TarefaRepository {
  async getAllTarefas() {
    try {
      return await Tarefa.findAll();
    } catch (error) {
      throw new Error("Erro ao buscar todas as tarefas: " + error.message);
    }
  }
  async createTarefa(tarefaData) {
    try {
      return await Tarefa.create(tarefaData);
    } catch (error) {
      throw new Error("Erro ao criar nova tarefa: " + error.message);
    }
  }
  // ...Implementar restante dos métodos (update, delete, getby id)
}
module.exports = new TarefaRepository();
