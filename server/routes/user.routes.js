
const UserController = require('../controller/user.controller');

module.exports = app => {
    app.post('/api/users/register', UserController.register);
}