const dotenv = require("dotenv").config()
const express = require('express')
const routes = require("./routes")
var app = express()
const PORT = 3000

app.use(require("body-parser").json())
app.use(routes)

// respond with "hello world" when a GET request is made to the homepage
app.get('/', async function (req, res) {
    res.send("")
})

app.listen(3000, () => {

})