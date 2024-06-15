import React, { useEffect, useState } from 'react';
import "./account.css";
import { useDispatch, useSelector } from 'react-redux';
import { getMyPosts } from '../../Actions/Post';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import Post from '../post/Post';
import USer from '../User/USer';
import { Avatar, Button, Typography, Dialog, colors } from '@mui/material';
import { Link } from 'react-router-dom';
import { logoutUser, DELETE, loadUser } from '../../Actions/User';


const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div style={modalStyles}>
            <div style={modalContentStyles}>
                <p>{message}</p>
                <button onClick={onConfirm} style={buttonStyles}>Yes</button>
                <button onClick={onCancel} style={buttonStyles}>No</button>
            </div>
        </div>
    );
};

function Account() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [isModalOpen, setModalOpen] = useState(false);
    const [followerstoggle, setFollowerstoggle] = useState(false);
    const [followingtoggle, setFollowingtoggle] = useState(false);

    const { posts: userspost = [], loading: usersLoading, error: userErrorpost } = useSelector(
        (state) => state.mypost || {}
    );



    useEffect(() => {
        dispatch(getMyPosts());
    }, [dispatch]);

    const handleLogout =async () => {
      await  dispatch(logoutUser());
      
        toast.success("Logout Successfully user");
    };

    const handleDelete = () => {
        setModalOpen(true);
    };  

    const handleConfirm =async () => {
       await dispatch(DELETE());

        toast.success("Deleted user successfully");
        dispatch(logoutUser())
        usersLoading=false
        setModalOpen(false);
    };

    const handleCancel = () => {
        setModalOpen(false);
        window.location.href = "/profile";
    };

    return usersLoading ? (
        <Loader />
    ) : (
        <div className="account">
            <div className="accountleft">
              
                {userspost && userspost.length > 0 ? (
                    userspost.map(post => 
                        post && post._id ? (
                            <Post
                                key={post._id}
                                postId={post._id}
                                caption={post.caption}
                                postImage={post.image?.url}
                                likes={post.likes}
                                comments={post.comments}
                                ownerImage={post.owner?.avatar?.url}
                                ownerName={post.owner?.name}
                                ownerId={post.owner?._id}
                                isAccount={true}
                                isDelete={true}
                            />
                        ) : null
                    )
                ) : (
                    <p>No Posts</p>
                )}
            </div>
            <div className="accountright">
                <Avatar 
                    src={user.avatar.url}
                    sx={{ height: '8vmax', width: '8vmax' }}
                />
                <Typography variant="h5">{user.name}</Typography>

                <div>
                    <button onClick={() => setFollowerstoggle(!followerstoggle)}>
                        <Typography>Followers</Typography>
                        <Typography>{user.followers.length}</Typography>
                    </button>
                </div>
                <div>
                    <button onClick={() => setFollowingtoggle(!followingtoggle)}>
                        <Typography>Following</Typography>
                        <Typography>{user.following.length}</Typography>
                    </button>
                </div>
                <div>
                    <Typography>Posts</Typography>
                    <Typography>{user.posts.length}</Typography>
                </div>
                <Link to="/login"> 
                    <Button variant="contained" onClick={handleLogout}>Logout</Button>
                </Link>
                <Link to="/update/profile">Edit Profile</Link>
                <Link to="/update/password">Change Password</Link>
                <Button variant="contained" onClick={handleDelete}>Delete Account</Button>
                <Link to="/savepost">Saved Post</Link>
                <ConfirmModal 
                    isOpen={isModalOpen} 
                    message="Are you sure you want to delete your account?" 
                    onConfirm={handleConfirm} 
                    onCancel={handleCancel} 
                />

                <Dialog open={followerstoggle} onClose={() => setFollowerstoggle(false)}>
                    <div className="DialogBox">
                        <Typography variant="h4">Followers</Typography>
                        {user && user.followers.length > 0 ? user.followers.map((follower) => (
                            <USer
                                key={follower._id}
                                userId={follower._id}
                                name={follower.name}
                                avatar={follower.avatar.url}
                            />
                        )) : <Typography style={{ margin: '2vmax' }}>You have no followers</Typography>}
                    </div>
                </Dialog>

                <Dialog open={followingtoggle} onClose={() => setFollowingtoggle(false)}>
                    <div className="DialogBox">
                        <Typography variant="h4">Following</Typography>
                        {user && user.following.length > 0 ? user.following.map((following) => (
                            <USer
                                key={following._id}
                                userId={following._id}
                                name={following.name}
                                avatar={following.avatar.url}
                            />
                        )) : <Typography style={{ margin: '2vmax' }}>You have no following</Typography>}
                    </div>
                </Dialog>
            </div>
        </div>
    );
}

// Inline styles for the modal
const modalStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const modalContentStyles = {
    backgroundColor: 'blue',
    color:'red',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center'
};

const buttonStyles = {
    margin: '5px',
    backgroundColor:'black',
    color:'white',
    borderRadius:'5px',
    width:'40px',
    height:'40px',
    '&:hover': {
        backgroundColor: 'red',
        color:'black'
    }

};

export default Account;
