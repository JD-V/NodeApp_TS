'use strict'

var express = require('express');
var jsonParser = require('body-parser').json;   
// body parser contains many parsers underneath 
//to parser different kind of http request.
// we need json parser.

var app = express();

var jsoncheck = function(req,res,next){
    if(req.body) {
        console.log("The sky is blue");
    } else {
        console.log("There is no body property in request.")
    }
    next()
}

app.use(jsoncheck);
app.use(jsonParser()); 
app.use(jsoncheck);
// json middleware
// when the app receives a request this middleware 
//will parse the request and make it available to 
//next middleware as json object

app.use(function(req,res,next){
    if(req.body) {
        console.log("The sky is blue");
    } else {
        console.lof("There is no body property in request.")
    }
    next()
});


var port = process.env.port || 3002;

app.listen(port, function(){
    console.log("Express server is listening on port "+ port);
});