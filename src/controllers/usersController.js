const { verifyPassword } = require("../middlewares/auth")
const User = require("../models/User")

const register = async (req, res) =>{
    try{
        const payload = req.body
        const userExists = await User.findOne({email : payload.email})

        if(userExists) {
            return res.status(403).json({message: "User already exists."},)
        }

        const userCreated = await User.create(payload)

        res.status(200).json({
            message: "User created successfully",
            newUser: userCreated
        })
    }catch(err) {
        res.status(400).json({message: err})
    }
    
}

const login = async (req, res) => {
    try{
        res.status(200).json({
            message: "Successfully logged in",
            token: req.token,
            user: {
                email: req.user.email,
                id: req.user.id,
                name: req.user.name,
                lastname: req.user.lastName,
                country: req.user.country
            }
        })
    } catch(err){
        res.status(400).json({message: err})
    }
}

const authenticated = async (req, res) =>{
    try{
        res.status(200).json({
            message: "Successfully authenticated",
            token: req.token,
            user: {
                email: req.user.email,
                id: req.user.id
            }
        })
    } catch(err){
        res.status(400).json({message: err})
    }
}

const logout = async (req, res) => {
    try{
        res.status(200).json({message: 'logged out', token: req.token})
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { register, login, authenticated, logout }