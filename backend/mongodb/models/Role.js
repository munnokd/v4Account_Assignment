import mongoose from "mongoose";

const Role = new mongoose.Schema({
    name: {
        type:String,
    },
    role:{
        type:String,
        unique:true
    },
    child:[String],
    email:{
        type: String,
        unique: true
    },
    password:String,
    parent:String,
})

const RoleSchema = mongoose.model('Role', Role)

export default RoleSchema