const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
module.exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limite de 5 tentatives par IP pendant cette période
    message: "Trop de tentatives de connexion, veuillez réessayer dans 15 minutes.",
    headers: true, // Inclut les headers de rate limit
});

module.exports.protect = (req, res, next) =>{
    try{
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            return res.status(401).json({
                error: true,
                message: "Authorization header missing or malformed",
            });
        }
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN);
        console.log(decodedToken);
        const userId = decodedToken._id;
        req.auth = {
            userId : userId
        };
        next()
    }
    catch(err){
        res.status(401).json({
            err : true, 
            message: "Not authorized, invalid token" })
    }
}