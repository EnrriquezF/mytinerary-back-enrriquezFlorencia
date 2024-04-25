const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email().min(10).max(254).required().messages({
        'string.email': "Please, enter a valid email address",
        'string.min': "Email must have at least 10 characters",
        'string.max': "Email must be at most 254 characters",
        'string.empty': "Please, enter your email",
        'any.required': "Please, enter your email"
    }),
    password: Joi.string().alphanum().min(6).max(30).required().messages({
        'string.alphanum': "Password must be alphanumeric",
        'string.min': "Password must have at least 6 characters",
        'string.max': "Password must be at most 30 characters",
        'string.empty': "Please, enter your password",
        'any.required': "Please, enter your password"
    })
})

const signUpSchema = Joi.object({
    name: Joi.string().min(2).max(20).required().messages({
        'string.min': "Your name must have at least 2 characters",
        'string.max': "Your name must be at most 20 characters",
        'string.empty': "Please, enter your name",
        'any.required': "Please, enter your name"
    }),
    lastName: Joi.string().min(2).max(20).required().messages({
        'string.min': "You lastname must have at least 2 characters",
        'string.max': "Your lastname must be at most 20 characters",
        'string.empty': "Please, enter your lastname",
        'any.required': "Please, enter your lastname"
    }),
    email: Joi.string().email().min(10).max(254).required().messages({
        'string.email': "Please, enter a valid email address",
        'string.min': "Email must have at least 10 characters",
        'string.max': "Email must be at most 254 characters",
        'string.empty': "Please, enter your email",
        'any.required': "Please, enter your email"
    }),
    password: Joi.string().alphanum().min(6).max(30).required().messages({
        'string.alphanum': "Password must be alphanumeric",
        'string.min': "Password must have at least 6 characters",
        'string.max': "Password must be at most 30 characters",
        'string.empty': "Please, enter your password",
        'any.required': "Please, enter your password"
    }),
    photoURL: Joi.string().min(6).max(255).messages({
        'string.min': "You photo URL must have at least 6 characters",
        'string.max': "Your photo URL must be at most 255 characters"
    }),
    country: Joi.string().min(4).max(56).messages({
        'string.min': "You country must have at least 4 characters",
        'string.max': "Your country must be at most 56 characters"
    }),
})

const verifyDataCity = (req, res, next) =>{
    let {name, country, description, image, alt } = req.body;

    if(!name || !country || !description || !image || !alt ) {
        return res.status(400).json({message: "invalid data"})
    }
    if( name == "" || country == "" || description == "" ||image == ""|| alt== ""){
        return res.status(400).json({message: "invalid data"})
    }
    next()
};

const verifyDataItinerary = (req, res, next) =>{
    let {name, price, duration } = req.body;

    if(!name || !price || !duration ) {
        return res.status(400).json({message: "invalid data"})
    }
    if( name == "" ){
        return res.status(400).json({message: "invalid data"})
    }
    next()
};

const verifyAuthData = (req, res, next) =>{
    const payload = req.body;
    const validatedUser = userSchema.validate(payload)

    if(validatedUser.error) {
        return res.status(401).json({ message: validatedUser.error.details.map((err)=> err.message)})
    }

    next()
}

const verifyAuthSignUpData = (req, res, next) =>{
    const payload = req.body;
    const validatedUser = signUpSchema.validate(payload)

    if(validatedUser.error) {
        return res.status(401).json({ message: validatedUser.error.details.map((err)=> err.message)})
    }

    next()
}
module.exports = {
    verifyDataCity,
    verifyDataItinerary,
    verifyAuthData,
    verifyAuthSignUpData
}