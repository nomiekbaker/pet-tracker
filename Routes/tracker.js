const express = require("express");
const trackerRoutes = express.Router();
const fs = require('fs');
const dataPath = './Details/pet-data.json' ;

// util functions 

const saveTrackerData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getTrackerData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)    
}

// Create new pet
  trackerRoutes.post('/tracker/add', (req, res) => {
   
    var petExists = getTrackerData()
    const newPetId = Math.floor(100000 + Math.random() * 900000)
   
    petExists[newPetId] = req.body
     
    console.log(petExists);

    saveTrackerData(petExists);
    res.send({success: true, msg: 'pet data added successfully'})
})

// Read - get all pets from the json file
trackerRoutes.get('/tracker', (req, res) => {
  const pets = getTrackerData()
  res.send(pets)
})


//delete - using delete method
trackerRoutes.delete('/tracker/delete/:id', (req, res) => {
   fs.readFile(dataPath, 'utf8', (err, data) => {
    var petExists = getTrackerData()

    const petId = req.params['id'];

    delete petExists[petId];  
    saveTrackerData(petExists);
    res.send(`pet with id ${petId} has been deleted`)
  }, true);
})
module.exports = trackerRoutes
