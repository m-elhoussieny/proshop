const mongosoe =require('mongoose')

const reviewSchema=mongosoe.Schema({
    name:{type:String,required:true},
    rating:{type:Number,required:true},
    comment:{type:String,required:true},
},{
    timestamps:true,
})

const productSchema=mongosoe.Schema(
    {
    user:{
        type:mongosoe.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },    
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    reviews:[reviewSchema],
    rating:{
        type:Number,
        required:true,
        default:0,
    },
    price:{
        type:Number,
        required:true,
        default:0 
    },
    numReviews:{
        type:Number,
        required:true,
        default:0
    },
    countInStock:{
        type:Number,
        required:true,
        default:0 
    },
},
{
    timestamps:true
})

const Product =mongosoe.model('Product',productSchema)

module.exports=Product
