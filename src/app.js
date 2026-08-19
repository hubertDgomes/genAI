import express from "express";
import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";
import cookieParser from "cookie-parser";
import cors from 'cors'




const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "https://gen-ai-client-gilt.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))


app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.get("/", (req, res) => {
    res.status(200).json({ status: "ok", message: "Backend API is running" });
});


export default app;