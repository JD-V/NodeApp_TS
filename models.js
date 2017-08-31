'use strict'

var mongoose = require('nongoose');

var schema = mongoose.Schema;   //schema constructor

var AnswerSchema = new Schema({
    text:string,
    createdAt: {Date},  //using default value will replace value of createdAt with current date time.
    updatedAt: {Date},  //using default value will replace value of createdAt with current date time.
    votes: {type:Number, default:0}

});

var QuestionsSchema = new mongoose.Schema({
    text:String,
    createdAt: {type:Date, default:Date.now},  //using default value will replace value of createdAt with current date time.
    answers: [AnswerSchema]
});

var Question = mongoose.model("question", QuestionsSchema);

module.exports.Question = Question;


// Can a default value for a document key be specified in a mongoose schema?
// yes, they can be specified by using an object literal with a key of 'default'