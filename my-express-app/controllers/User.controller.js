const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");

const generateTokens = require("../utils/generateToken.js");
const {
    signUpBodyValidation,
    logInBodyValidation,
} = require("../utils/validationSchema.js");


module.exports.signup = async (req, res, next) => {
    try {
        const { error } = signUpBodyValidation(req.body);
        if (error) {
            return res
                .status(400)
                .json({ error: true, message: error.details[0].message });
        }
        const { firstname, lastname, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user){
            return res
                .status(400)
                .json({ error: true, message: "User with given email already exist" });
        }
        const salt = bcrypt.genSaltSync(Number(process.env.SALT));
        const hash = bcrypt.hashSync(password, salt);

        await new User({
            firstname,
            lastname,
            email,
            password: hash,
        }).save();
        res
            .status(201)
            .json({ error: false, message: "Account created sucessfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};

module.exports.login = async(req, res, next) => {

    try{
        const {error} = logInBodyValidation(req.body);
        if(error){
            return res
                .status(400)
                .json({ error: true, message: error.details[0].message });
        }
        const { email, password } = req.body;
        const user = await User.findOne({email})
        
        if(!user){
            return res
                .status(401)
                .json({ error: true, message: "Invalid email or password" });
        }
        const verifiedPassword = bcrypt.compareSync(password, user.password);
        if(!verifiedPassword){
            return res
                .status(401)
                .json({ error: true, message: "Invalid email or password" });
        }
        const {accessToken, refreshToken} = await generateTokens(user)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,      // Non accessible via JavaScript
            secure: true,        // Seulement envoyé via HTTPS
            sameSite: 'Strict',  // Empêche les envois cross-origin
            maxAge: 30 * 24 * 60 * 60 * 1000, // Expire après 7 jours
        });

        res.status(200).json({
            error: false,
            accessToken,
            message: "Logged in successfully",
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};
