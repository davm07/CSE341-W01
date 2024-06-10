const dotenv = require('dotenv')
dotenv.config()
const MongoClient = require('mongodb').MongoClient

let _db

const initDb = (callback) => {
  if (_db) {
    console.log('DB connection already established')
    return callback(null, _db)
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client
      callback(null, _db)
    })
    .catch((err) => {
      console.log(err)
      callback(err, null)
    })
}

const getDb = () => {
  if (!_db) {
    throw new Error('DB connection not established')
  }
  return _db
}

module.exports = {
  initDb,
  getDb
}
