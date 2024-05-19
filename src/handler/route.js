import express from 'express'
import {adminController,userController} from './controller.js'
import verifyToken from '../helper/verify-token.js'
const router = express()


//Admin Routes
router.post('/login',adminController.login)
router.get('/user',verifyToken,adminController.search)


//User Routes
router.post('/register',userController.register)



export default router
