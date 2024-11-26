'use strict';

const userController = require('../controller/modules/user/controller');
const authController = require('../controller/modules/user/AuthController');
const MiddlewareJwt = require('../controller/utils/middlewareJwt');

module.exports = (app) => {
  // **Auth Routes**
  app.route('/auth/register').post(authController.registerUser); // Register user
  app.route('/auth/login').post(authController.loginUser); // Login user
  app.route('/auth/logout').post(authController.logoutUser); // Logout user

  // **User Routes**
  app.route('/user')
    .get(userController.getUsers) // Get all users
    .post(userController.createUser); // Create a new user

  app.route('/user/:id')
    .get(userController.getUserById) // Get a user by ID
    .put(userController.updateUser) // Update a user by ID
    .delete(userController.deleteUser); // Delete a user by ID

  
};
