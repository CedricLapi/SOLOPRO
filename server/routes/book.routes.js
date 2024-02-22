
const BookController = require('../controller/book.controller');
 
module.exports = app => {
    app.get('/api/books', BookController.findAllBooks);
    app.get('/api/books/:id/details', BookController.findOneSingleBook);
    app.patch('/api/books/:id/edit', BookController.updateExistingBook);
    app.post('/api/books/new', BookController.createNewBook);
    app.delete('/api/books/:id', BookController.deleteAnExistingBook);
}
