
const { authenticate } = require('../config/jwt.config');
const BookController = require('../controller/book.controller');
 
module.exports = app => {
    app.get('/api/books', BookController.findAllBooks);
    app.get('/api/books/:id/details', authenticate, BookController.findOneSingleBook);
    app.patch('/api/books/:id/edit', authenticate, BookController.updateExistingBook);
    app.post('/api/books/new', authenticate, BookController.createNewBook);
    app.delete('/api/books/:id', authenticate, BookController.deleteAnExistingBook);
}
