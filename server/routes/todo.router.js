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
















module.exports = router;