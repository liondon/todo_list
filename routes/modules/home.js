const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  Todo.find()
    .lean()  //將撈出的資料轉換成單純的JS物件
    .sort({ _id: 'asc' })  //desc
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

module.exports = router