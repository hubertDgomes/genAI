import express from "express";
import authUser from '../middleware/auth.middleware.js'
import upload from "../middleware/file.middleware.js";
import interviewController from "../controllers/interview.controller.js";

const interviewRouter = express.Router();


interviewRouter.post("/",authUser, upload.single("resume"), interviewController.generateInterViewReportController)
interviewRouter.get("/get/:id",authUser, interviewController.getInterviewReportByIdController)
interviewRouter.get("/getall",authUser, interviewController.getAllInterviewReportsController)


export default interviewRouter;