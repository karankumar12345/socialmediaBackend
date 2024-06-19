import { createReducer } from "@reduxjs/toolkit";
import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, 
  LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, 
  LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE, 
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, 
  PASSWORD_USER_REQUEST, PASSWORD_USER_SUCCESS, PASSWORD_USER_FAILURE, 
  CLEAR_ERRORS ,POST_OF_FOLLOWING_FAILURE,POST_OF_FOLLOWING_REQUEST,POST_OF_FOLLOWING_SUCCESS,ALL_USERS_FAILURE,ALL_USERS_REQUEST,ALL_USERS_SUCCESS,
  DELETE_USER_FAILURE,DELETE_USER_REQUEST,DELETE_USER_SUCCESS,
  USERS_P_FAILURE,USERS_P_REQUEST,USERS_P_SUCCESS
} from '../Actions/User';

const initialState = {
  loading: false,
  user: null,
  users:null,
  isAuthenticated: false,
  error: null,
  message: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(LOGIN_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(LOGIN_SUCCESS, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    })
    .addCase(LOGIN_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase(REGISTER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(REGISTER_SUCCESS, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    })
    .addCase(REGISTER_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase(LOAD_USER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(LOAD_USER_SUCCESS, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    })
    .addCase(LOAD_USER_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase(LOGOUT_USER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(LOGOUT_USER_SUCCESS, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    })
    .addCase(LOGOUT_USER_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(UPDATE_USER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(UPDATE_USER_SUCCESS, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    })
    .addCase(UPDATE_USER_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(PASSWORD_USER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(PASSWORD_USER_SUCCESS, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    })
    .addCase(PASSWORD_USER_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(DELETE_USER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(DELETE_USER_SUCCESS, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    })
    .addCase(DELETE_USER_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS, (state) => {
      state.message = null;
    })

});


export const postOfFollowingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(POST_OF_FOLLOWING_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(POST_OF_FOLLOWING_SUCCESS, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.error = null; // Clear error on successful post retrieval
    })
    .addCase(POST_OF_FOLLOWING_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export const allUsersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ALL_USERS_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(ALL_USERS_SUCCESS, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null; // Clear error on successful user retrieval
    })
    .addCase(ALL_USERS_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
export const getuserProfile = createReducer(initialState, (builder) => {
  builder
    .addCase(USERS_P_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(USERS_P_SUCCESS, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null; // Clear error on successful user retrieval
    })
    .addCase(USERS_P_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

