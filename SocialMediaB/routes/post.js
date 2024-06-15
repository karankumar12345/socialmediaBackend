const express = require('express');
const { createPost, LikeandUnlike, deletepost, getpostofollowing, updateCaption, addComment, deleteComment, mypost, getuserPosts,  } = require('../controller/post');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.route('/upload').post(isAuthenticated,createPost);
router.route("/like/:id").get(isAuthenticated,LikeandUnlike).delete(isAuthenticated,deletepost).put(isAuthenticated,updateCaption)

router.route("/posts").get(isAuthenticated,getpostofollowing)
router.route("/comment/:id").put(isAuthenticated,addComment).delete(isAuthenticated,deleteComment)
router.route("/mypost").get(isAuthenticated,mypost)
router.route("/userpost/:id").get(isAuthenticated,getuserPosts)

module.exports = router;
