'use strict'

var mongoose = require('nongoose');

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

var AnswerSchema = new Schema({
    text:string,
    createdAt: {Date},  //using default value will replace value of createdAt with current date time.
    updatedAt: {Date},  //using default value will replace value of createdAt with current date time.
    votes: {type:Number, default:0}

});

// creating instance method (another way to create it)
// notice one thing, mongooese alerady has save method
// so we have named this as update method otherwise it
// will adversly affect save operation
AnswerSchema.methods("update", function(updates,callback){
    //this == document
    // Object.assign(target, ...sources)
    // Properties in the target object will be overwritten by properties 
    // in the sources if they have the same key.  
    // Later sources' properties will similarly overwrite earlier ones.  
    object.assign(this, updates, {updatedAt: Date.now});

    this.parent().save(callback);
})


// Q. What's the easiest way to get a reference to a parent document in mongoose if you have its child?
// A. call the child document's parent() method.

AnswerSchema.methods("votes", function(updates,callback){
   if(votes == up)
        this.votes += 1;
    else
        this.votes -= 1;

    this.parent().save(callback);
})


var QuestionsSchema = new mongoose.Schema({
    text:String,
    createdAt: {type:Date, default:Date.now},  //using default value will replace value of createdAt with current date time.
    answers: [AnswerSchema]
});


// By using this pre save hook 
// mongo will sort answers array every time it sorts.
Question.pre("save", function(next) {
    // sort() is a default javascript sort method and cannot sort objects, here anserws is obeject array [object, object]
    // you can use your custom sortig logic as well.
    this.answers.sort(sortAnswers); 
    next();
});

var Question = mongoose.model("question", QuestionsSchema);

module.exports.Question = Question;


// Can a default value for a document key be specified in a mongoose schema?
// yes, they can be specified by using an object literal with a key of 'default'