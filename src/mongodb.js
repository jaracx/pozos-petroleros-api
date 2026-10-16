const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);
let db;

const conectarDB = async () => {
  if (db) return db;

  try {
    await client.connect();
    console.log('Conectado exitosamente a MongoDB Atlas');
    db = client.db(process.env.DATABASE_NAME || 'pozos_db');
    return db;
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = { conectarDB };