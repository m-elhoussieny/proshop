const asyncHandler=require('express-async-handler')
const Order =require('../models/orderModel')

//@desc create new order
//@route POST/api/orders
//@access private
const addOrderItems= asyncHandler(async (req,res)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    }=req.body

    if(orderItems&&orderItems.lemgth === 0){
        res.status(400)
        throw new Error('No oder items')
        return
    }else{
        const order=new Order({
        orderItems,
        user:req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        })

        const createdOrder=await order.save()
        res.status(201).json(createdOrder)
    }
})

//@desc GET order by id 
//@route GET/api/orders/:id
//@access private
const getOrderById= asyncHandler(async (req,res)=>{
   const order =await Order.findById(req.params.id).populate(
    'user',
    'name email')

   if(order){
       res.json(order)
   }else{
       res.status(404)
       throw new Error('Order not found')
   }
})

//@desc UPDATE  order to paid 
//@route GET/api/orders/:id/pay
//@access private
const updateOrderToPaid= asyncHandler(async (req,res)=>{
    const order =await Order.findById(req.params.id) 
 
    if(order){
        order.isPaid=true
        order.paidAt=Date.now()
        order.paymentResult={
            id:req.body._id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address
        }

        const updatedOrder=await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
 })

 //@desc Get logged in user orders
//@route GET/api/orders/myorders
//@access private
const getMyOrders= asyncHandler(async (req,res)=>{
    const orders =await Order.find({user : req.user._id}) 
    res.json(orders)
 })


module.exports={addOrderItems ,getOrderById ,getMyOrders ,updateOrderToPaid}