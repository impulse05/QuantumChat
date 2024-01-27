import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        unique : true
    },
    phone : {
        type : String,
        unique : true
    },
    password : {
        type : String,
    },
    picture : {
        type: String,  // URL of image
        default : "https://icon-library.com/images/users-icon-png/users-icon-png-15.jpg"
    },
    provider : {
        type : String,
        enum : ["local", "google", "facebook", "github"],
        default : "local"
    },
    providerId : {
        type : String,
    },
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

export default User;