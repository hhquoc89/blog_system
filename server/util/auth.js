const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

module.exports = (context) => {
  // context là header,body,cookies của request
  const authHeader = context.req.headers.authorization;
  
  if (authHeader) {
    // Token ....
    const token = authHeader.split('Token ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error("Authentication token must be 'Token [token]");
  }
  throw new Error('Authorization header must be provided');
};