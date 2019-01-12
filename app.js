const express = require('express')
const app = express()
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const morgan = require('morgan')
const mongoose = require('mongoose')
const userRoutes = require('./api/routes/user')
const bodyParser = require('body-parser')
mongoose.connect('mongodb://passport-user:Deepak123@ds253284.mlab.com:53284/verification',()=>{console.log('connected to database')},{useNewUrlParser: true})
mongoose.Promise = global.Promise 
app.use(morgan('dev'))
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
 app.use((req,res,next)=>{
           res.header('Acess-Controll-Allow-Origin','*')
           res.header('Acess-controll-Allow-headers','Origin, X-Requested-With,Content-Type,Accept,Authorization')
           if(req.method === 'OPTIONS'){
           res.header('Acess-Controll-Allow-Method','PUT,POST,PATCH,DELETE.GET')
           return res.status(200).json({})
           }
           next()
  })
app.use('/products', productRoutes)


app.use('/orders',orderRoutes)
app.use('/user',userRoutes)
app.use((req,res,next) =>{
    const error = new Error('Not found')
    error.status(404)
    next(error)
})
app.use((error,req,res,next)=>{
 res.status(error.status || 500)
 res.json({
     error:{
         message:error.message
     }
 })
})
module.exports = app