'use strict'

var express = require('express');
var jsonParser = require('body-parser').json; 
var routes = require('./routes');
var logger = require('morgan'); 
var mongoose = require('mongoose');
// body parser contains many parsers underneath 
//to parser different kind of http request.
// we need json parser.

var app = express();

app.use(logger("dev"));
app.use(jsonParser()); 
//mongodb://localhost:27017/qa
mongoose.connect("mongodb://Jaydeep:Bats1918@ds115214.mlab.com:15214/qa");
// create mongo server at default port 27017, name the database as 'sandbox'

var db = mongoose.connection;

db.on('error', function(err) {
    console.error("Connection error : ", err);
});

db.once("open", function() {
    console.log("database connection was successful");
    // All database connection was successful;
});
// Till the time mongo take to setup the connections
// all the requests made during that period will be stroed in a cache by node
// and executed once connection is established. which is extremly helpful.


// json middleware
// when the app receives a request this middleware 
//will parse the request and make it available to 
//next middleware as json object



//To Allow CORS (cross origin resource sharing) you need add header 1
//To allow api over browser you need to add header2
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*"); // header 1
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type"); //header 2
    
    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods","PUT,POST,DELETE");
        res.status(200);
        return res.json({});
    }
    next();
})


app.use("/questions",routes);   //any equest which will have questions in parameter will be pushed to routes file

app.use(function(req,res,next){
    var err = new Error("Not Found");
    err.status = 404;
    next(err);  //signals the express that there has been an error.
    // will call next best matching default handler
    // you can override it as well
});

// Error Handler simillar to setting up middleware
// the only difference is it will have 4 params 
// while normal middleware has 3.
app.use(function(err,req,res,next) {
    res.status(err.status || 500); // if no error status defined then it may also be an internal server error (500)
    res.json({
        message : err.message
    })
})

var port = process.env.port || 3002;

app.listen(port, function(){
    console.log("Express server is listening on port "+ port);
});