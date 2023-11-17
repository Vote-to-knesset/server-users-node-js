import express from 'express'

// functions
import signupFunction from '../controllers/routeAuthfunctions/signup'

const router = express.Router()


router.post("/signup",signupFunction)




export default router