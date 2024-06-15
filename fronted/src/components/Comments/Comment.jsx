import React from 'react';
import "./comment.css";
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentPost } from '../../Actions/Post';
import { getFollowingPosts } from '../../Actions/User';

function Comment({ userId, name, avatar, comment, commentId, postId,isAccount }) {
  const dispatch=useDispatch();
  const deletecommenthandler=()=>{
dispatch(deleteCommentPost(postId,commentId))

if (isAccount) {
  
}
else{
  dispatch(getFollowingPosts());
}



  }
  const { user } = useSelector((state) => state.user || {});
  return (
    <div className="commentUser" key={commentId}>
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ marginLeft: "10px" }}>{name}</Typography>
      </Link>
      <Typography style={{ marginLeft: "10px" }}>{comment}</Typography>
   
   {
    isAccount?    <Button onClick={deletecommenthandler}>
    <Delete />
  </Button>
   :
 userId===user._id?(
  <Button   onClick={deletecommenthandler}>
  <Delete />
</Button>
 ):null
   }


    </div>
  );
}

export default Comment;
