const TarefaRepository = require("../repositories/tarefaRepository");

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
  //   Cria uma nova tarefa com base nos dados fornecidos no corpo da requisição e retorna a tarefa criada em formato JSON.
  async createTarefa(req, res) {
    const { titulo, descricao, concluida } = req.body;
    try {
      const novaTarefa = await TarefaRepository.createTarefa({
        titulo,
        descricao,
        concluida,
      });
      res.status(201).json(novaTarefa);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // ...Implementar restante dos métodos (update, delete, get by id)
}
module.exports = new TarefaController();
