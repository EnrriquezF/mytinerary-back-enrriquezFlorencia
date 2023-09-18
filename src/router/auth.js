const express = require('express')
const { register, login, authenticated, logout} = require('../controllers/usersController')
const { verifyAuthData, verifyAuthSignUpData } = require('../middlewares/verifications')
const { hashPassword, verifyPassword, verifyUserExists, generateToken, passportVerificator } = require('../middlewares/auth')

const authRouter = express.Router()

authRouter.post('/register', verifyAuthSignUpData, hashPassword, register)
authRouter.post('/login', verifyAuthData, verifyUserExists, verifyPassword, generateToken, login)
authRouter.post('/authenticated', passportVerificator.authenticate( "jwt", {session: false} ), generateToken, authenticated)
authRouter.post('/logout', passportVerificator.authenticate( "jwt", {session: false} ), logout)

module.exports = authRouter