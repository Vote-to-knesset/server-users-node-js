import express from 'express'

// functions
import signupFunction from '../controllers/routeAuthfunctions/signup.js'
import verifyEmailFunction from '../controllers/routeAuthfunctions/verifyEmail.js'
import loginFunction from '../controllers/routeAuthfunctions/logIn.js'

const router = express.Router()


router.post("/signup",signupFunction)
router.post("/verifyEmail",verifyEmailFunction)
router.post("/login", loginFunction)



export default router