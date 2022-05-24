//import needed models
const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          {
            _id: req.params.userId
          },
          {
            $push: { thoughts: _id }
          },
          {
            new: true,
            runValidators: true
          }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json('The thought has been deleted')
      )
      .catch((err) => res.status(500).json(err));
  },
  //adding reactions
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body }},
      { runValidators: true, new: true }
    )
    .populate({
      path: 'reactions',
      select: '-__v'
    })
    .select('-__v')
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No reaction with that ID' })
        : res.json(thought),
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  //deleting reactions by reactionId
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId} } },
      { new: true }
    )
    .then((user) =>
        !user
          ? res.status(404).json({ message: 'No thought found with that ID' })
          : res.json('reaction to thought has been deleted'),
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};
