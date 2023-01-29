const express = require('express');
const { authController, getUserProfile, registerUser, updateUserProfile } = require('../controllers/userController');
const {protect} = require('../middlewares/authMiddleware')

const router = express.Router();

//user registration
router.route('/').post(registerUser);

//post email and password
router.route("/login").post(authController);

//Get user Profile Private Route
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;