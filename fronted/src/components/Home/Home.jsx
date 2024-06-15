import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import "./home.css";

import Post from '../post/Post';
import { getAllUsers, getFollowingPosts } from "../../Actions/User";
import Loader from '../Loader/Loader';
import { Avatar, Typography } from "@mui/material";
import toast from 'react-hot-toast';
import { likePost } from '../../Actions/Post';
import StoryComponent from '../Story/Story';
import { Link } from 'react-router-dom'
import { allStory, getSingleUserStory } from '../../Actions/story';
import { isAction } from '@reduxjs/toolkit';

function Home() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user?._id);
  const name=useSelector((state)=>state.user.user?.name)
  const { loading, posts, error: postError } = useSelector(
    (state) => state.postOfFollowing || {} // Provide an empty object as default value
  );

  const { users, loading: usersLoading, error: userError } = useSelector(
    (state) => state.allUsers || {} // Provide an empty object as default value
  );
  const {user} =useSelector((state)=>state.user)

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
    dispatch(allStory());
    dispatch(getSingleUserStory(userId))
  }, [dispatch,userId]);
  
  return loading === true || usersLoading === true ? (
    <Loader />
  ) : (
    <>
    <div className="story">
      <Link to="/stories"> <img className='userstory' src={user.avatar.url} alt="" /> <p className='para'>Create Story</p></Link>
      {users && users.length > 0 ? (
        users.map((user) => (
          <div className="alluser" key={user._id}>
            <Link to={`/stories/${user._id}`}><img className='userstory' src={user.avatar.url} alt={user.name} /></Link>

            <p>{user.name}</p>
          </div>
        ))
      ) : (
        <Typography>No Users Yet</Typography>
      )}
      </div>
      <div className="home">
        <div className="homeleft">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post._id}
                postId={post._id}
                caption={post.caption}
                postImage={post.image.url}
                likes={post.likes}
                comments={post.comments}
                ownerImage={post.owner.avatar.url}
                ownerName={post.owner.name}
                ownerId={post.owner._id}
               isAccount={post.owner._id===userId}
              />
            ))
          ) : (
            <Typography variant="h6">No posts yet</Typography>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
