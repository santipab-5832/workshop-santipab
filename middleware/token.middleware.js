const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    try{
        let token = req.headers.authorization;
        if (!token) return res.status(401).send("Invalid Token");
        
        let decode = jwt.verify(token, secret)
        req.auth = decode;
        next();
    } catch (error){
        res.status(401).send("Unauthorize")
    }
};

const isAdmin = (req, res, next) => {
    if (req.auth.role !== 'admin') {
        return res.status(403).send("Admin only!");
    }
    next();
};

module.exports = { verifyToken, isAdmin };