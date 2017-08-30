'use strict'

var express = require('express');
var jsonParser = require('body-parser').json; 
var routes = require('./routes'); 
var logger = require('morgan'); 
// body parser contains many parsers underneath 
//to parser different kind of http request.
// we need json parser.

var app = express();

app.use(logger("dev"));
app.use(jsonParser()); 

// json middleware
// when the app receives a request this middleware 
//will parse the request and make it available to 
//next middleware as json object

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