const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    _id: { type: String },
    username: { type: String },
    email: { type: String, unique: true},
    password: { type: String },
    mypas: { type: String }
}, { _id: false });

module.exports = mongoose.model('User', userSchema);