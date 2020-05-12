// Initializing Express server
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`)
})