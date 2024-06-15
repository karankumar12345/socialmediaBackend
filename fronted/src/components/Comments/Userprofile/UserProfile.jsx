import React, { useEffect, useState } from 'react';
import "../../Account/account.css";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Avatar, Typography, Button, Dialog } from '@mui/material';
import { useParams } from 'react-router-dom';
import { followUser, getMyPosts, userPost } from '../../../Actions/Post';
import { userProfile } from '../../../Actions/User';
import Loader from '../../Loader/Loader';
import Post from '../../post/Post';
import USer from '../../User/USer';

function UserProfile() {
    const dispatch = useDispatch();
    const { id: userId } = useParams();

    const { user: me } = useSelector((state) => state.user);
    const {
        user,
        posts: userPosts = [],
        loading: userLoading,
        error: userError,
        message,
    } = useSelector((state) => ({
        user: state.userprofile.user,
        posts: state.userpost.posts,
        
        loading: state.userprofile.loading || state.userpost.loading,
        error: state.userprofile.error || state.userpost.error,
        message: state.mypost.message || state.userpost.message,
    }));

    const {message:likeme}=useSelector((state=>state.like))
    const {message:comment}=useSelector((state=>state.comment))

    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);
    const [following, setFollowing] = useState(false);
    const [myProfile, setMyProfile] = useState(false);

    const handleFollow = async () => {
        await dispatch(followUser(userId));
        dispatch(userProfile(userId));
        setFollowing(!following);
    };

    useEffect(() => {
        if (userError) toast.error(userError);

        if (message) toast.success(message);
      


        return () => {
            dispatch({ type: "clearMessage" });
        };
    }, [userError, message, dispatch]);

    useEffect(() => {
        dispatch(userPost(userId));
        dispatch(userProfile(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        if (me && me._id === userId) {
            setMyProfile(true);
        } else {
            setMyProfile(false);
        }

        if (user && me) {
            const isFollowing = user.followers.some((follower) => follower._id === me._id);
            setFollowing(isFollowing);
        }
    }, [user, me, userId]);
 
    return userLoading ? (
        <Loader />
    ) : (
        <div className="account">
            <div className="accountleft">
                {userPosts && userPosts.length > 0 ? (
                    userPosts.map((post) => post && post._id && (
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
                            isAccount={false}
                            isDelete={false}
                        />
                    ))
                ) : (
                    <Typography>No Posts</Typography>
                )}
            </div>
            <div className="accountright">
                {user && (
                    <>
                        <Avatar src={user.avatar?.url} sx={{ height: '8vmax', width: '8vmax' }} />
                        <Typography variant="h5">{user.name}</Typography>

                        <div>
                            <button onClick={() => setFollowersToggle(!followersToggle)}>
                                <Typography>Followers</Typography>
                                <Typography>{user.followers?.length}</Typography>
                            </button>
                        </div>
                        <div>
                            <button onClick={() => setFollowingToggle(!followingToggle)}>
                                <Typography>Following</Typography>
                                <Typography>{user.following?.length}</Typography>
                            </button>
                        </div>
                        <div>
                            <Typography>Posts</Typography>
                            <Typography>{userPosts?.length}</Typography>
                        </div>
                        {!myProfile && (
                            <Button variant="contained" onClick={handleFollow}>
                                {following ? "Unfollow" : "Follow"}
                            </Button>
                        )}

                        <Dialog open={followersToggle} onClose={() => setFollowersToggle(false)}>
                            <div className="DialogBox">
                                <Typography variant="h4">Followers</Typography>
                                {user.followers && user.followers.length > 0 ? user.followers.map((follower) => (
                                    <USer
                                        key={follower._id}
                                        userId={follower._id}
                                        name={follower.name}
                                        avatar={follower.avatar?.url}
                                    />
                                )) : <Typography style={{ margin: '2vmax' }}>You have no followers</Typography>}
                            </div>
                        </Dialog>

                        <Dialog open={followingToggle} onClose={() => setFollowingToggle(false)}>
                            <div className="DialogBox">
                                <Typography variant="h4">Following</Typography>
                                {user.following && user.following.length > 0 ? user.following.map((following) => (
                                    <USer
                                        key={following._id}
                                        userId={following._id}
                                        name={following.name}
                                        avatar={following.avatar?.url}
                                    />
                                )) : <Typography style={{ margin: '2vmax' }}>You have no following</Typography>}
                            </div>
                        </Dialog>
                    </>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
