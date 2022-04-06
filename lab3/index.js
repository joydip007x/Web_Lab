var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();



var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

/////////////////////////////////////////////////////////
var personSchema = mongoose.Schema({
   name: String,
   year: Number,
   direct : String,
   genre: String
});
var Person = mongoose.model("Person", personSchema);

///////////////////////////////////////////////////

app.get('/addMovie', function(req, res){
   res.render('form');
});


app.get('/viewMovie', function(req, res){
   res.render('person');
});


app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));


var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.post('/addMovie', urlencodedParser,function(req, res){
   
   console.log(req.body);

   let a= JSON.stringify(req.body.say);
   console.log(a);
   a= a.substring(1,a.length-1);
  
   let b= JSON.stringify(req.body.to);
   b= b.substring(1,b.length-1);

   let c= JSON.stringify(req.body.to2);
   c= c.substring(1,c.length-1);

   let d= JSON.stringify(req.body.to3);
   d= d.substring(1,d.length-1);

   console.log(a+" "+b+" "+c+" "+d);

   a= " User Submitted  : <br /> Movie Name :"+a + " <br / >";
   b= " Movie Year : "+b;
   c= " <br/> Movie Directed By : "+c;
   d= " <br/> Movie Genre  : "+d;

   res.send(a  +b +c+ d);

   var personInfo = req.body;

   var newPerson = new Person({
         name: personInfo.say,
         year: personInfo.to,
         direct: personInfo.to2,
         genre: personInfo.to3
      });
	
   console.log(newPerson + "\n" + newPerson.name);
   newPerson.save();

});


app.post('/viewMovie', bodyParser.urlencoded({ extended: true }),function(req, res){


   console.log( req.body ); 

   var personInfo = req.body;


   Person.find(personInfo, 
      function(err, response){

         console.log(" LENGTH "+response.length);
         if( response.length===0 ){

            res.send("<h2> The Searched Movie  isn't Found in Our Database </h2>")
            return;
        }

        // res.send(response[0]);
         console.log(response[0]);
         var  reqbody=response[0];



         res.render('show_message', {
            getPerName:function(){ 
                let a=reqbody.name; return  JSON.stringify(a); 
            },
            getNatName:function(){ 
                let a=reqbody.direct; return  JSON.stringify(a); 
            },getGenName:function(){ 
                let a=reqbody.genre; return  JSON.stringify(a); 
            },getAge:function(){ 
                let a=reqbody.year; return  JSON.stringify(a); 
            },
            message: "done ", type: "success", person: personInfo});

         
   })

   



   
   
});







app.listen(5000);
