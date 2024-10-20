const rateLimit = require('express-rate-limit');

module.exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limite de 5 tentatives par IP pendant cette période
    message: "Trop de tentatives de connexion, veuillez réessayer dans 15 minutes.",
    headers: true, // Inclut les headers de rate limit
});

module.exports.protect = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, ACCESS_TOKEN);
        const userId = decodedToken.userId;
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