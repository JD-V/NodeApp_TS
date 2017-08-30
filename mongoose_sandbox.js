'use strict'

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/sandbox");
// create mongo server at default port 27017, name the database as 'sandbox'

var db = mongoose.connection;

db.on('error', function(err) {
    console.error("Connection error : ", err);
});

db.once("open", function() {
    console.log("database connection was successful");
    // All database connection was successful;

    var Schema = mongoose.Schema;
    var AnimalSchema = new Schema({
        type: {type:String, default:"goldFish"},
        color: {type:String, default:"golden"},
        size: {type:String, default:"small"},
        mass: {type:Number, default:0.007},
        name: {type:String, default:"Angela"}
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

    var animal = new Animal({}); //Goldfish default value

    //color not supplied should pick up the default
    var whale = new Animal({   
        type:'Whale',
        size:'big',
        mass:190500,
        name:'Fig'
    });

     // remove without any condition , will remove all the documents
    Animal.remove({},function(err) {
        
        elephant.save(function(err) {
            if(err) console.log("Save Failed", err);
            
            animal.save(function(err) {
                if(err) console.log("Save Failed", err);

                whale.save(function(err) {
                    if(err) console.log("Save Failed", err);

                    Animal.find({"size" : "big"}, function(err, animals) {
                        animals.forEach(function(animal){
                            console.log(animal.name + " the " + animal.color + " " + animal.type );
                        });

                        db.close(function() {
                            //close the connection  
                            console.log("connectin is closed");
                        }); 
                    });
                });          
            });
        });
    });
})