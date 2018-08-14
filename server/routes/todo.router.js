const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Similar to a Class


// Define our data structure
const TodoSchema = new Schema({
    task: { type: String },
    complete: { type: Boolean, default: false }
}); // Requires all data adhere to these types

// This is a Model. It allows us to interface with the database.
const Todo = mongoose.model('Chores', TodoSchema);
// Chores will be the collection name

router.delete('/:id', (req, res) => {
    console.log('in router delete', req.params.id);
    Todo.findByIdAndRemove(req.params.id).then((deletedTodo) => {
        console.log(deletedTodo);
        res.sendStatus(201);
    }).catch((error) => {
        console.log('ERRROR in router delete', error);
        res.sendStatus(500);
    });
});


router.post('/', (request, response) => {
    console.log('/todo POST');
    console.log('router posting', request.body);
    let choreFromClient = request.body;
    //Add to the database
    //validating we match the schema
    const choreToAdd = new Todo(choreFromClient);
    //puts the data into database
    choreToAdd.save().then(() => {
        console.log('item added', choreToAdd);
        response.sendStatus(201);
    }).catch((error) => {
        console.log(error);
        response.sendStatus(500);
    });
});




//basic route for stuff
router.get('/', (request, response) => {
    console.log('/todo GET hit');
    Todo.find({}).then((foundChores) => {
        //(foundChores is an array of everything found in db)
        response.send(foundChores);
    }).catch((error) => {
        response.sendStatus(500);
    });

});

// PUT & DELETE will always have a /:id
router.put( '/', ( req, res )=>{
    console.log( 'updating:', req.body );
    Todo.findOne( { _id: req.body._id } ).then( ( result )=>{
        console.log( 'chore found:', result );
        result.complete = !result.complete;
        result.save().then( ()=>{
            console.log( 'updated chore:' );
            res.sendStatus( 200 );
        }).catch( ( error )=>{
            console.log( 'error saving updated chore:', error );
            res.sendStatus( 500 );
        }) // end save
        res.sendStatus( 200 );
    }).catch( ( error )=>{
        console.log( 'error finding chore' );
        res.sendStatus( 500 );
    }) // end find
}) // end PUT

module.exports = router;