
const { authenticate } = require('../config/jwt.config');
const BookController = require('../controller/book.controller');
 
module.exports = app => {
    app.get('/api/books', BookController.findAllBooks);
    app.get('/api/books/:id/details', BookController.findOneSingleBook);
    app.get('/api/books/:id/details/c', BookController.findOneSingleBook);
    
    //app.get('/api/books/:id/favorites', BookController.addToFavorites);
    app.patch('/api/books/:id/edit', BookController.updateExistingBook);
    app.post('/api/books/new', BookController.createNewBook);
    app.post('/api/books/:id/favorites/add', BookController.addToFavorites);

    app.delete('/api/books/:id', BookController.deleteAnExistingBook);
}
