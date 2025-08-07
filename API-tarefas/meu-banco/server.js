const express = require('express');
const app = express();
const path = require('path');
const tarefasRouter = require('./routes/tarefas');
const router = express.Router();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/tarefas', tarefasRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
});

router.get('/', (req, res) => {
  res.send('Rota de tarefas funcionando!');
});

module.exports = router;