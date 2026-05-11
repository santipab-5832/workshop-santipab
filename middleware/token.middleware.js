const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    try{
        let token = req.headers.authorization;
        if (!token) return res.status(401).send("Invalid Token");
        
        let decode = jwt.verify(token, secret)
        req.auth = decode;
        next();
    } catch (error){
        res.status(401).send("Unauthorize")
    }
}