import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';  // Assuming axios is correctly imported from './axiosuser'


export const likeSuccess = createAction('like/likeSuccess');
export const likeFailure = createAction('like/likeFailure');
export const likeRequest = createAction('like/likeRequest');

export const savedRequest = createAction("savedRequest");
export const savedSuccess = createAction("savedSuccess");
export const savedFailure = createAction("savedFailure");

export const savedsRequest = createAction("savedsRequest");
export const savedsSuccess = createAction("savedsSuccess");
export const savedsFailure = createAction("savedsFailure");




export const mypostFailure = createAction('mypost/mypostFailure');
export const mypostSuccess = createAction('mypost/mypostSuccess');
export const mypostRequest = createAction('mypost/mypostRequest');
export const userpostFailure = createAction('mypost/userpostFailure');
export const userpostSuccess = createAction('mypost/userpostSuccess');
export const userpostRequest = createAction('mypost/userpostRequest');
export const usertokenFailure = createAction('mypost/usertokenFailure');
export const usertokenSuccess = createAction('mypost/usertokenSuccess');
export const userresetRequest = createAction('mypost/userresetRequest');
export const userresetFailure = createAction('mypost/userresetFailure');
export const userresetSuccess = createAction('mypost/userresetSuccess');



export const usertokenRequest = createAction('mypost/usertokenRequest');
export const followingRequest = createAction('mypost/followingFailure');
export const followingSuccess = createAction('mypost/followingSuccess');
export const followingFailure = createAction('mypost/followingRequest');

export const commentFailure = createAction('comment/commentFailure');
export const commentSuccess = createAction('comment/commentSuccess');
export const commentRequest = createAction('comment/commentRequest');
export const deletecommentFailure = createAction('comment/deletecommentFailure');
export const deletecommentSuccess = createAction('comment/deletecommentSuccess');
export const deletecommentRequest = createAction('comment/deletecommentRequest');
export const CREATE_POST_REQUEST = createAction("createpost/CreatePostRequest");
export const CREATE_POST_SUCCESS = createAction("createpost/CreatePostSuccess");
export const CREATE_POST_FAILURE = createAction("createpost/CreatePostFailure");
export const UPDATE_POST_REQUEST = createAction("createpost/UPDATEPostRequest");
export const UPDATE_POST_SUCCESS = createAction("createpost/UPDATEPostSuccess");
export const UPDATE_POST_FAILURE = createAction("createpost/UPDATEPostFailure");
export const DELETE_POST_REQUEST = createAction("createpost/DELETEPostRequest");
export const DELETE_POST_SUCCESS = createAction("createpost/DELETEPostSuccess");
export const DELETE_POST_FAILURE = createAction("createpost/DELETEPostFailure");

export const clearError = createAction('clearErrors');
export const clearMessage = createAction('clearMessage');

const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    'Content-Type': 'application/json',


  },
  withCredentials: true // Add this line
});
// Like a post
export const likePost = (id) => async (dispatch) => {
    try {
        dispatch(likeRequest());
        const { data } = await api.get(`/api/v1/post/like/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch(likeSuccess(data.message));
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        dispatch(likeFailure(errorMessage));
    }
};
export const followUser = (id) => async (dispatch) => {
    try {
        dispatch(followingRequest());
        const { data } = await api.get(`/api/v2/user/follow/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch(followingSuccess(data.message));
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        dispatch(followingFailure(errorMessage));
    }
};

// Add a comment to a post
export const addCommentPost = (id, comment) => async (dispatch) => {
    try {
        dispatch(commentRequest());
        const { data } = await api.put(`/api/v1/post/comment/${id}`, { comment }, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch(commentSuccess(data.message));
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        dispatch(commentFailure(errorMessage));
    }
};

// Delete a comment from a post
export const deleteCommentPost = (id, commentId) => async (dispatch) => {
    try {
        dispatch(deletecommentRequest());
        const { data } = await api.delete(`/api/v1/post/comment/${id}`, {
            data: { commentId },
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch(deletecommentSuccess(data.message));
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        dispatch(deletecommentFailure(errorMessage));
    }
};

// Get my posts
export const getMyPosts = () => async (dispatch) => {
    try {
        dispatch(mypostRequest());
        const { data } = await api.get(`/api/v1/post/mypost`);
        dispatch(mypostSuccess(data.posts));
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        dispatch(mypostFailure(errorMessage));
    }
};

// Create a new post
export const createPost = (image, caption) => async (dispatch) => {
  try {
    dispatch(CREATE_POST_REQUEST());

    const { data } = await api.post("/api/v1/post/upload", {
        image,
        caption,
    },{
        headers: {
            "Content-Type": "application/json",
        }
    });

    dispatch(CREATE_POST_SUCCESS(data.message));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch(CREATE_POST_FAILURE(errorMessage));
  }
};
export const UpdatePost = (caption,id) => async (dispatch) => {
  try {
    dispatch(UPDATE_POST_REQUEST());

    const { data } = await api.put(`/api/v1/post/like/${id}`, {
        
        caption,
    },{
        headers: {
            "Content-Type": "application/json",
        }
    });

    dispatch(UPDATE_POST_SUCCESS(data.message));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch(UPDATE_POST_FAILURE(errorMessage));
  }
};
export const DeletePost = (id) => async (dispatch) => {
  try {
    dispatch({
        type:' DELETE_POST_REQUEST'

    }
        
       );

    const { data } = await api.delete(`/api/v1/post/like/${id}`,{
        headers: {
            "Content-Type": "application/json",
        }
    });

    dispatch({
        type:" DELETE_POST_SUCCESS",
        payload:data.message
    })
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch({
        type:" DELETE_POST_FAILURE"
    })
  }
};

//userpost
export const userPost = (id) => async (dispatch) => {
    try {
        dispatch(userpostRequest());
        const { data } = await api.get(`/api/v1/post/userpost/${id}`);
        dispatch(userpostSuccess(data.posts));
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        dispatch(userpostFailure(errorMessage));
    }
};
export const forgetPasswordEmail = (email) => async (dispatch) => {
    try {
      dispatch({ type:'usertokenRequest' });
  
      const { data } = await api.post('/api/v2/user/forget/password', { email });
  
      dispatch({ type: 'usertokenSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'usertokenFailure',
        payload: error.response?.data?.message || error.message,
      });
    }
  };
export const resetPassword = (token,password) => async (dispatch) => {
    try {
      dispatch({ type:'userresetRequest' });
  
      const { data } = await api.post(`/api/v2/user/password/reset/${token}`, { password });
  
      dispatch({ type: 'userresetSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'userresetFailure',
        payload: error.response?.data?.message || error.message,
      });
    }
  };
export const Saved= (postId,userId) => async (dispatch) => {
    try {
      dispatch(savedRequest());
  
      const { data } = await api.get(`/api/v2/user/save/${postId}`, { userId},{
        headers: {
          "Content-Type": "application/json",
      }
      });
      dispatch(savedSuccess(data.message));
   
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      dispatch(savedFailure(errorMessage));
  
    }
  };

  export const saveds = () => async (dispatch) => {
    try {
        dispatch(savedsRequest());
        const { data } = await api.get(`/api/v2/user/saved`);
        dispatch(savedsSuccess(data.likedSavedPosts));
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        dispatch(savedsFailure(errorMessage));
    }
};