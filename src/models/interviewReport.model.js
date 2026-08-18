import mongoose from "mongoose";


const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, { _id: false })

// =============================================

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, { _id: false })

// ============================

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        requred: true
    }
}, { _id: false })

// ==================================

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        requred: true
    },
    focus: {
        type: String,
        required: true
    },
    tasks: [{
        type: String,
        requred: true
    }]
}, { _id: false })

// =========================================

const interviewReportSchema = new mongoose.Schema({

    jobDescription: {
        type: String,
        required: true
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number
    },
    technicalQuestion: [technicalQuestionSchema],
    behavioralQuestion: [behavioralQuestionSchema],
    skillGap: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    }
}, { timestamps: true })


export default mongoose.model("InterviewReport", interviewReportSchema)