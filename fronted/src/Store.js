// store.js
import { configureStore } from '@reduxjs/toolkit';
import {allUsersReducer,postOfFollowingReducer,userReducer} from './reducers/userReducer';


import  { Saved, comment, likeunlike, mypost, postcreate, userpost, } from './reducers/Postreducer';
import storyReducer from './reducers/story';
import { getuserProfile } from './reducers/postfollwing';







const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowing: postOfFollowingReducer,
        allUsers: allUsersReducer,
        like:likeunlike,
        comment:comment,
        mypost,mypost,
        createpost:postcreate,
        userprofile:getuserProfile,
        userpost:userpost,
        savepost:Saved,
        story:storyReducer
        
       
       
    },
});

export default store;
