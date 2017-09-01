'use strict'

var express = require('express');
var router = express.Router();
var Question = require("./models").Question;


// params handler preloads the question if qId is present in the route
router.param("qId", function(req,res,next,id) {
    // console.log(id);
    Question.findById(id, function(err,doc) {
        if(err) return next(err);
        if(!doc) {
            var error = new Error("Not Found");
            error.status(404);
            return next(error);
        }
        req.question = doc; // if available, store  it in a request object so other routes can access it.
        next();
    })
});

// params handler preloads the answer if qId is present in the route
router.param("aId", function(req,res,next,id){
    // we already have question loaded. Just need to fetch answer with perticular id and stroe it in request
    // object so other routes can access it.

    // mongooese has special method called  .id() which accept id of child doument and returns the same.
    req.answer = req.question.answers.id(id);
    
        if(!req.answer){
            var error = new Error("Not Found");
            error.status(404);
            return next(error);
        }
        next();
});

// GET/questions
// Route for retriving questions
router.get("/", function(req,res,next){
    //find method expexts 4 params 
    //1. criteria
    //2. projection => used to limit number of rows in result
    //3. arrange result => pass object literal
    // here createdAt:-1 means sort decending
    // 4 => callback
    Question.find({})
            .sort({createdAt: -1})
            .exec(function(err,questions) {
                if(err) return next(err);
                else {
                    res.json(questions);    //since mongo returns json object we can drop strtight to response
                }
            });
    // res.json({response: "You sent me a get request on /questions"});
})

// POST/questions
// Route for creating a question
router.post("/", function(req,res,next) {

    var question = new Question(req.body);
    question.save(function(err,question){
        if(err) next(err)
        else {
            res.status(201);
            res.json(question);
        }
    })
})

// GET/question/:qId
// Route for retriving question for a specific Id
router.get("/:qId", function(req,res,next){   
    // console.log(req.question); 
    res.json(req.question);    //since mongo returns json object we can drop strtight to response
})

// POST/questions/:qId/answers
// Route for creating an answers
router.post("/:qId/answers", function(req,res,next){
    
    req.question.answers.push(req.body);
    req.question.save(function(err,question){
        if(err) next(err)
        else {
            res.status(201);
            res.json(question);
        }
    });
})


// PUT /questions/:id/answers/:id
// Route for editing a specific answer
router.put("/:qId/answers/:aId", function(req,res,next){
    
    req.answer.update(req.body,function(err,question){
        if(err) return next(err);
        res.json(question);
    })
    
})


// DELETE /questions/:id/answers/:id
// Route for editing a specific answer
router.delete("/:qId/answers/:aId", function(req,res,next){
    //monogoose remove method will remove preloaded answer from req object,
    // and this same answer is refernced from question.answers object.
    req.answer.remove(function(err) {
        req.question.save(function(err, question) {
            if(err) return next(err);
            res.json(question);
        });        
    })
});



// POST /questions/:id/answers/:id/vote-down
// POST /questions/:id/answers/:id/vote-down
// Route for voting a specific answer
router.post("/:qId/answers/:aId/vote-:dir", function(req,res,next){
        
        if(req.params.dir.search(/^(up|down)$/) == -1 ) {   //creating custom error if die contains anything other than up or down
            var err = new Error("Not Found");
            err.status = 404;
            next(err);
        } else {
            console.log("vote dir is " + req.params.dir)
            req.vote = req.params.dir;
            next();
        }
    },
    function(req,res,next) {
        req.answer.vote(req.vote, function(err,question){
            if(err) return next(err);
            res.json(question);
        });
    }
    
)




module.exports = router;