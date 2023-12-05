const express = require("express")
const bodyParser = require("body-parser")
const multer = require('multer');
const upload = multer();
const fs = require('fs');

// create our express app
const app = express()
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// route
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
