
const { authenticateAdmin, authenticate } = require('../config/jwt.config');
const UserController = require('../controller/user.controller');
const BookController = require('../controller/book.controller')


module.exports = app => {
    
    app.get('/api/users/:suggestedBy', UserController.getAllUsers);
    app.get('/api/users', UserController.getAllUsers);

    app.get('/api/users/:id/books', BookController.findOneSingleBook);

    app.get('/api/user/profile', UserController.findOneUser);

    app.post('/api/users/register', UserController.register);
    app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout);
    app.delete('/api/users/delete/:id', UserController.deleteUser);

}