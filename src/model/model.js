import { Schema,model } from "mongoose";

//Admin 
const adminSchema = new Schema({
    email : String,
    password : String
})
const adminModel = model('admin',adminSchema)


//User
const userSchema = new Schema({
    name : String,
    email : String,
    phone : String,
    referralId : String,
    referredBy : String,
})
const userModel = model('user',userSchema)


export {adminModel,userModel}


