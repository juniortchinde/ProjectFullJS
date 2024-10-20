const jwt = require('jsonwebtoken');
const UserToken = require('../Models/UserToken.model');
const verifyRefreshToken = require('../utils/verifyRefreshToken')


module.exports.refreshToken = async (req, res) =>{
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({
                error : true,
                message : "Refresh Token not found "
            })
        }
        const { tokenDetails } = await verifyRefreshToken(refreshToken)
        const payload = {_id : tokenDetails._id}
        const accessToken = jwt.sign(
            payload, process.env.ACCESS_TOKEN,
            { expiresIn: '15m'}
        )
        res.status(200).json({
            error: false,
            accessToken,
            message: "Access token created successfully",
        });
    } catch (err) {
        console.error(err)
        res.status(400).json({ error: true, message: err.message });
    }
}  

module.exports.logout = async (req, res) =>{
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({
                error : true,
                message : "Refresh Token not found "
            })
        }
        
        const userToken = await UserToken.findOne({token : refreshToken})
        if(!userToken){
            return res
                .status(200)
                .json({ error: false, message: "Logged Out Sucessfully" });
        }

        await UserToken.deleteOne({_id: userToken._id})
        res.clearCookie("refreshToken", {
            httpOnly: true,
            //secure: true,  // Utiliser en production
            sameSite: "strict"
        });
        res.status(200).json({ error: false, message: "Logged Out Sucessfully" });

    } catch (err) {
        res.status(400).json({ error: true, message: err.message });
    }
}