import React, { useEffect, useState } from "react";
import "./post.css";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DeletePost,
  Saved,
  UpdatePost,
  addCommentPost,
  getMyPosts,
  likePost,
} from "../../Actions/Post";
import toast from "react-hot-toast";
import { getFollowingPosts, loadUser } from "../../Actions/User";
import User from "../User/USer";
import Comment from "../Comments/Comment";

function Post({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
  onLikeUpdate,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user || {});
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [showLikesDialog, setShowLikesDialog] = useState(false);
  const [showCommentsDialog, setShowCommentsDialog] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [captionDialog, setCaptionDialog] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);

  const { error: postError, message: postMessage } = useSelector((state) => state.post || {});
  const { error: likeError, message: likeMessage } = useSelector((state) => state.like || {});
  const { error: commentError, message: commentMessage } = useSelector((state) => state.comment || {});
  const { error: savedError, message: savedMessage } = useSelector((state) => state.savepost || {});

  useEffect(() => {
    if (postError || likeError || commentError || savedError) {
      toast.error(postError || likeError || commentError || savedError);
      dispatch({ type: "clearError" });
    }

    if (postMessage || likeMessage || commentMessage || savedMessage) {
      toast.success(postMessage || likeMessage || commentMessage || savedMessage, {
        id: postMessage || likeMessage || commentMessage || savedMessage,
      });
      dispatch({ type: "clearMessage" });
    }
  }, [postError, likeError, commentError, savedError, postMessage, likeMessage, commentMessage, savedMessage, dispatch]);

  useEffect(() => {
    if (likes && user) {
      setLiked(likes.some((item) => item._id === user._id));
    }
  }, [likes, user]);

  const handleLikePost = async (e) => {
    e.preventDefault();
    if (!liked) {
      setLiked(true);
      setLikesCount(likesCount + 1);
    } else {
      setLiked(false);
      setLikesCount(likesCount - 1);
    }

    await dispatch(likePost(postId));
    if (onLikeUpdate) {
      onLikeUpdate(postId, !liked);
    }
    if (!isAccount) {
      dispatch(getFollowingPosts());
    }
  };

  const handleAddCaption = async (e) => {
    e.preventDefault();
    await dispatch(UpdatePost(captionValue, postId));
    dispatch(getMyPosts());
  };

  const handleDeletePost = async () => {
    await dispatch(DeletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    await dispatch(addCommentPost(postId, commentValue));
    setCommentValue("");
    if (!isAccount) {
      dispatch(getFollowingPosts());
    } else {
      dispatch(getMyPosts());
    }
    setShowCommentsDialog(false);
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    await dispatch(Saved(postId, ownerId));
  };

  return (
    <div className="post">
      <div className="postHeader">
      <Typography 
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignItems:'center'}}
        >
          {caption}
        </Typography>
        {isAccount && (
          <Button onClick={() => setCaptionDialog(!captionDialog)}>
            <MoreVert />
          </Button>
        )}
      </div>

      <img src={postImage} alt="Post" className="postImage" />

      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{ height: "3vmax", width: "3vmax" }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>
   
      </div>
      
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() => setShowLikesDialog(true)}
        disabled={likesCount === 0}
      >
        <Typography>
          {likesCount} {likesCount === 1 ? "like" : "likes"}
        </Typography>
      </button>

      <div className="postFooter">
        <Button onClick={handleLikePost}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>
        <Button onClick={() => setShowCommentsDialog(true)}>
          <ChatBubbleOutline />
        </Button>
        {isDelete && (
          <Button onClick={handleDeletePost}>
            <DeleteOutline />
          </Button>
        )}
        <Button onClick={handleSavePost}>
          <BookmarkAddIcon />
        </Button>
      </div>

      <Dialog open={showLikesDialog} onClose={() => setShowLikesDialog(false)}>
        <div className="DialogBox">
          <Typography variant="h4">Likes</Typography>
          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
          ))}
        </div>
      </Dialog>

      <Dialog open={showCommentsDialog} onClose={() => setShowCommentsDialog(false)}>
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>
          <form className="commentForm" onSubmit={handleAddComment}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment Here"
              required
            />
            <Button type="submit" variant="contained">Add</Button>
            <Button onClick={() => setShowCommentsDialog(false)}>Cancel</Button>
          </form>
          {comments.length > 0 ? (
            comments.map((item) => (
              <Comment
                key={item._id}
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                postId={postId}
              />
            ))
          ) : (
            <Typography>No Comments here</Typography>
          )}
        </div>
      </Dialog>

      <Dialog open={captionDialog} onClose={() => setCaptionDialog(false)}>
        <div className="DialogBox">
          <Typography variant="h4">Change Your Caption</Typography>
          <form className="commentForm" onSubmit={handleAddCaption}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption Here"
              required
            />
            <Button type="submit" variant="contained">Update</Button>
            <Button onClick={() => setCaptionDialog(false)}>Cancel</Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default Post;
