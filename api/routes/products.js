const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const mongoose = require('mongoose')
router.get('/',(req,res,next)=>{
    Product.find()
    .exec()
    .then(docs=>{
        console.log(docs)
        res.status(200).json(docs)
    })
    .catch(err=>{
        console.log(err)
        res.status(50).json({
            error:err
        })
    })
})
router.post('/',(req,res,next)=>{
    const product = new Product({
          _id: mongoose.Types.ObjectId(),
          name:req.body.name,
          price:req.body.price
     })
     product.save().then(result=>{console.log(result)
        res.status(201).json({
            message:'post requests',
            createdProduct: result
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
   
})
//this is how comments are added
router.get('/:productid',(req,res,next)=>{
 const id = req.params.productid
  Product.findById(id).exec().
  then(doc=>{console.log(doc) 
    res.status(200).json(doc)
      if(!doc){
          res.status(200).json(doc)
      }else{
          res.status(404).json({
              message:"No valid entry found"
          })
      }
})
  .catch(err=>{console.log(err)
          res.status(500).json({error:err})
        })
})
router.patch('/:productid',(req,res,next)=>{
    const id = req.params.productid
    const updateOps ={}
    for(const ops of req.body){
        updateOps[ops.propName] = ops;
    }
   Product.update({_id:id},{$set:updateOps})
   .exec()
   .then(result=>{
       res.status(200).json(result)
   })
   .catch(err=>{
       console.log(err)
       res.status(500).json({
           error:err
       })
   })

})
router.delete('/:productid',(req,res,next)=>{
    const id = req.params.productid
    Product.remove({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})
module.exports = router