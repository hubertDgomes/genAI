import { PDFParse } from "pdf-parse";
import generateInterviewReport from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";

const generateInterViewReportController = async (req, res) => {
    const resumeFile = req.file;

    const resumeContent = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText();

    const { selfDescription, jobDescription } = req.body;

    const interviewReportWithAI = await generateInterviewReport({
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

export default generateInterViewReportController;