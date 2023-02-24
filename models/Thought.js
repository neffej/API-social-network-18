const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: { type: Schema.Types.ObjectId, required: true, },
    reactionBody: { type: String, required: true, maxLength: 280,}, //280 character maximum
    username: { type: String, required: true },
},{
    timestamps: { createdAt: true, updatedAt: false },
})

const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, maxLength: 280, },
    username: { type: String, required: true},
    reactions: [reactionSchema],
},
{
    toJSON: {
        virtuals: true,
    },
    timestamps: { createdAt: true, updatedAt: false },
    id: false,
});

thoughtSchema.virtual('reactionCount').
get(function(){
    return `${this.reactions.length}`
});

const Thought = model('Thought', thoughtSchema);

const handleError= (err) => console.error(err);

module.exports = Thought;