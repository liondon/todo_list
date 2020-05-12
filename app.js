// Initialize express/mongodb server
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000

// set up mongodb connection
mongoose.connect('mongodb://localhost/todoList', { useNewUrlParser: true, useUnifiedTopology: true })
// .connect('mongodb://<user>:<password>@<IP addr>:<port>/<dbName>)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// set route
app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`)
})