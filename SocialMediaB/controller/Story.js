const cloudinary = require('cloudinary');
const Story = require('../models/Story');
const User = require('../models/User');

// Configure Cloudinary


// Upload Story Function
const uploadStory = async (req, res) => {
  try {
    const { image, userId, comment } = req.body;

    // Validate input data
    if (!image || !userId) {
      return res.status(400).json({ success: false, message: 'No image data or user ID provided' });
    }

    // Upload image to Cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(image, { folder: 'stories' });

    // Create new story data
    const newStoryData = {
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000), // Expires in 12 hours
      owner: userId,
      comment: comment || '', // Default to an empty string if comment is not provided
    };

    // Create new story document
    const story = await Story.create(newStoryData);

    // Find user and update their story array
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.stories.push(story._id);
    await user.save();

    // Respond with success message
    return res.status(201).json({ success: true, message: 'Story uploaded successfully', story });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};


// Fetch All Stories Function
const getAllStories = async (req, res) => {
  try {
    // Find users with non-expired stories
    const users = await User.find({ 'stories.expiresAt': { $gte: new Date() } })
      .select('name avatar stories')
      .populate({
        path: 'stories',
        match: { expiresAt: { $gte: new Date() } },
        select: 'image createdAt expiresAt'
      });

    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error('Failed to fetch stories:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch stories' });
  }
};

const getUserStories = async (req, res) => {
  try {
    const userId  = req.params.id;

    // Validate input data
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID not provided' });
    }

    const user = await User.findById(userId).populate({
      path: 'stories',
      populate: {
        path: 'owner',
        model: 'User'
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Respond with user's stories
    return res.status(200).json({ success: true, stories: user.stories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const likeStory =async(req,res)=>{
  try {
    const userId = req.user._id;
    const postId = req.params.id;



    const post = await Story.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Log the fetched post to debug its structure


    // Initialize likes if it is undefined
    if (!post.likes) {
      post.likes = [];
    }

    const hasLiked = post.likes.includes(userId);


    if (hasLiked) {


      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
   

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post unliked",
      });
    } else {


      post.likes.push(userId);


      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post liked",
      });
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred",
    });
  }

}

module.exports = {
  uploadStory,
  getAllStories,
  getUserStories,
  likeStory
};
