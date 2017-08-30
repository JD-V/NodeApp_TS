'use strict'

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/sandbox");
// create mongo server at default port 27017, name the database as 'sandbox'

var db = mongoose.connection;

db.on('error', function(err) {
    console.error("Connection error : ", err);
});

db.once("open", function(){
    console.log("database connection was successful");
    // All database connection was successful;

    var Schema = mongoose.Schema;
    var AnimalSchema = new Schema({
        type: String,
        color: String,
        size: String,
        mass: Number,
        name: String
    });

    // Create a model named Animal
    // This will map to a collection in mongo DB database
    var Animal = mongoose.model("Animal", AnimalSchema);

    var elephant = new Animal({
        type: 'elephant',
        size: 'big',
        color: 'gray',
        mass: 6000,
        name: 'Lawrancec'
    });

    elephant.save(function(err){
        if(err) console.log("Save Failed", err);
        else console.log("Saved");
        db.close(function(){
            console.log("connectin is closed");
        }); //close the connection
    });

    
})