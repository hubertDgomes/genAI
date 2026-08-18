import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'
import * as z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema"

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const interviewReportSchema = {
    type: "object",
    properties: {
        matchScore: {
            type: "number",
            description: "A numerical score between 0 and 100 showing how well the candidate matches the role."
        },
        technicalQuestion: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: {
                        type: "string",
                        description: "A technical interview question that can be asked to the candidate."
                    },
                    intention: {
                        type: "string",
                        description: "The reason or goal behind asking this technical question."
                    },
                    answer: {
                        type: "string",
                        description: "The ideal answer or points the candidate should cover while answering this question."
                    }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestion: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: {
                        type: "string",
                        description: "A behavioral interview question that can be asked to the candidate."
                    },
                    intention: {
                        type: "string",
                        description: "The reason or goal behind asking this behavioral question."
                    },
                    answer: {
                        type: "string",
                        description: "The ideal answer or points the candidate should cover while answering this question."
                    }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGap: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    skill: {
                        type: "string",
                        description: "A skill the candidate is missing or needs improvement in."
                    },
                    severity: {
                        type: "string",
                        enum: ["low", "medium", "high"],
                        description: "How critical this skill gap is for the role."
                    }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    day: {
                        type: "number",
                        description: "The day number in the preparation plan, starting from 1."
                    },
                    focus: {
                        type: "string",
                        description: "The main topic or focus area for that day."
                    },
                    tasks: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        }
    },
    required: [
        "matchScore",
        "technicalQuestion",
        "behavioralQuestion",
        "skillGap",
        "preparationPlan"
    ]
};

const generateInterviewReport = async ({ resume, selfDescription, jobDescription }) => {
    const prompt = `
You are generating a structured interview report.
Return ONLY valid JSON that matches the schema exactly.
Do not include markdown, explanation, or extra text.
Do not add any keys beyond the schema.
Do not return partial JSON.

Job Description:
${jobDescription}

Resume:
${resume}

Self Description:
${selfDescription}

Required exact output structure:
{
  "matchScore": 0,
  "technicalQuestion": [{ "question": "string", "intention": "string", "answer": "string" }],
  "behavioralQuestion": [{ "question": "string", "intention": "string", "answer": "string" }],
  "skillGap": [{ "skill": "string", "severity": "low|medium|high" }],
  "preparationPlan": [{ "day": 1, "focus": "string", "tasks": ["string"] }]
}
`;

    // const interaction = await client.interactions.create({
    //     model: "gemini-3.6-flash",
    //     input: prompt,
    //     response_format: {
    //         mime_type: 'application/json',
    //         schema: interviewReportSchema
    //     },
    // })

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportSchema
        }
    });

    return (JSON.parse(response.text))
    // console.log(interaction.data);
};

export default generateInterviewReport