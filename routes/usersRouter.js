const router = require('express').Router();


router.get('/me', getUserData);
router.patch('/me', updateProfile);
