const mongosoe =require('mongoose')
const bcrypt =require('bcryptjs')
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

userSchema.methods.matchPassword=async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
}

const User =mongosoe.model('User',userSchema)

module.exports=User
