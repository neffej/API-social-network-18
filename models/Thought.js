const mongoose = require('mongoose');

const ThoughtSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true,  }, //also needs to be between 1 and 280 characters
    createdAt: { type: Date, required: true, unique: true, },
    username: { type: String, required: true},
    reactions: {},

    // Virtual called "reactionCount" needs to be made
})

const Thought = mongoose.model('Thought', thoughtSchema);

const handleError= (err) => console.error(err);

module.exports = Thought;