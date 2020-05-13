// Initialize express/mongodb server
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// const Todo = require('./models/todo')

const routes = require('./routes')
// mongodb connection settings
require('./config/mongoose')

// express server settings
const app = express()
const port = 3000


// 建立及啟用模板引擎
app.engine('hbs', exphbs({ defaultLayouts: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// make every request go through body-parser
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`)
})