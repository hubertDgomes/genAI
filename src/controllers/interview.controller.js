import { PDFParse } from "pdf-parse";
import aiService from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";

const generateInterViewReportController = async (req, res) => {
    try {
        const resumeFile = req.file;
        if (!resumeFile) {
            return res.status(400).json({
                message: "Resume PDF file is required"
            });
        }

        const parser = new PDFParse({ data: Uint8Array.from(resumeFile.buffer) });
        const resumeResult = await parser.getText();
        const resumeText = resumeResult?.text || "";

        const { selfDescription, jobDescription } = req.body;
        if (!selfDescription || !jobDescription) {
            return res.status(400).json({
                message: "Both job description and self description are required"
            });
        }

        const interviewReportWithAI = await aiService.generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        });

        const interviewReport = new interviewReportModel({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interviewReportWithAI
        });
        await interviewReport.save();

        return res.status(200).json({
            message: "Interview Report generated successfully",
            interviewReport
        });
    } catch (err) {
        console.error("Error generating interview report:", err);
        return res.status(500).json({
            message: err.message || "Failed to generate interview report"
        });
    }
};

const getInterviewReportByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                message: "Invalid Interview Report ID"
            });
        }

        const interviewReport = await interviewReportModel.findOne({ _id: id, user: req.user.id });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview Report not found"
            });
        }

        return res.status(200).json({
            message: "Interview Report fetched successfully",
            interviewReport
        });
    } catch (err) {
        console.error("Error fetching report by ID:", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const getAllInterviewReportsController = async (req, res) => {
    try {
        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .select("_id title matchScore createdAt updatedAt")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Interview Reports fetched successfully",
            interviewReports: interviewReports || []
        });
    } catch (err) {
        console.error("Error fetching all interview reports:", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export default { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController };