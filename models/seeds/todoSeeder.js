const Todo = require('../todo')
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `task-${i}` })
  }
  console.log('todo seeds added.')
})

