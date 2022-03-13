const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const mongoDbUrl = "mongodb://localhost:27017/shop";

let _db;

const initDb = async callback => {
  if (_db) {
    console.log("Database is already initialized!");
    return callback(null, _db);
  }

  const client = new MongoClient(mongoDbUrl);

  try {
    console.log("Trying to connect to MongoDb");
    await client.connect();
    console.log("Conected to MongoDb!");
  } catch (e) {
    console.warn("Failed to connect to MongoDb");
    console.error(e.message);
    callback(e);
  }

  _db = client.db();
  callback(null, _db);
}

const getDb = () => {
  if (!_db) {
    throw Error("Database is not initialized");
  }
  return _db;
}

module.exports = {
  initDb,
  getDb,
}