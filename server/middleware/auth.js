const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
    //Get token from header
    const token = req.header('x-auth-token');

    //check if not token
    if(!token){
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    //decode user authorization with correct secret key
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        //the user logging in is the token that matches
        req.user = decoded.user
        //move on to the next piece of middleware
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token not valid" })
    }
}