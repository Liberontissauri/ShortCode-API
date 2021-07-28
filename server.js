var express = require('express')
var app = express()
const PORT = 3000

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000, () => {
    
})