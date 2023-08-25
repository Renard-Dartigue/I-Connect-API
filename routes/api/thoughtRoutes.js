const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addThoughtReaction,
    deleteThoughtRaaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('./').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('./:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('./:thoughtId/reactions').post(addThoughtReaction);

router.route('./:thoughtId/reactions/:reactionId').delete(deleteThoughtRaaction);

module.exports = router;