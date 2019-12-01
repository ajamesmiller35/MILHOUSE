const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema({
    username: { type: String },
    password: { type: String }
});

module.exports = mongoose.model('User', userModel)