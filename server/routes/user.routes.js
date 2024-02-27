
const { authenticateAdmin, authenticate } = require('../config/jwt.config');
const UserController = require('../controller/user.controller');

module.exports = app => {
    app.get('/api/users', UserController.getAllUsers);
    app.post('/api/users/register', UserController.register);
    app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout);
    app.delete('/api/users/delete/:id', UserController.deleteUser);

}