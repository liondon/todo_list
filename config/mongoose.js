const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todoList', { useNewUrlParser: true, useUnifiedTopology: true })
// .connect('mongodb://<user>:<password>@<IP addr>:<port>/<dbName>)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db