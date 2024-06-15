
import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    loading: false,
    posts: [],
    error: null,
    
};

const postoffollowingSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postofFollowingRequest: (state) => {
            state.loading = true;
        },
        postofFollowingSuccess: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
          
        },
        postofFollowingFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          
        },
        clearErrors: (state) => {
            state.error = null;
        },
        //like reducer
      
    },
});

export const {
    postofFollowingRequest,
    postofFollowingSuccess,
    postofFollowingFailure,
    clearErrors,
   
} = postoffollowingSlice.actions;

export default postoffollowingSlice.reducer;