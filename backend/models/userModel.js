const mongosoe =require('mongoose')

const userSchema=mongosoe.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
},
{
    timestamps:true
})

const User =mongosoe.model('User',userSchema)

module.exports=User
