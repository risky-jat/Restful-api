const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
router.post('/signup',(req,res,next)=>{
    User.find({email:req.body.email}).exec()
    .then(user =>{
        if(user.length >= 1){
            return res.status(409).json({message:'mail exists already'})
            
        } else {

            bcrypt.hash(req.body.password,10,(err,hash)=>{
        
                if(err){
                    res.status(500).json({
                        error:err
                    })
                }
                else {
                    const user = new User({
                        _id:mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password: hash
                     })
                     user.save()
                     .then(result=>{
                         console.log(result)
                         res.status(201).json({
                             message:'user created'
                         })
                     })
                     .catch(err=>{
                         console.log(err)
                         res.status(500).json({
                             error:err
                         })
                     })
                }
            })
        }
    })
})
router.delete('/:userid',(req,res,next) =>{
    User.remove({_id:req.params.userid}).exec()
    .then(result=>{
        res.status(200).json({
            message:'User deleted sucessfully'
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})
module.exports = router