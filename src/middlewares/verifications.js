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
        'string.max': "Password must be at most 16 characters",
        'string.empty': "Please, enter your password",
        'any.required': "Please, enter your password"
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

module.exports = {
    verifyDataCity,
    verifyDataItinerary,
    verifyAuthData
}