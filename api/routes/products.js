const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const mongoose = require('mongoose')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req,file,cb) {
          cb(null,'uploads/')
    },
    filename: function(req,file,cb) {
     cb(null, Date.now() + file.originalname)
    }
})
const filefilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }else {
cb(null,false)
    }

}
const upload = multer({storage:storage,limits:{
    fileSize: 1024 *1024 *5 

}, fileFilter:filefilter
})

router.get('/',(req,res,next)=>{
    Product.find()
    .select('name price _id productimage')
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length,
            products: docs.map(doc=>{
                return {
                    _id: docs.id,
                   name: docs.name,
                    price: docs.price,
                    productimage:doc.productimage,
                    request:{
                      type:'GET',
                      url:'http://localhost:3000/products/'+doc._id

                    }
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})
router.post('/',upload.single('productimage'),(req,res,next)=>{
    console.log(req.file)
    const product = new Product({
          _id: mongoose.Types.ObjectId(),
          name:req.body.name,
          price:req.body.price,
          productimage: req.file.path
     })
     product.save().then(result=>{console.log(result)
        res.status(201).json({
            message:'Created product sucessfully',
            createdProduct: {
                _id: result.id,
                   name: result.name,
                    price: result.price,
                    request:{
                      type:'GET',
                      url:'http://localhost:3000/products/'+result._id

                    }
            }
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
   }).catch(err=>{console.log(err)
          res.status(500).json({error:err})
        })
})
router.patch('/:productid',(req,res,next)=>{
    const id = req.params.productid
    var updatedproduct={
           name:req.body.name,
           price:req.body.price
    }
    Product.updateOne({_id:id},{$set:updatedproduct})
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