const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://nomiekb:Idunno2023@cluster0.ca9wu98.mongodb.net/')

const db = mongoose.connection
db.on('error', (err) => { console.log(err) })
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

const PORT = 4000
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.get('/pets', async (req, res) => {
  try {
    const pets = await Pet.find({})
    res.json(pets)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.post('/pets', async (req, res) => {
  const { name, photo, species, friendly } = req.body
  const newPet = new Pet({ name, photo, species, friendly })

  try {
    const savedPet = await newPet.save()
    res.status(201).json(savedPet)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.put('/pets/:id', async (req, res) => {
  const { id } = req.params
  const { name, photo, species, friendly } = req.body

  try {
    const updatedPet = await Pet.findByIdAndUpdate(
      id,
      { name, photo, species, friendly },
      { new: true }
    )
    res.json(updatedPet)
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
