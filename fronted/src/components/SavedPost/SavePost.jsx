import React, { useEffect } from 'react';
import "./savepost.css";
import { useDispatch, useSelector } from 'react-redux';
import { saveds } from '../../Actions/Post';
import Loader from '../Loader/Loader';
import Post from '../post/Post';

function SavePost() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const { posts: userspost = [], loading: usersLoading, error: userErrorpost } = useSelector(
        (state) => state.savepost || {}
    );
    

    useEffect(() => {
        dispatch(saveds());
    }, [dispatch]);

    if (usersLoading) {
        return <Loader />;
    }

    return (
        <div className="accountleft">
            {userspost && userspost.length > 0 ? (
                userspost.map(post => 
                    post && post._id ? (
                        <Post
                            key={post._id}
                            postId={post._id}
                            
                            caption={post.caption}
                            postImage={post.image?.url || 'placeholder.jpg'}
                            likes={post.likes} // Assuming likes is an array of users who liked the post
                            comments={post.comments}
                            ownerImage={post.owner?.avatar?.url}
                            ownerName={post.owner?.name || 'Unknown'}
                            ownerId={post.owner?._id}
                            isAccount={true}
                            isDelete={true}
                        />
                    ) : null
                )
            ) : (
                <p>No Saved Posts</p>
            )}
        </div>
    );
}

export default SavePost;
