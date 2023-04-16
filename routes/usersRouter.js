const router = require('express').Router();

const {
  getUserData,
  updateProfile,
} = require('../controllers/usersController');

router.get('/me', getUserData);
router.patch('/me', updateProfile);

module.exports = router;
