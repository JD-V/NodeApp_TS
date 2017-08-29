'use strict'

var express = require('express');

var app = express();

app.use(function(req,res,next){
    console.log("First piece of middleware")
    next(); //handover the response to next middleware
});

app.use("/different/:id",function(req,res,next){
    console.log("Second piece of middleware, ID " + req.params.id)
    next(); //handover the response to next middleware
});

var port = process.env.port || 3002;

app.listen(port, function(){
    console.log("Express server is listening on port "+ port);
});