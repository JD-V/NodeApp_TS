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
        color: String,
        size: {type:String, default:"small"},
        mass: {type:Number, default:0.007},
        name: {type:String, default:"Angela"}
    });


    AnimalSchema.statics.findSmall = function(callback) {
        // this == Animal (modal)
        return this.find({size:'small'}, callback);
    }

    AnimalSchema.statics.findSize = function(size, callback) {
        // this == Animal (modal)
        return this.find({size:size}, callback);
    }

    //Instance method, here this points to document itself
    AnimalSchema.methods.findSameColor = function(callback) {
        //this == document 
        return this.model("Animal").find({color:this.color},callback); // passing name of the model as a string to access it.
    }

    // Pre-hook this handler gets executed before Mongo executes save
    AnimalSchema.pre("save", function(next){
        if(this.mass >= 100) {
            this.size = 'big';
        } else if(this.mass >=5 && this.mass<=100) {
            this.size = 'medium';
        } else {
            this.size = 'small'; 
        }

        next();
    })

    // Create a model named Animal
    // This will map to a collection in mongo DB database
    var Animal = mongoose.model("Animal", AnimalSchema);
    // Mongo has a spcial feature which will pluralize the model name while creating colellection
    // eg. here model name is 'Animal' but colellection name will be 'animals'
    // To override this default behaviour you can pass third argument as collection name
    // like this,
    // var Animal = mongoose.model("Animal", AnimalSchema, "Animal");

    var elephant = new Animal({
        type: 'elephant',
        color: 'gray',
        mass: 6000,
        name: 'Lawrancec'
    });

    var animal = new Animal({}); //Goldfish default value

    //color not supplied should pick up the default
    var whale = new Animal({   
        type:'Whale',
        mass:190500,
        name:'Fig'
    });

    var animalData = [
        {
            type: "mouse",
            color: "gray",
            mass: 0.035,
            name:"Marvin" 
        },
        {
            type: "nutria",
            color: "browne",
            mass: 6.35,
            name:"Gretchen" 
        },
        {
            type: "wolf",
            color: "gray",
            mass: 45,
            name:"Iris" 
        },
        elephant,
        animal,
        whale
    ]

     // remove without any condition , will remove all the documents
    Animal.remove({},function(err) {
        Animal.create(animalData,function(err, animals){
            if(err) console.log("Save Failed", err);

            Animal.findOne({type:"elephant"},function(err, elephant) { // find one is used to find only first matching element.

                elephant.findSameColor(function(err,animals){
                    animals.forEach(function(animal){
                        console.log(animal.name + " the " + animal.color + " " + animal.type + " is a " + animal.size + "-sized" );
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