const express = require('express');
const multer = require('multer');
const { isAuthenticated } = require('../middlewares/auth');
const { uploadStory, getAllStories, getUserStories, likeStory } = require('../controller/Story');

const router = express.Router();



router.post('/uploadstory', isAuthenticated, uploadStory);
router.get('/stories', isAuthenticated, getAllStories);
router.get('/stories/:id', isAuthenticated,getUserStories);
router.route("/like/:id").get(isAuthenticated,likeStory)
module.exports = router;
