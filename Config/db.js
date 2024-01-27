import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const connection= mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connection successful");
    } catch (error) {
        console.log("Error in DB", error);
    }
}

export default connectDB;