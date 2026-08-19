import express from "express";
import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";
import cookieParser from "cookie-parser";
import cors from 'cors'




const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser())

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://gen-ai-client-gilt.vercel.app"
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin) || origin.endsWith(".onrender.com")) {
            return callback(null, true);
        }
        return callback(null, true); // Fallback allow for frontend
    },
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