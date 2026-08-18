import express from 'express'
import authController from '../controllers/auth.controller.js'
import authUser from '../middleware/auth.middleware.js'

const authRoute = express.Router()

authRoute.post("/register", authController.registerUserController)
authRoute.post("/login",authController.loginUserController)
authRoute.get("/logout",authController.logoutUserController)
authRoute.get("/get-me",authUser, authController.getMeController)

export default authRoute