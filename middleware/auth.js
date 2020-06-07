module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', 'Please login to use the web app.')
    res.redirect('/users/login')
  }
}