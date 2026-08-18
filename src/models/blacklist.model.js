import mongoose, { Schema } from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token : {
        type : String,
        required : [true , "Token is required to be added!"]
    }
},{timestamps : true})


export default mongoose.model("blacklist" , blacklistTokenSchema)