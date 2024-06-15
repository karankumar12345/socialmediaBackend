const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAuthenticated = async (req, res, next) => {
    try {
        // Ensure req.cookies is not undefined
  

        const { token } = req.cookies;

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by decoded._id
        req.user = await User.findById(decoded._id);

        if (!req.user) {
            return res.status(401).json({
                message: 'User not found',
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    isAuthenticated,
};
