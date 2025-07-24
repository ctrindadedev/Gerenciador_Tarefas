const Tarefa = require("../models/tarefa");

class TarefaRepository {
  async getAllTarefas() {
    try {
      return await Tarefa.findAll();
    } catch (error) {
      throw new Error("Erro ao buscar todas as tarefas: " + error.message);
    }
  }

  async getTarefaById(id) {
    try {
      return await Tarefa.findByPk(id);
    } catch (error) {
      throw new Error("Erro ao buscar a tarefa por ID: " + error.message);
    }
  }

  async createTarefa(tarefaData) {
    try {
      return await Tarefa.create(tarefaData);
    } catch (error) {
      throw new Error("Erro ao criar nova tarefa: " + error.message);
    }
  }

  async updateTarefa(id, tarefaData) {
    try {
      const tarefa = await Tarefa.findByPk(id);
      if (tarefa) {
        return await tarefa.update(tarefaData);
      }
      return null;
    } catch (error) {
      throw new Error("Erro ao atualizar a tarefa: " + error.message);
    }
  }

  async deleteTarefa(id) {
    try {
      const tarefa = await Tarefa.findByPk(id);
      if (tarefa) {
        await tarefa.destroy();
        return true;
      }
      return false;
    } catch (error) {
      throw new Error("Erro ao deletar a tarefa: " + error.message);
    }
  }
}

module.exports = new TarefaRepository();
