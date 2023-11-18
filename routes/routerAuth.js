import express from 'express'

// functions
import signupFunction from '../controllers/routeAuthfunctions/signup'
import verifyEmailFunction from '../controllers/routeAuthfunctions/verifyEmail'

const router = express.Router()


router.post("/signup",signupFunction)
router.post("/verifyEmail",verifyEmailFunction)




export default router