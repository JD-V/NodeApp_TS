'use strict'

var express = require('express');
var router = express.Router();

// GET/questions
// Route for retriving questions
router.get("/", function(req,res){
    res.json({response: "You sent me a get request on /questions"});
})

// POST/questions
// Route for creating a question
router.post("/", function(req,res){
    res.json({
        response: "You sent me a POST request on /questions",
        body: req.body
    });
})

// GET/question/:id
// Route for retriving question for a specific id
router.get("/:id", function(req,res){
    res.json({response: "You sent me a get request on /questions/" + req.params.id});
})


module.exports = router;