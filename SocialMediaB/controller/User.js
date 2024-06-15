const User = require("../models/User");
const Post = require("../models/Post");
const { sendEmail } = require("../middlewares/SendEmail");
const cloudinary = require("cloudinary");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    let nametaken=await User.findOne({name})
    if (nametaken) {
      return res
        .status(400)
        .json({ success: false, message: "User Name Already  exists please Added some symbol" });
    }
    let user = await User.findOne({ email });
    
    if (user) {

      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });

    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const token = await user.generateToken();
    res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const followerUser = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const loggedInUser = await User.findById(req.user._id);
    
        if (!userToFollow) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
    
        if (loggedInUser.following.includes(userToFollow._id)) {
          const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
          const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id);
    
          loggedInUser.following.splice(indexfollowing, 1);
          userToFollow.followers.splice(indexfollowers, 1);
    
          await loggedInUser.save();
          await userToFollow.save();
    
          res.status(200).json({
            success: true,
            message: "User Unfollowed",
          });
        } else {
          loggedInUser.following.push(userToFollow._id);
          userToFollow.followers.push(loggedInUser._id);
    
          await loggedInUser.save();
          await userToFollow.save();
    
          res.status(200).json({
            success: true,
            message: "User followed",
          });
        }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const logoutUser = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()) })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select("+password");
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email, avatar } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    if (avatar) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
      user.avatar.public_id = myCloud.public_id;
      user.avatar.url = myCloud.secure_url;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const posts = user.posts;
        const followers = user.followers;
        const following = user.following;
        const userId = user._id;
    
        // Removing Avatar from cloudinary
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    
        await user.remove();
    
        // Logout user after deleting profile
    
        res.cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        });
    
        // Delete all posts of the user
        for (let i = 0; i < posts.length; i++) {
          const post = await Post.findById(posts[i]);
          await cloudinary.v2.uploader.destroy(post.image.public_id);
          await post.remove();
        }
    
        // Removing User from Followers Following
        for (let i = 0; i < followers.length; i++) {
          const follower = await User.findById(followers[i]);
    
          const index = follower.following.indexOf(userId);
          follower.following.splice(index, 1);
          await follower.save();
        }
    
        // Removing User from Following's Followers
        for (let i = 0; i < following.length; i++) {
          const follows = await User.findById(following[i]);
    
          const index = follows.followers.indexOf(userId);
          follows.followers.splice(index, 1);
          await follows.save();
        }
    
        // removing all comments of the user from all posts
        const allPosts = await Post.find();
    
        for (let i = 0; i < allPosts.length; i++) {
          const post = await Post.findById(allPosts[i]._id);
    
          for (let j = 0; j < post.comments.length; j++) {
            if (post.comments[j].user === userId) {
              post.comments.splice(j, 1);
            }
          }
          await post.save();
        }
        // removing all likes of the user from all posts
    
        for (let i = 0; i < allPosts.length; i++) {
          const post = await Post.findById(allPosts[i]._id);
    
          for (let j = 0; j < post.likes.length; j++) {
            if (post.likes[j] === userId) {
              post.likes.splice(j, 1);
            }
          }
          await post.save();
        }
    
        res.status(200).json({
          success: true,
          message: "Profile Deleted",
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
  }
};

const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "followers following"
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getAllUser = async (req, res) => {
  try {
    const users = await User.find({name:{$regex:req.query.name,$options:"i"}});
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getSingelUser = async (req, res) => {
    try {
        // Validate the user ID
        const userId = req.params.id;

    
        // Fetch the user and populate the fields
        const user = await User.findById(userId).populate('posts followers following');
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'User not found',
          });
        }
    
        // Respond with the user data
        res.status(200).json({
          success: true,
          user,
        });
      } catch (error) {
        // Log the error for debugging purposes
        console.error(error);
        
        // Respond with a server error
        res.status(500).json({
          success: false,
          message: 'Server error. Please try again later.',
        });
      }
};

const forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }
    
    const resetPasswordToken = user.getResetPasswordToken();
    await user.save();

    const resetUrl = `${req.protocol}://${req.get("host")}/api/v2/user/password/reset/${resetPasswordToken}`;
    const message = `Create a new password by clicking this link: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });
      return res.status(200).json({
        success: true,
        message: "Email has been sent.",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return res.status(500).json({
        success: false,
        message: "Email could not be sent.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = req.params.resettoken;
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired password reset token.",
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const savepost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id) // Assuming req.user contains the authenticated user
    const post = await Post.findById(req.params.postId); // The ID of the post to be liked/saved

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Ensure likesave array exists on the user
    if (!user.likesave) {
      user.likesave = [];
    }

    const postIndex = user.likesave.indexOf(post._id);
    
    if (postIndex !== -1) {
      // Remove the post ID from the user's likesave array
      user.likesave.splice(postIndex, 1);
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Post unsaved",
      });
    } else {
      // Add the post ID to the user's likesave array
      user.likesave.push(post._id);
      await user.save();


      return res.status(200).json({ message: 'Post saved successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const SavedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('likesave');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Populate likes and comments for each post in the likedSavedPosts array
    const populatedPosts = await Promise.all(user.likesave.map(async (post) => {
      return await Post.findById(post._id)
      .populate({
        path: 'comments',
        populate: { path: 'user' } // Populate all user details for each comment
      })
    
        .populate('likes owner');
    }));

    res.status(200).json({ likedSavedPosts: populatedPosts });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};





module.exports = {
  register,
  login,
  followerUser,
  logoutUser,
  updatePassword,
  updatProfile,
  deleteMe,
  myProfile,
  getAllUser,
  getSingelUser,
  forgetPassword,
  resetPassword,
savepost,

SavedPosts,

};
