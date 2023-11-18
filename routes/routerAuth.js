import express from 'express'

// functions
import signupFunction from '../controllers/routeAuthfunctions/signup'
import verifyEmailFunction from '../controllers/routeAuthfunctions/verifyEmail'
import loginFunction from '../controllers/routeAuthfunctions/logIn'

const router = express.Router()


router.post("/signup",signupFunction)
router.post("/verifyEmail",verifyEmailFunction)
router.post("/login", loginFunction)



export default router