
import "./newpost.css"

import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../Actions/Post";
import toast from "react-hot-toast";
import { loadUser } from "../../Actions/User";


function Newpost() {
    const [image,setImage]=useState(null);
    const [caption,setCaption]=useState("")


    const {loading,error,message}=useSelector((state)=>state.createpost)
    const dispatch=useDispatch()
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result); // this will be the base64 string
        };
        reader.readAsDataURL(file);
      };
    const submitHandler=async(e)=>{

e.preventDefault()
await dispatch(createPost(image,caption))
dispatch(loadUser())
setImage(null)

setCaption("")

    }

    
    useEffect(()=>{
        if(error){
         toast.error(error)
        }
        if(message){

            toast.success(message)
            dispatch({type:"clearMessage"})
            
        }
    })
  return (
  <>

<div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3">New Post</Typography>
        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button disabled={loading} type="submit">
          Post
        </Button>
      </form>
    </div>

  </>
  )
}

export default Newpost


