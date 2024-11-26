'use strict';

const db = require('../../../connection/conn');  // Adjust path as necessary
const response = require('../../../response/response');  // Response utility

// Create a new user
exports.createUser = (req, res) => {
    const { name, email, password, gender, UrlProfile } = req.body;
    const query = 'INSERT INTO user_tb (name, email, password, gender, UrlProfile) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, email, password, gender, UrlProfile], (err, result) => {
      if (err) {
        console.error("Database error:", err); // Log detail error dari database
        return response.serverError('Error creating user', res);
      }
  
      response.success({ id: result.insertId, name, email, gender, UrlProfile }, res);
    });
  };
  

// Get all users
exports.getUsers = (req, res) => {
  const query = 'SELECT * FROM user_tb';
  db.query(query, (err, results) => {
    if (err) {
      response.serverError('Error fetching user data', res);
    } else {
      response.success(results, res);
    }
  });
};

// Get a single user by ID
exports.getUserById = (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM user_tb WHERE userid = ?';
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      response.serverError('Error fetching user data', res);
    } else if (results.length === 0) {
      response.serverError('User not found', res);
    } else {
      response.success(results[0], res);
    }
  });
};

// Update user information
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, email, password, gender, UrlProfile } = req.body;

  const query = 'UPDATE user_tb SET name = ?, email = ?, password = ?, gender = ?, UrlProfile = ? WHERE userid = ?';
  db.query(query, [name, email, password, gender, UrlProfile, userId], (err, result) => {
    if (err) {
      response.serverError('Error updating user', res);
    } else if (result.affectedRows === 0) {
      response.serverError('User not found', res);
    } else {
      response.success({ userId, name, email, gender, UrlProfile }, res);
    }
  });
};

// Delete a user
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM user_tb WHERE userid = ?';
  
  db.query(query, [userId], (err, result) => {
    if (err) {
      response.serverError('Error deleting user', res);
    } else if (result.affectedRows === 0) {
      response.serverError('User not found', res);
    } else {
      response.success(`User with ID ${userId} deleted successfully`, res);
    }
  });
};
