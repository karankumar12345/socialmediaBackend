const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/database');
const postRouter = require('./routes/post');
const userRouter=require("./routes/User");
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config({ path: 'SocialMediaB/config/config.env' });
const cloudinary = require("cloudinary");
const router = require('./routes/Story');

const app = express();

// Middleware

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
// Routes
app.use('/api/v1/post', postRouter);
app.use('/api/v2/user', userRouter);
app.use('/api/v3/story',router)

connectDb();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server started at Port ${PORT}`);
});
