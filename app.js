const express = require('express')
const bodyParser = require('body-parser')
// const morgan = require('morgan')
const mongoose = require('mongoose')
const multer = require('multer')
const upload = multer()

mongoose.connect('mongodb+srv://nomiekb:Idunno2023@cluster0.ca9wu98.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })

// const db = mongoose.connection

const schemaData = mongoose.Schema({
  name: String,
  picture: String,
  isFriendly: Boolean,
  species: String
})
const pet = mongoose.model('pet', schemaData)
module.exports = pet

const app = express()

// comment this part out
// app.use(morgan('dev')); app.use(bodyParser.urlencoded({ extended: true })); app.use(bodyParser.json())
// const PORT = process.env.PORT || 3000
// app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const routes = require('./Routes/Route')
app.use('/', routes)

// start server
app.listen(3000, () => {
  console.log('listeniing at port:3000')
})

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', function (req, res) {
  res.render('view')
})

// for parsing multipart/form-data
app.use(upload.array())
app.use(express.static('public'))

app.post('/', function (req, res) {
  res.render('view')
})

// comment this part out
// db.on('error', (err) => { console.log(err) })
// db.once('open', () => { console.log('Database Connection Established') })
// db.collection.find()

// const myForm = document.getElementById('myForm')
// myForm.addEventListener('submit', (e) => {
//   const name = document.getElementById('name')

// })
