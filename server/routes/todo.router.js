const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Similar to a Class

// Define our data structure
const TodoSchema = new Schema({
    chore: {type: String}, 
    complete: {type: Boolean, default: false}
}); // Requires all data adhere to these types

// This is a Model. It allows us to interface with the database.
const Todo = mongoose.model('Chores', TodoSchema);
// Chores will be the collection name

router.post('/', ( request, response ) => {
    console.log('/todo POST');
    console.log( 'router posting', request.body );
    let choreFromClient = request.body;
    //Add to the database
    //validating we match the schema
    const choreToAdd = new Todo(choreFromClient);
    //puts the data into database
    choreToAdd.save().then( () => {
        console.log('item added', choreToAdd );
        response.sendStatus(201);
    }).catch( (error) => {
        console.log(error);
        response.sendStatus(500);
    });
});


//basic route for stuff
router.get( '/', ( request,response ) => {
    console.log( '/todo GET hit' );
    Todo.find({}).then( ( foundChores ) => {
        //(foundChores is an array of everything found in db)
        response.send( foundChores );        
    }).catch( ( error ) => {
        response.sendStatus(500);
    });
    
});



    
  










module.exports = router;