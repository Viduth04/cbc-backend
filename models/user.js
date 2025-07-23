import mongoose from "mongoose"; 

const userSchema=mongoose.Schema({
    email:{
        type: String,
        required :true,
        unique:true//pk
    },
    firstName:{
        type:String,
        required :true,

    },
    lastName:{
        type:String,
        required :true,
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    type:{
        type:String,
        default:"customer"
    },
    profilePicture:{
        type:String,
        default:"https://th.bing.com/th/id/OIP.3fT1ZEoCPisM9CEyyN57uwHaHa?w=128&h=104&c=7&bgcl=cdc9be&r=0&o=6&cb=thws4&dpr=1.3&pid=13.1" 

    }
})
const User=mongoose.model("users",userSchema)
export default User;