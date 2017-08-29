'use strict'

var express = require('express');
var jsonParser = require('body-parser').json; 
var routes = require('./routes');  
// body parser contains many parsers underneath 
//to parser different kind of http request.
// we need json parser.

var app = express();
app.use(jsonParser()); 
// json middleware
// when the app receives a request this middleware 
//will parse the request and make it available to 
//next middleware as json object

app.use("/questions",routes);   //any equest which will have questions in parameter will be pushed to routes file

var port = process.env.port || 3002;

app.listen(port, function(){
    console.log("Express server is listening on port "+ port);
});