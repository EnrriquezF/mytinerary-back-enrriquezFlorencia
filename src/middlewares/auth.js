const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const {Strategy, ExtractJwt} = require('passport-jwt');
const passport = require('passport');
const env = require('dotenv').config();

const passportVerificator = passport.use(
    new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY
    }, async (payload, done)=> {
        try{
            let userFound = await User.findOne({email: payload.email})

            if(userFound){
                return done(null, userFound);
            } else {
                return done(null)
            }
            
        } catch(error){
            return done(error)
        }
    })
)

const hashPassword = (req, res, next) =>{
    try{
        const plainPassword = req.body.password
        const hashPassword = bcrypt.hashSync(plainPassword, 10)

        req.body.password = hashPassword

        next()
    } catch(err){
        res.status(500).json({error: err})
    }
}

const verifyPassword = (req, res, next) =>{
    const passwordPlain = req.body.password;

    const hashPassword = req.user.password;

    const isValid = bcrypt.compareSync(passwordPlain, hashPassword)

    if (isValid) {
        next()
    } else {
        res.status(400).json({message: "Wrong password."})
    }
}

const verifyUserExists = async (req, res, next) => {
    const { email } = req.body

    const userFound = await User.findOne({ email: email})

    if(userFound) {
        req.user = userFound

        next()
    } else {
        res.status(400).json({ message: "User not found."})
    }
}

const generateToken = async (req, res, next) =>{
    try {
        let secretKey = process.env.SECRET_KEY;
        let token = jwt.sign({email: req.user.email}, secretKey, {expiresIn: 60*5});
        req.token = token;
        next()
    } catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = { hashPassword, verifyPassword, verifyUserExists, generateToken, passportVerificator }