import axios from 'axios'; 
import { createAction } from '@reduxjs/toolkit';
export const STORY_UPLOAD_REQUEST = "story/upload_request";
export const STORY_UPLOAD_SUCCESS = "story/upload_success";
export const STORY_UPLOAD_FAILURE = "story/upload_failure";
export const ALL_STORY_REQUEST = "story/all_request";
export const ALL_STORY_SUCCESS = "story/all_success";
export const ALL_STORY_FAILURE = "story/all_failure";
export const User_story_FAILURE ="story/user_failure"
export const User_story_REQUEST = "story/user_request"
export const User_story_SUCCESS = "story/user_success"
export const clearError = createAction('clearErrors');
export const clearMessage = createAction('clearMessage');

export const likeSuccess = createAction('like/likeSuccess');
export const likeFailure = createAction('like/likeFailure');
export const likeRequest = createAction('like/likeRequest');

const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    'Content-Type': 'application/json',


  },
  withCredentials: true // Add this line
});
export const getSingleUserStory = (userId) => async (dispatch) => {
  try {
    dispatch({ type: User_story_REQUEST });

    const { data } = await api.get(`/api/v3/story/stories/${userId}`);

    dispatch({ type: User_story_SUCCESS, payload: data.stories });
  } catch (error) {
    dispatch({ type: User_story_FAILURE, payload: error.response.data.message });
  }
};

export const allStory = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_STORY_REQUEST });

    const { data } = await api.get("/api/v3/story/stories");

    dispatch({ type: ALL_STORY_SUCCESS, payload: data.stories });
  } catch (error) {
    dispatch({ type: ALL_STORY_FAILURE, payload: error.response.data.message });
  }
};

export const storyUpload = (imageBase64,userId,comment) => async (dispatch) => {
  try {
    dispatch({ type: STORY_UPLOAD_REQUEST });

    const { data } = await api.post(
      "/api/v3/story/uploadstory",
      { image: imageBase64,userId,comment }, // Wrap the base64 string in an object
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: STORY_UPLOAD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: STORY_UPLOAD_FAILURE, payload: error.response.data.message });
  }
};
export const likeStory = (id) => async (dispatch) => {
  try {
      dispatch(likeRequest());
      const { data } = await api.get(`/api/v3/story/like/${id}`, {
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

// Example usage
const imageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...'; // Your base64 encoded image
storyUpload(imageBase64);