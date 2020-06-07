const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../user')
const Todo = require('../todo')

const db = require('../../config/mongoose')

const SEED_USER = {
  userName: 'SEED_USER',
  email: 'seed@example.com',
  password: '12341234'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      userName: SEED_USER.userName,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 10 },
        (_, i) => Todo.create({ name: `task-${i}`, userId })
      ))
    })
    .then(() => {
      console.log('todo seeds added.')
      process.exit()
    })
})

