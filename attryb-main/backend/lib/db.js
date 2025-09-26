import mongoose from "mongoose"

export const connectDB = async()=>{
    try {
        const response = await mongoose.connect("mongodb://127.0.0.1:27017/OEM");
        console.log(`MongoDB connected: ${response.connection}`);
    } catch (error) {
        console.log("error:",error.message);
    }
}