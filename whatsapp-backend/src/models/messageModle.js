import mongoose from "mongoose";


const whatsappSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        trim: true
    },
    received: {
        type: Boolean,
        default: false
    }
},{timestamps:true});

export default mongoose.model("messageContent", whatsappSchema);