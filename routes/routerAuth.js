import express from 'express'

// functions
import signupFunction from '../controllers/routeAuthfunctions/signup.js'
import verifyEmailFunction from '../controllers/routeAuthfunctions/verifyEmail.js'
import loginFunction from '../controllers/routeAuthfunctions/logIn.js'
import signupUserFunction from '../controllers/routeAuthfunctions/signupUser.js'
import userNameFunction from '../controllers/routeAuthfunctions/userUsed.js'

const router = express.Router()


router.post("/signup",signupFunction)
router.post("/verifyEmail",verifyEmailFunction)
router.post("/login", loginFunction)
router.post("/signupUser",signupUserFunction)
router.post("/user" , userNameFunction)

export default router