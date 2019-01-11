const express = require('express')
const router = express.Router()
router.get('/',(req,res,next)=>{
 res.status(200).json({
     message:'orders were fetched'
 })
})
router.post('/',(req,res,next)=>{
    const order = {
        productId:req.body.productId,
        quantity:req.body.quantity
    }
    res.status(201).json({
        message:'order was created',
        order:order
    })
   })
   router.get('/:orderid',(req,res,next)=>{
    res.status(200).json({
        message:'order details'
    })
   })

   router.delete('/:orderid',(req,res,next)=>{
    res.status(200).json({
        message:'order deleted'
    })
   })

module.exports = router