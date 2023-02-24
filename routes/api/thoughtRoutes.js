const router = require('express').Router();
const {
    getThoughts,
    getAThought,
    createAThought,
    updateAThought,
    deleteAThought,
    addReaction,
    undoReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createAThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getAThought).put(updateAThought).delete(deleteAThought);

// /api/thoughts/:thoughtId/reaction
router.route('/:thoughtId/reaction').put(addReaction).delete(undoReaction);

module.exports = router;