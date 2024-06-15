const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary");
// Ensure you import necessary modules if required (like database models)
const createPost = async (req, res) => {
  try {
    // Get data from the request body
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "posts",
    });
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
    };

    const post = await Post.create(newPostData);

    const user = await User.findById(req.user._id);

    user.posts.unshift(post._id);
    

    await user.save();
    res.status(201).json({
      success: true,
      message: "Post created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const LikeandUnlike = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;



    const post = await Post.findById(postId);

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
};



const deletepost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    await cloudinary.v2.uploader.destroy(post.image.public_id);

    await post.deleteOne();

    const user = await User.findById(req.user._id);
    const index = user.posts.indexOf(req.params.id);
    if (index > -1) {
      user.posts.splice(index, 1);
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};
const getpostofollowing = async (req, res) => {
  try {
    // Fetch the user by ID
    const user = await User.findById(req.user._id);


    // Fetch posts where the owner is in the user's following list, and populate the owner field with only the ID
    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    }).populate("owner likes comments.user");

    // Return the posts in reverse order
    res.status(200).json({
      success: true,
   posts:posts.reverse()
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





const updateCaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    post.caption = req.body.caption;
    await post.save();
    res.status(200).json({
      success: true,
      message: "Post updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    let commentIndex = -1;

    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        commentIndex = index;
      }
    });

    if (commentIndex !== -1) {
      post.comments[commentIndex].comment = req.body.comment;
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Comment updated",
      });
    } else {
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Comment added",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteComment=async(req,res)=>{

  try {
    const post=await Post.findById(req.params.id);
 
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if(post.owner.toString()===req.user._id.toString){
      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
        return post.comments.splice(index,1);
        }
      });
      await post.save();

      return res.status(200).json({
        success:true,
        message:"Selected comment deleted "
      })
  


    }
    else{
      


    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
      return post.comments.splice(index,1);
      }
    });

  await post.save();

  res.status(200).json({
    success:false,
    message:"Your comment deleted "
  })
      
    }
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

}

const mypost=async(req,res)=>{
  try {
    const user=await User.findById(req.user._id)
    const posts=[];
    for(let i=0;i<user.posts.length;i++){
      const post=await Post.findById(user.posts[i]).populate("owner likes comments.user")
      posts.push(post);
    } 
    res.status(200).json({
      success:true,
      posts:posts
    })



    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
const getuserPosts =async(req,res)=>{

  try {
    const user=await User.findById(req.params.id)
    const posts=[];
    for(let i=0;i<user.posts.length;i++){
      const post=await Post.findById(user.posts[i]).populate("owner likes comments.user")
      posts.push(post);
    } 
    res.status(200).json({
      success:true,
      posts:posts
    })



    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

}
const getuserProfile =async(req,res)=>{

  try {
    const user = await User.findById(req.params.id).populate(
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


}


const unsaved = async (req, res) => {
  try {
      const user = await User.findById(req.user.id); // Assuming req.user contains the authenticated user
      const post = await Post.findById(req.params.postId); // The ID of the post to be unliked/unsaved
      if (!post) {
          return res.status(404).json({ message: 'Post not found' });
      }
      const index = user.likesave.indexOf(post._id);
      if (index === -1) {
          return res.status(400).json({ message: 'Post not found in saved list' });
      }
      user.likesave.splice(index, 1);
      await user.save();
      res.status(200).json({ message: 'unsaved successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports = {
  createPost,
  LikeandUnlike,
  deletepost,
  getpostofollowing,
  updateCaption,
  addComment,
  deleteComment,
  mypost,
  getuserPosts,
  getuserProfile

};
