const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  image: {
    public_id: String,
    url: String
  },

  createdAt: {
    type: Date,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  comment:{
    type:String,
    required:true
  
  },
  
  likes: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
],

});

module.exports = mongoose.model("Story", storySchema);
