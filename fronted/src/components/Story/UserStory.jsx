import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { allStory, getSingleUserStory, likeStory } from '../../Actions/story';


import "./useStory.css"
function UserStory() {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const { stories = [], status, error } = useSelector((state) => state.story);
  const { id: userId } = useParams();

  useEffect(() => {
    if (userId) {
      dispatch(allStory());
      dispatch(getSingleUserStory(userId));
  
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (stories.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
      }, 15000); // Change the image every 10 seconds

      return () => clearInterval(interval);
    }
  }, [stories]);


  if (status === 'loading') {
    return <div>Loading stories...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (stories.length === 0) {
    return <div>No stories available</div>;
  }

  return (
    <div className='story' style={{ maxWidth: '600px', margin: '0 auto ' }}>
      
      {stories.length > 0 && (
        <>
          <div className='story' style={{ position: 'relative', textAlign: 'center', color: 'white' }}>
          
            <img src={stories[currentIndex]?.image?.url} alt="Story" style={{ width: '100%', height: 'auto' }} />

            <div className='para' style={{
              position: 'absolute',
              bottom: '8px',
              left: '16px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '10px',
              borderRadius: '5px'
            }}>
              <p   style={{ margin: 0 }}>{stories[currentIndex]?.comment}</p>
        
            </div>
       
          </div>
        </>
      )}

    </div>
  );
}

export default UserStory;
