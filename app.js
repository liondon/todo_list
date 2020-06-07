// include packages
const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
// const Todo = require('./models/todo')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')

// mongodb connection setup
require('./config/mongoose')

// express server setup
const app = express()
const port = process.env.PORT
const ip = process.env.IP

// template engine setup
app.engine('hbs', exphbs({ defaultLayouts: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setup express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// make every request go through body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// allow HTTP verb (e.g.PUT, DELETE) in places where it's not supported
app.use(methodOverride('_method'))

// initialize passport
usePassport(app)

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`Express server is running on http://${ip}:${port}`)
})