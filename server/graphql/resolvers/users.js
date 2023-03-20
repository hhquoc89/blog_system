const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server')
const {SECRET_KEY} = require('../../config.js')
const User = require('../../models/User');
const {validateRegisterInput,validateLoginInput} = require('../../util/validate')
function generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        userName: user.userName
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
  }

module.exports = {
    Mutation: {
        async login(_, { userName, password }) {
            const { errors, valid } = validateLoginInput(userName, password);
      
            if (!valid) {
              throw new UserInputError('Errors', { errors });
            }
      
            const user = await User.findOne({ userName });
            console.log(user);
            if (!user) {
              errors.general = 'User not found';
              throw new UserInputError('User not found', { errors });
            }
      
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
              errors.general = 'Password not match with hash password';
              throw new UserInputError('Password not match with hash password', { errors });
            }
      
            const token = generateToken(user);
      
            return {
              ...user._doc,
              id: user._id,
              token
            };
          },
        async register(
            _,
            {
              registerInput: { userName, email, password, confirmPassword }
            }
          ) {
            // Validate user data
            const { valid, errors } = validateRegisterInput(
              userName,
              email,
              password,
              confirmPassword
            );
            if (!valid) {
              throw new UserInputError('Errors', { errors });
            }
            //  Username available?
            const user = await User.findOne({ userName });
            if (user) {
              throw new UserInputError('Username available', {
                errors: {
                  username: 'This username is available'
                }
              });
            }
            // hash password 
            password = await bcrypt.hash(password, 12);
      
            const newUser = new User({
              email,
              userName,
              password,
              createdAt: new Date().toISOString()
            });
      
            const res = await newUser.save();
      
            const token = generateToken(res);
      
            return {
              ...res._doc,
              id: res._id,
              token
            };
          }
    }
}