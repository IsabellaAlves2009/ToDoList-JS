const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // URL padrão para banco local
const client = new MongoClient(uri);
let db;

async function connect() {
  try {
    await client.connect();
    db = client.db('tarefasdb'); // Cria ou conecta ao banco chamado "tarefasdb"
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error);
  }
}

function getDb() {
  return db;
}

module.exports = { connect, getDb };