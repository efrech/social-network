const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/user/:userId/friends/:friendId route
router.route('/:userId/friends').post(addFriend);

// /api/user/:userId/friends/:friendtId
router.route('/:userId/friendss/:friendId').delete(removeFriend);

module.exports = router;
