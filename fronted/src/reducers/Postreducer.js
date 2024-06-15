import { createReducer } from '@reduxjs/toolkit';
import {
    likeFailure, likeSuccess, likeRequest,
    commentFailure, commentSuccess, commentRequest,
    deletecommentFailure, deletecommentSuccess, deletecommentRequest,
    mypostFailure, mypostRequest, mypostSuccess,
    usertokenFailure,usertokenRequest,usertokenSuccess,
    userpostFailure, userpostRequest, userpostSuccess,
    followingRequest, followingSuccess, 
    userresetFailure,userresetSuccess,userresetRequest,
    followingFailure,
    CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE,
    clearError, clearMessage,
    UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE,
    DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE,
    savedFailure,savedRequest,savedSuccess,savedsFailure,savedsRequest,savedsSuccess

} from '../Actions/Post';

const initialState = {
    loading: false,

    posts: [],
    error: null,
    message: null,
    liked: false
};

// Like/Unlike Reducer
export const likeunlike = createReducer(initialState, (builder) => {
    builder
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
export const Saved = createReducer(initialState, (builder) => {
    builder
    .addCase(savedRequest, (state) => {
        state.loading = true;
    })
    .addCase(savedSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
    })
    .addCase(savedFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })

        .addCase(savedsRequest, (state) => {
            state.loading = true;
        })
        .addCase(savedsSuccess, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
            state.error = null;
        })
        .addCase(savedsFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("clearError", (state) => {
            state.error = null;
        })
        .addCase("clearMessage", (state) => {
            state.message = null;
        });
});
// Comment Reducer
export const comment = createReducer(initialState, (builder) => {
    builder
        .addCase(commentRequest, (state) => {
            state.loading = true;
        })
        .addCase(commentSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        })
        .addCase(commentFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deletecommentRequest, (state) => {
            state.loading = true;
        })
        .addCase(deletecommentSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        })
        .addCase(deletecommentFailure, (state, action) => {
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




// My Posts Reducer
export const mypost = createReducer(initialState, (builder) => {
    builder
        .addCase(mypostFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(mypostRequest, (state) => {
            state.loading = true;
        })
        .addCase(mypostSuccess, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
            state.error = null;
        })
     
        .addCase(followingRequest, (state) => {
            state.loading = true;
        })
        .addCase(followingSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        })
        .addCase(followingFailure, (state, action) => {
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

// Post Creation Reducer
export const postcreate = createReducer(initialState, (builder) => {
    builder
        .addCase(CREATE_POST_REQUEST, (state) => {
            state.loading = true;
        })
        .addCase(CREATE_POST_SUCCESS, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        })
        .addCase(CREATE_POST_FAILURE, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(clearError, (state) => {
            state.error = null;
        })
        .addCase(clearMessage, (state) => {
            state.message = null;
        })
        .addCase(UPDATE_POST_REQUEST, (state) => {
            state.loading = true;
        })
        .addCase(UPDATE_POST_SUCCESS, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        })
        .addCase(UPDATE_POST_FAILURE, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(DELETE_POST_REQUEST, (state) => {
            state.loading = true;
        })
        .addCase(DELETE_POST_SUCCESS, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        })
        .addCase(DELETE_POST_FAILURE, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    
});

//userprofile



export const userpost = createReducer(initialState, (builder) => {
    builder

    .addCase(userpostRequest, (state) => {
        state.loading = true;
    })
    .addCase(userpostSuccess, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
    })
    .addCase(userpostFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(usertokenRequest, (state) => {
        state.loading = true;
    })
    .addCase(usertokenSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
    })
    .addCase(userresetFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(userresetRequest, (state) => {
        state.loading = true;
    })
    .addCase(userresetSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
    })
    .addCase(usertokenFailure, (state, action) => {
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