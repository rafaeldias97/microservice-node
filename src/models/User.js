const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    id: ObjectId,
    name: String,
    pass: String,
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('User', User);