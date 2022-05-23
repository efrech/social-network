const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  //POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions

module.exports = router;
