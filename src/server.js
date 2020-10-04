const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const PORT = 8000;
app.use(bodyParser.json())
app.get('/hello/:name', (req, res)=> res.send(`hello ${req.params.name}`))
app.get('/hello', (req, res) => res.send("Always keep learning something new"))
app.post('/hello', (req, res)=> res.send(`Hello ${req.body.name}!` ))



app.listen(PORT, () => {
    console.log(` Server Listening on Port ${PORT}`)
})