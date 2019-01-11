const express = require('express')
const router = express.Router()
router.get('/',(req,res,next)=>{
      res.status(200).json({
             message:'just to check whether it works fine ot not!!'
              })
})
router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:'post requests'
    })
})
//this is how comments are added
router.get('/:productid',(req,res,next)=>{
 const id = req.params.productid
   if(id === 'special'){
       res.status(200).json({
           message:'You discovered the special id!!'
       })
   }else {
       res.status(200).json({
           message:'you passed an id'
       })
   }
})
router.patch('/:productid',(req,res,next)=>{
    res.status(200).json({
        message:'You sucessfully updated the route data!!'
    })
})
router.delete('/:productid',(req,res,next)=>{
    res.status(200).json({
        message:'you sucessfully delted the route data!!'
    })
})
module.exports = router