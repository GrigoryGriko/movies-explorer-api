const router = require('express').Router();
const {
  validateProfile,
} = require('../middlewares/validation');

const {
  getUserData,
  updateProfile,
} = require('../controllers/usersController');

router.get('/me', getUserData);
router.patch('/me', validateProfile, updateProfile);

module.exports = router;
