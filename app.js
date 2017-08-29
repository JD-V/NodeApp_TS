'use strict'

var express = require('express');

var app = express();

app.use(function(req,res,next){
    req.myMessage = "Hello from Middleware 1"
    console.log("The leaves on the tress are " + req.query.color)
    next(); //handover the response to next middleware
});


var port = process.env.port || 3002;

app.listen(port, function(){
    console.log("Express server is listening on port "+ port);
});