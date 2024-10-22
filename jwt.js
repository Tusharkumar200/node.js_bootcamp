
const jwt = require('jsonwebtoken');


const jwtAuthMiddleware = (req, res, next) => {

    // first check if the header is present
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({error: "Token Not Found"});
    }

    // Extract the token from the header
    const token = req.headers.authorization.split(' ')[1];
    // Verify the token
    if(!token){
        return res.status(401).json({error: "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        
        return res.status(401).json({error: "Invalid token"});
    }
};

// Function to generate token
const generateToken = (userData)=>{
    return jwt.sign(userData, process.env.JWT_SECRET);
}


module.exports = {jwtAuthMiddleware,generateToken};