import { PDFParse } from "pdf-parse";
import aiService from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";

const generateInterViewReportController = async (req, res) => {
    const resumeFile = req.file;

    const resumeContent = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText();

    const { selfDescription, jobDescription } = req.body;

    const interviewReportWithAI = await aiService.generateInterviewReport({
        resume: resumeContent,
        selfDescription,
        jobDescription
    })
    const interviewReport = await interviewReportModel({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportWithAI
    })
    await interviewReport.save()

    res.status(200).json({
        message: "Interview Report generated successfully",
        interviewReport
    })
}

const getInterviewReportByIdController = async (req, res) => {
    const {id}  = req.params

    try{
        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(400).json({
                message : "Invalid Interview Report ID"
            })
        }
    }catch(err){
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
    const interviewReport = await interviewReportModel.findOne({_id : id, user : req.user.id}).sort({createdAt : -1})

    if(!interviewReport){
        return res.status(404).json({
            message : "Interview Report not found"
        })
    }

    res.status(200).json({
        message: "Interview Report fetched successfully",
        interviewReport
    })
}

const getAllInterviewReportsController = async (req, res) => {
    const interviewReports = await interviewReportModel.find({user : req.user.id}).select("-jobDescription -resume -selfDescription -matchScore -technicalQuestion -behavioralQuestion -skillGap -preparationPlan -createdAt -updatedAt").sort({createdAt : -1})

    console.log(req.user.id)
    try{
        if(interviewReports.length === 0){
            return res.status(404).json({
                message : "No Interview Reports found"
            })
        }
    }catch(err){
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
    res.status(200).json({
        message: "Interview Report fetched successfully",
        interviewReports
    })
}

export default {generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController};