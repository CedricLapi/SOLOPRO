const mongoose = require('mongoose');



 
const BookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Title is required!"],
        minlength: [3, "description must be at least 5 characters long!"]

    },

    description: {
        type: String,
        required: [true, "description is required!"],
        minlength: [5, "description must be at least 5 characters long!"]
        
    },

    // Add a reference to the user who suggested the book
    suggestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

    }, { timestamps: true });
 

const Book = mongoose.model('Book', BookSchema);
 
module.exports = Book;
