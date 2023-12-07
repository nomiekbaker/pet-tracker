const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://nomiekb:Idunno2023@cluster0.ca9wu98.mongodb.net/test')

const db = mongoose.connection
db.on('error', (err) => { console.log(err) })
console.log(db.name)
db.once('open', () => {
  console.log('Connected to MongoDB')
})

const schemaData = new mongoose.Schema({
  name: String,
  picture: String,
  isFriendly: Boolean,
  species: String
})

const Pet = mongoose.model('Pet', schemaData)

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.get('/pets', async (req, res) => {
  try {
    const pets = await Pet.find()
    res.json(pets)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.post('/pets', async (req, res) => {
  const myPet = req.body

  try {
    const newPet = new Pet({ name: myPet.name, picture: myPet.picture, species: myPet.species, isFriendly: myPet.isFriendly })
    await newPet.save()
    res.status(201).json(newPet)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.delete('/pets/:id', async (req, res) => {
  const { id } = req.params

  try {
    await Pet.findByIdAndDelete(id)
    res.json({ message: 'Pet deleted successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

const PORT = 4000
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) })
