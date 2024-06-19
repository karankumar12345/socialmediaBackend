import { createReducer } from "@reduxjs/toolkit";
import {
  STORY_UPLOAD_REQUEST,
  STORY_UPLOAD_SUCCESS,
  STORY_UPLOAD_FAILURE,
  ALL_STORY_REQUEST,
  ALL_STORY_SUCCESS,
  ALL_STORY_FAILURE,
  User_story_REQUEST,
  User_story_SUCCESS,
  User_story_FAILURE,
  likeFailure, likeSuccess, likeRequest,
  clearError, clearMessage,
} from "../Actions/story";

const initialState = {
  loading: false,
  stories: [],
  error: null,
  message: null,
  status:'idle'
};

const storyReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ALL_STORY_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(ALL_STORY_SUCCESS, (state, action) => {
      state.loading = false;
      state.stories = action.payload;
      state.error = null;
    })
    .addCase(ALL_STORY_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(STORY_UPLOAD_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(STORY_UPLOAD_SUCCESS, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    })
    .addCase(STORY_UPLOAD_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(User_story_REQUEST, (state) => {
      state.loading = true;
      state.status = 'loading';
    })
    .addCase(User_story_SUCCESS, (state, action) => {
      state.loading = false;
      state.stories = action.payload;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(User_story_FAILURE, (state, action) => {
      state.loading = false;
      state.status = 'failed';
      state.error = action.payload;
    })
    .addCase(likeRequest, (state) => {
      state.loading = true;
  })
  .addCase(likeSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.liked = action.payload.liked;
      state.error = null;
  })
  .addCase(likeFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
  })
  .addCase(clearError, (state) => {
      state.error = null;
  })
  .addCase(clearMessage, (state) => {
      state.message = null;
  });
});

export default storyReducer;