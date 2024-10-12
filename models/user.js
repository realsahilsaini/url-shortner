const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  role: {type: String, required: true, default: 'NORMAL '},
  password: {type: String, required: true},
}, {timestamps: true});


const User = mongoose.model('users', UserSchema);

module.exports = {
  User
};  