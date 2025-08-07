const express = require('express');
const router = express.Router();
const { getDb } = require('../mongodb/mongo'); // ajusta se o caminho for diferente

// Buscar todas as tarefas
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const tarefas = await db.collection('tarefas').find().toArray();
    res.json(tarefas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar tarefas' });
  }
});

// Criar nova tarefa
router.post('/', async (req, res) => {
  try {
    const db = getDb();
    const novaTarefa = {
      nome: req.body.nome,
      criadaEm: new Date()
    };
    const resultado = await db.collection('tarefas').insertOne(novaTarefa);
    res.status(201).json(resultado.ops[0]); // ou resultado.insertedId
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar tarefa' });
  }
});

module.exports = router;