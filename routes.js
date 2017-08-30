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

// GET/question/:qId
// Route for retriving question for a specific Id
router.get("/:qId", function(req,res){
    res.json({response: "You sent me a get request on /questions/" + req.params.qId});
})



// POST/questions/:qId/answers
// Route for creating an answers
router.post("/:qId/answers", function(req,res){
    res.json({
        response: "You sent me a POST request on /questions/:qId/answers",
        questionId: req.params.qId,
        body: req.body
    });
})


// PUT /questions/:id/answers/:id
// Route for editing a specific answer
router.put("/:qId/answers/:aId", function(req,res){
    res.json({
        response: "You sent me a PUT request on /questions/:qId/answers/:aId",
        questionId: req.params.qId,
        answerId : req.params.aId,
        body: req.body
    });
})


// DELETE /questions/:id/answers/:id
// Route for editing a specific answer
router.delete("/:qId/answers/:aId", function(req,res){
    res.json({
        response: "You sent me a delete request on /questions/:qId/answers/:aId",
        questionId: req.params.qId,
        answerId : req.params.aId,
    });
})



// POST /questions/:id/answers/:id/vote-down
// POST /questions/:id/answers/:id/vote-down
// Route for voting a specific answer
router.post("/:qId/answers/:aId/vote-:dir", function(req,res,next){
        if(req.params.dir.search(/^(up|down)$/) == -1 ) {   //creating custom error if die contains anything other than up or down
            var err = new Error("Not Found");
            err.status = 404;
            next(err);
        } else {
            next();
        }
    },
    function(req,res){
        res.json({
            response : "You sent me a POST request on /questions/:qId/answers/:aId to " + req.params.dir ,
            questionId : req.params.qId,
            answerId : req.params.aId,
    });
})




module.exports = router;