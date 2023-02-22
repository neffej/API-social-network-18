const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, },
    thoughts: {},
    friends: {},

    // Virtual called "friendCount" needs to be made
})

const User = mongoose.model('User', userSchema);

const handleError= (err) => console.error(err);

module.exports = User;