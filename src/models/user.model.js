import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Already taken"],
        required: true
    },
    email: {
        type: String,
        unique: [true, "Already exist"],
        required: true
    },
    password: {
        type: String,
        // unique : [true , "Already exist"],
        required: true
    }
})

export default mongoose.model("user", userSchema)