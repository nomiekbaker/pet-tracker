const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const multer = require('multer');
const upload = multer();
const fs = require('fs');

const app = express()
app.use(morgan('dev'));app.use(bodyParser.urlencoded({extended: true}));app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {  console.log(`Server is running on port ${PORT}`)});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./Routes/Route')
app.use('/', routes)

//start server
app.listen(3000, ()=>{
    console.log("listeniing at port:3000")
}) 

app.set('view engine', 'pug');
app.set('views','./views');

app.get('/', function(req, res){
    res.render('view');
 });

 // for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.post('/', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});
