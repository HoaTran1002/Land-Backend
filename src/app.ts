import express from 'express'
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})
console.log('hello word this is local server runing on port localhost:3000')
app.listen(3000)
