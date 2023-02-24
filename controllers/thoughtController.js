const { Thought, User } = require('../models');

module.exports = {
    // Return all thoughts
    getThoughts(req,res){
        Thought.find()
        .then((thoughts)=> res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // Return a single thought
    getAThought(req,res){
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought with that ID found' })
        : res.json(thought)
        )
        .catch((err)=> res.status(500).json(err));
    },
    // Create a thought
    createAThought(req,res){
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );
        })
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'Thought made, but no user was found with that ID' })
        : res.json('Thought Posted!')
        )
        .catch((err) => res.status(500).json(err));
    },
    // Change a thought
    updateAThought(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thought found with this ID' })
        : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Delete a thought
    deleteAThought(req,res){
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought)=>
        !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : console.log('Thought Deleted'))
        .then(() => res.json({ message: 'Thought Deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    // Add a reaction
    addReaction(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
            )
            .then((thought) => 
            !thought
            ? res.status(404).json({ message: 'No thought found with this ID' })
            : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Delete reaction
    undoReaction(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.body.id } } },
            { new:true }
        )
        .then((thought)=>
        !thought
        ? res.json(404).json({ message: "No reaction with that ID was found" })
        : res.json(thought)
        )
        .catch((err)=> res.status(500).json(err));
    }
};