import express from 'express'

// functions
import signupFunction from '../controllers/routeAuthfunctions/signup.js'
import verifyEmailFunction from '../controllers/routeAuthfunctions/verifyEmail.js'
import loginFunction from '../controllers/routeAuthfunctions/logIn.js'
import signupUserFunction from '../controllers/routeAuthfunctions/signupUser.js'
import userNameFunction from '../controllers/routeAuthfunctions/userUsed.js'
import { verifyToken, submitVoteFunction ,verifyUser } from '../controllers/routeAuthfunctions/submitVote.js'
import {getSelctedBills,setHoverBills} from '../controllers/routeAuthfunctions/getBillsInfo.js'
import {setDiscussion, setComment, getDiscussions, addLike} from '../controllers/routeAuthfunctions/comments.js'
import { getHotBills,getRandomBillIds } from '../controllers/routeAuthfunctions/hotBills.js'
import { googleLogin,signupWithGoogle } from '../controllers/routeAuthfunctions/googleSignin.js'
import {getNotifications} from '../controllers/routeAuthfunctions/notifications.js'
import { setCivilBill,getAllCivilBills,setCivilBillVote } from '../controllers/routeAuthfunctions/CivilBills.js'
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
router.post('/addlike',verifyToken,addLike)
router.get('/getcomments',verifyToken,getDiscussions)
router.post('/googleLogin',googleLogin)
router.post('/signupWithGoogle',signupWithGoogle)
router.get('/hotbills',getHotBills)
router.get('/notifications',verifyToken,getNotifications)
router.post('/setcivilbills',verifyToken,setCivilBill)
router.get('/getcivilbills',verifyToken,getAllCivilBills)
router.post('/setcivilbillvote',verifyToken,setCivilBillVote)
router.post('/sethoverbills',verifyToken,setHoverBills)
router.get('/get3bills',getRandomBillIds)
export default router