const express = require('express');
const { isAuthenticated } = require('../middlewares/auth');
const { register, login, followerUser, logoutUser, updatePassword, updatProfile, myProfile, getAllUser, getSingelUser, forgetPassword, deleteMe, resetPassword, likeVideosave, getLikedSavedPosts, savepost, SavedPosts, unsaved, } = require('../controller/User');

const router = express.Router();

router.route('/register').post(register);
router.route("/login").post(login);
router.route("/follow/:id").get(isAuthenticated,followerUser)
router.route("/logout").get(isAuthenticated,logoutUser)
router.put("/update/passowrd",isAuthenticated,updatePassword)
router.put("/update/profile",isAuthenticated,updatProfile)
router.route("/me").get(isAuthenticated,myProfile)
router.route("/user/:id").get(isAuthenticated,getSingelUser)
router.route("/users").get(isAuthenticated,getAllUser)
router.route("/forget/password").post(isAuthenticated,forgetPassword)
router.route("/password/reset/:resettoken").put(isAuthenticated, resetPassword)
router.route("/delete/me").delete(isAuthenticated,deleteMe)
router.get('/save/:postId', isAuthenticated, savepost);
router.get('/saved', isAuthenticated, SavedPosts);


module.exports = router;
