import mongoose from "mongoose";

const Role = new mongoose.Schema({
    name: String,
    child:[String],
    email:String,
    password:String,
    parent:String,
})

const RoleSchema = mongoose.model('Role', Role)

export default RoleSchema