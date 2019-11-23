const mongoose = require('mongoose');

const { Schema } = mongoose;

const memoryModel = new Schema({
    title: { type: String },
    date: { type: String },
    img: { type: String },
    creator: { type: String },
    description: { type: String }
});

module.exports = mongoose.model('Memory', memoryModel);