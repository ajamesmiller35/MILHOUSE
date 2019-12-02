const mongoose = require('mongoose');

const { Schema } = mongoose;

const listModel = new Schema({
    title: { type: String },
    items: { type: Array },
    creator: { type: String },
});

module.exports = mongoose.model('List', listModel);