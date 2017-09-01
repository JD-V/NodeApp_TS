'use strict'

var mongoose = require('mongoose');

var schema = mongoose.Schema;   //schema constructor

//custom sort logic to sort first based on number of votes and then updatedAt time
var sortAnswers = function(a,b) {
    //-ve if a before b
    // 0 if no change
    //+ve if a after b

    // sort answers by vote
    
    if(b.votes === a.votes) {
       return b.updatedAt-a.updatedAt;//returns milli-seconds.
    }
    return b.votes-a.votes;
}

var AnswerSchema = new schema({
    text:String,
    createdAt: {type:Date, default:Date.now},  
    updatedAt: {type:Date, default:Date.now},
    votes: {type:Number, default:0}
});

// creating instance method (another way to create it)
// notice one thing, mongooese alerady has save method
// so we have named this as update method otherwise it
// will adversly affect save operation
AnswerSchema.method("update", function(updates,callback){
    //this == document
    // Object.assign(target, ...sources)
    // Properties in the target object will be overwritten by properties 
    // in the sources if they have the same key.  
    // Later sources' properties will similarly overwrite earlier ones.  
    Object.assign(this, updates, {updatedAt: new Date()} );
    this.parent().save(callback);
})

// Q. What's the easiest way to get a reference to a parent document in mongoose if you have its child?
// A. call the child document's parent() method.

AnswerSchema.method("vote", function(vote,callback) {
   if(vote == "up")
        this.votes += 1;
    else
        this.votes -= 1;

        console.log(this);
    this.parent().save(callback);
});

//using default value will replace value of createdAt with current date time.
var QuestionSchema = new schema({
    text: String,
    createdAt: {type:Date, default:Date.now},  
    answers: [AnswerSchema]
});


// By using this pre save hook 
// mongo will sort answers array every time it sorts.
QuestionSchema.pre("save", function(next) {
    // sort() is a default javascript sort method and cannot sort objects, here anserws is obeject array [object, object]
    // you can use your custom sortig logic as well.
    this.answers.sort(sortAnswers); 
    next();
});

var Question = mongoose.model("question", QuestionSchema);

module.exports.Question = Question;


// Can a default value for a document key be specified in a mongoose schema?
// yes, they can be specified by using an object literal with a key of 'default'