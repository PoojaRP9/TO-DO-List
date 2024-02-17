const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function verifyToken(req, res, next) {
    try {
        const token = req.cookies['token'];
        
        if (!token) {
            throw "Token is missing";
        }
        
        const tokenVerify = jwt.verify(token, "Nodejs_secret_key");
        
        if (!tokenVerify) {
            throw "Invalid token";
        }

        req.user = await User.findById(tokenVerify._id);
        
        if (!req.user) {
            throw "User not found";
        }

        next();
    } catch (error) {
        // Pass the error to the error handling middleware
        next(error);
    }
}

module.exports = verifyToken;
