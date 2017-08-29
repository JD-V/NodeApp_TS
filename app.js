'use strict'

var express = require('express');

var app = express();

var port = process.env.port || 3002;

app.listen(port, function(){
    console.log("Express server is listening on port "+ port);
});