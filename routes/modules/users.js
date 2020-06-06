const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { userName, email, password, confirmPassword } = req.body
  const errors = []
  if (!userName || !email || !password || !confirmPassword) {
    errors.push({ message: 'You missed some fields!' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Password and Confirm Password are not the same!' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      userName,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: 'This email has been registered.' })
      return res.render('register', {
        errors,
        userName,
        email,
        password,
        confirmPassword
      })
    }
    return User.create({
      userName,
      email,
      password,
    })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have logged out successfully.')
  res.redirect('/users/login')
})

module.exports = router