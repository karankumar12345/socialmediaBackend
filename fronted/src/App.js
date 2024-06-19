import React, { useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import {Toaster} from "react-hot-toast"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
// import { loadUser } from './Actions/User';
import Home from './components/Home/Home';
import Account from './components/Account/Account';
import Newpost from './components/NewPost/Newpost';
import Register from './components/Register/Register';
import UpdatePassword from './components/updatepassword/Password';
import Profile from './components/Profile/Profile';
import Forget from './components/forgetpassword/Forget';
import UserProfile from './components/Comments/Userprofile/UserProfile';
import Search from './components/Search/Search';
import NotFound from './components/NotFound/NotFound';
import ResetPassword from './components/ResetPassword/ResetPassword';
import SavePost from './components/SavedPost/SavePost';
import UserStory from './components/Story/UserStory';
import StoryComponent from './components/Story/Story';
import Found from './components/NotFound/Found';
import { getAllUsers, loadUser } from './Actions/User';


function App() {
const dispatch = useDispatch();
useEffect(()=>{
  dispatch(loadUser())
  dispatch(getAllUsers())
 
 
  
  
},[])
const { isAuthenticated }= useSelector((state)=>state.user)
  return (
    <>
      <Router>
<Toaster/>

    
        {
          isAuthenticated && <Header />
        }
    
        <Routes>
         
        <Route path="/" element={isAuthenticated?<Home/>:<Login/>} />
       <Route path="/profile" element={isAuthenticated ? <Account /> : <Login />} />
          <Route path="/login"element={isAuthenticated ? <Home /> : <Login />} />
          <Route path="/newpost" element={isAuthenticated ? <Newpost /> : <Login />} />
          <Route path='/register' element={isAuthenticated ? <Account /> : <Register />}/>
         <Route path='/update/password' element={isAuthenticated ?<UpdatePassword/>: <Login />}/>
         <Route path='/forgot/password' element={isAuthenticated ?<Forget/>: <Login />}/>
          <Route path='/update/profile' element={isAuthenticated ? <Profile/> : <Login />}/>
          <Route path='/user/:id' element={isAuthenticated ?<UserProfile/> : <Login />}/>
          <Route path='/search' element={isAuthenticated ?<Search/> : <Login />}/>
          <Route path='/savepost' element={isAuthenticated ?<SavePost/> : <Login />}/>
          <Route path='/stories/:id' element={isAuthenticated ?<UserStory/> : <Login />}/>
         <Route path="/stories" element={isAuthenticated?<StoryComponent/>:<Login/>}/>
          <Route
          path="/password/reset/:token"
          element={isAuthenticated ? <UpdatePassword /> : <ResetPassword />} 
         

          />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
