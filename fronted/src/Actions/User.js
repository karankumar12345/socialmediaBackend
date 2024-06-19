import axios from 'axios';


// Action types
export const LOGIN_REQUEST = "user/LoginRequest";
export const LOGIN_SUCCESS = "user/LoginSuccess";
export const LOGIN_FAILURE = "user/LoginFailure";
export const REGISTER_REQUEST = "user/RegisterRequest";
export const REGISTER_SUCCESS = "user/RegisterSuccess";
export const REGISTER_FAILURE = "user/RegisterFailure";
export const LOAD_USER_REQUEST = "user/LoadUserRequest";
export const LOAD_USER_SUCCESS = "user/LoadUserSuccess";
export const LOAD_USER_FAILURE = "user/LoadUserFailure";
export const USER_REQUEST = "user/UPDATEUserRequest";
export const USER_SUCCESS = "user/UPDATEUserSuccess";
export const USER_FAILURE = "user/UPDATEUserFailure";
export const PASSWORD_USER_REQUEST = "user/PASSWORDUserRequest";
export const PASSWORD_USER_SUCCESS = "user/PASSWORDUserSuccess";
export const PASSWORD_USER_FAILURE = "user/PASSWORDUserFailure";
export const DELETE_USER_REQUEST = "user/DELETEUserRequest";
export const DELETE_USER_SUCCESS = "user/DELETEUserSuccess";
export const DELETE_USER_FAILURE = "user/DELETEUserFailure";
export const UPDATE_USER_REQUEST = "user/UPDATEUserRequest";
export const UPDATE_USER_SUCCESS = "user/UPDATEUserSuccess";
export const UPDATE_USER_FAILURE = "user/UPDATEUserFailure";
export const LOGOUT_USER_REQUEST = "user/LogoutUserRequest";
export const LOGOUT_USER_SUCCESS = "user/LogoutUserSuccess";
export const LOGOUT_USER_FAILURE = "user/LogoutUserFailure";
export const POST_OF_FOLLOWING_REQUEST = "posts/PostOfFollowingRequest";
export const POST_OF_FOLLOWING_SUCCESS = "posts/PostOfFollowingSuccess";
export const POST_OF_FOLLOWING_FAILURE = "posts/PostOfFollowingFailure";
export const ALL_USERS_REQUEST = "users/AllUsersRequest";
export const ALL_USERS_SUCCESS = "users/AllUsersSuccess";
export const ALL_USERS_FAILURE = "users/AllUsersFailure";
export const USERS_P_REQUEST = "users/UserPROFILERequest";
export const USERS_P_SUCCESS = "users/UserPROFILESuccess";
export const USERS_P_FAILURE = "users/UserPROFILEFailure";
export const CLEAR_ERRORS = "ClearErrors";

const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    'Content-Type': 'application/json',


  },
  withCredentials: true // Add this line
});

// Action creators
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const response = await api.post("/api/v2/user/login", { email, password });
    const { data } = response;

    if (data) {
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } else {
      throw new Error("No data found in response");
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const response = await api.post("/api/v2/user/register", userData);
    const { data } = response;

    if (data) {
      dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    } else {
      throw new Error("No data found in response");
    }
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const response = await api.get("/api/v2/user/me");
    const { data } = response;

    if (data) {
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } else {
      throw new Error("No data found in response");
    }
  } catch (error) {
    dispatch({ type: LOAD_USER_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_REQUEST });

    await api.get("/api/v2/user/logout");

    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({ type: POST_OF_FOLLOWING_REQUEST });

    const response = await api.get("/api/v1/post/posts");
    const { data } = response;

    if (data) {
      dispatch({ type: POST_OF_FOLLOWING_SUCCESS, payload: data.posts });
    } else {
      throw new Error("No data found in response");
    }
  } catch (error) {
    dispatch({ type: POST_OF_FOLLOWING_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const getAllUsers = (name = "") => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const response = await api.get(`/api/v2/user/users?name=${name}`);
    const { data } = response;

    if (data) {
      dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } else {
      throw new Error("No data found in response");
    }
  } catch (error) {
    dispatch({ type: ALL_USERS_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: PASSWORD_USER_REQUEST });

    const response = await api.put("/api/v2/user/update/passowrd", { oldPassword, newPassword });
    const { data } = response;

    if (data) {
      dispatch({ type: PASSWORD_USER_SUCCESS, payload: data.message });
    } else {
      throw new Error("No data found in response");
    }
  } catch (error) {
    dispatch({ type: PASSWORD_USER_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const response = await api.put("/api/v2/user/update/profile", userData);
    const { data } = response;

    if (data) {
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.message });
    } else {
      throw new Error("No data found in response");
    }
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const DELETE = () => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const response = await api.delete("/api/v2/user/delete/me");
    const { data } = response;

    if (data) {
      dispatch({ type: DELETE_USER_SUCCESS, payload: data.message });
    } else {
      throw new Error("No data found in response");
    }
  } catch (error) {
    dispatch({ type: DELETE_USER_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const userProfile = (id) => async (dispatch) => {
  try {
    dispatch({ type: USERS_P_REQUEST });

    const response = await api.get(`/api/v2/user/user/${id}`);
    const { data } = response;

    if (data) {
      dispatch({ type: USERS_P_SUCCESS, payload: data.user });
    } else {
      throw new Error("No data found in response");
    }
  } catch (error) {
    dispatch({ type: USERS_P_FAILURE, payload: error.response?.data?.message || error.message });
  }
};
