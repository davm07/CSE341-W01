const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const mongodb = require('./db/connect')
const routes = require('./routes/professional')

const app = express()
const port = process.env.PORT || 8080

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
  })
  .use('/professional', routes)

mongodb.initDb((err, db) => {
  if (err) {
    console.log(err)
    throw err
  } else {
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    )
  }
})
