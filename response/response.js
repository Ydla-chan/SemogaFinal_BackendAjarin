'use strict';

// Function to set up the response data format
const setData = (status, message, values) => {
  return {
    'status': status,
    'message': message,
    'results': values  
  };
}

// Function to send the response
const setResponse = (data, res) => {
  res.status(data.status); // Use the status from data
  res.json(data);          // Send the response as JSON
  res.end();
}

// Success response
const success = (values, res) => {
  setResponse(setData(200, 'success', values), res);
}

// Internal Server Error response
const serverError = (values, res) => {
  setResponse(setData(501, 'Internal Server Error', values), res);
}

// Forbidden response
const forbidden = (values, res) => {
  setResponse(setData(403, 'Forbidden', values), res);
}

// Export the functions
module.exports = {
  success,
  forbidden,
  serverError
};
