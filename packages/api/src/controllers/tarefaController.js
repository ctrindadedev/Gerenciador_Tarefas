const TarefaRepository = require("../repositories/tarefaRepository");
const Joi = require("joi");

// Schema de validação para criação e atualização de tarefas
const tarefaSchema = Joi.object({
  titulo: Joi.string().min(3).required(),
  descricao: Joi.string().allow("").optional(),
  concluida: Joi.boolean().optional(),
});

class TarefaController {

  // Busca todas as tarefas do banco de dados e retorna uma resposta JSON com a lista de tarefas.
  async getAllTarefas(req, res) {
    try {
      const tarefas = await TarefaRepository.getAllTarefas();
      res.json(tarefas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTarefaById(req, res) {
    const { id } = req.params;
    try {
      const tarefa = await TarefaRepository.getTarefaById(id);
      if (!tarefa) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }
      res.json(tarefa);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

    //   Cria uma nova tarefa com base nos dados fornecidos no corpo da requisição e retorna a tarefa criada em formato JSON.

  async createTarefa(req, res) {
    const { error } = tarefaSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      const novaTarefa = await TarefaRepository.createTarefa(req.body);
      res.status(201).json(novaTarefa);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTarefa(req, res) {
    const { id } = req.params;
    const { error } = tarefaSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      const tarefaAtualizada = await TarefaRepository.updateTarefa(id, req.body);
      if (!tarefaAtualizada) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }
      res.json(tarefaAtualizada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTarefa(req, res) {
    const { id } = req.params;
    try {
      const deletado = await TarefaRepository.deleteTarefa(id);
      if (!deletado) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }
      res.status(204).send(); // 204 No Content
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = new TarefaController();