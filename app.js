// Initialize express/mongodb server
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Todo = require('./models/todo')

// express server settings
const app = express()
const port = 3000

// mongodb connection settings
mongoose.connect('mongodb://localhost/todoList', { useNewUrlParser: true, useUnifiedTopology: true })
// .connect('mongodb://<user>:<password>@<IP addr>:<port>/<dbName>)
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// 建立及啟用模板引擎
app.engine('hbs', exphbs({ defaultLayouts: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// make every request go through body-parser
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Todo.find()
    .lean()  //將撈出的資料轉換成單純的JS物件
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`)
})