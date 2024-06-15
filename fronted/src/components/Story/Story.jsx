import React, { useState, useEffect } from 'react';

import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { allStory, getSingleUserStory, storyUpload } from '../../Actions/story';
import { loadUser } from '../../Actions/User';
import toast from 'react-hot-toast';

const StoryComponent = () => {
    const [image,setImage]=useState(null);
    const [comment,setComment]=useState("")
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user?._id); // Ensure you have a user slice in your Redux store
  const { stories, loading, error,message } = useSelector((state) => state.story);

  useEffect(() => {
    dispatch(allStory());
    dispatch(getSingleUserStory(userId))
    
  }, [dispatch]);

  useEffect(()=>{
    if(message){
  toast.success(message)
    dispatch({
      type:"clearMessage"
    })

    }
    if(error){
      toast.error(error)  
    }
  },[message,dispatch,error])
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // this will be the base64 string
    };
    reader.readAsDataURL(file);
  
  };

  const submitHandler= async(e) => {
    e.preventDefault()
await dispatch(storyUpload(image,userId,comment));
dispatch(loadUser())
setImage(null)
setComment("")

  };

  return (
    <div className="newPost">
    <form className="newPostForm" onSubmit={submitHandler}>
      <Typography variant="h3">New Story</Typography>
      {image && <img src={image} alt="post" />}
      <input type="file" accept="image/*" onChange={handleImageChange} />
   <input type="text" name="" id="" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Comment" />
      <Button disabled={loading} type="submit">
        Story Create
      </Button>
    </form>
  </div>

  );
};

export default StoryComponent;
