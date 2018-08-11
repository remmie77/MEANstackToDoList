const express = require( 'express' );
const app = express();
const bodyParser = require('body-parser');
const toDoRouter = require('./routes/todo.router.js')

// Configure body-parser for angular.js
// bodyParser sets req.body = data;
app.use(bodyParser.json());

//uses
app.use( express.static( 'server/public' ) );
app.use( '/todo', toDoRouter );

// globals
// if process.env.PORT is undefined, use 5000
const port = process.env.PORT || 5000;

//connect to mongodb using mongoose
const mongoose = require( 'mongoose' );

//where is Mongo?
const mongoURI = 'mongodb://localhost:27017/todo';
//27017 is the PORT that Mongo is running on
// todo is what we are naming the database

// attempt to connect
mongoose.connect(mongoURI, {useNewUrlParser: true});
// {useNewUrlParser: true}  <- avoids a warning in the console

//log out success, or failure
mongoose.connection.on('open', () => {
    //sucess!
    console.log('connected to Mongo mang!!!!!');
});

mongoose.connection.on('error', (error) => {
    console.log( 'something went wrong connecting to Mongo', error );
});

//spin up server
app.listen( port, () => {
    console.log( 'server up on port: ', port );
}); // end spin up server





