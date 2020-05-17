const mongoose = require('mongoose')

const mongodbURI = process.env.MONGODB_URI || 'mongodb://localhost/todoList'

mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
// .connect('mongodb://<user>:<password>@<IP addr>:<port>/<dbName>)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db