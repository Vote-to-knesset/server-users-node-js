import express from 'express'

// functions
import signupFunction from '../controllers/routeAuthfunctions/signup.js'
import verifyEmailFunction from '../controllers/routeAuthfunctions/verifyEmail.js'
import loginFunction from '../controllers/routeAuthfunctions/logIn.js'
import signupUserFunction from '../controllers/routeAuthfunctions/signupUser.js'
import userNameFunction from '../controllers/routeAuthfunctions/userUsed.js'
import { verifyToken, submitVoteFunction ,verifyUser } from '../controllers/routeAuthfunctions/submitVote.js'
import getSelctedBills from '../controllers/routeAuthfunctions/getBillsInfo.js'
import {setDiscussion, setComment, getDiscussions} from '../controllers/routeAuthfunctions/comments.js'
const router = express.Router()


router.post("/signup",signupFunction)
router.post("/verifyEmail",verifyEmailFunction)
router.post("/login", loginFunction)
router.post("/signupUser",signupUserFunction)
router.post("/user" , userNameFunction)
router.post("/submitVote", verifyToken,submitVoteFunction)
router.get("/selectedBills",verifyToken,getSelctedBills)
router.post("/userexist",verifyUser)
router.post('/adddiscussion',verifyToken,setDiscussion)
router.post('/addcomment',verifyToken,setComment)
router.get('/getcomments',verifyToken,getDiscussions)
export default router