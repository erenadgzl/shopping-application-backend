const express=require('express')
const app=express()
const morgan=require('morgan')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')

const productRoutes=require('./api/routes/products')
const orderRoutes=require('./api/routes/orders')
const orderDetailRoutes=require("./api/routes/orderDetails")
const brandRoutes=require('./api/routes/brands')
const categoryRoutes=require('./api/routes/categories')
const productGroupExpRoutes=require('./api/routes/productGroupExps')
const productGroupsRoutes=require('./api/routes/productGroups')
const userRoutes = require('./api/routes/user');
const userTypeRoutes=require('./api/routes/userTypes')
const cityRoutes=require('./api/routes/cities')
const shopRoutes=require('./api/routes/shops')
const shopUnitRoutes=require('./api/routes/shopUnits')
const shopUnitStockRoutes=require('./api/routes/shopUnitStocks')
const shopUnitStockMovementRoutes=require('./api/routes/shopUnitStockMovements')
const districtsRoutes=require('./api/routes/districts')
const neighborhoodsRoutes=require('./api/routes/neighborhoods')
const addressesRoutes=require('./api/routes/addresses')
const shopUnitServiceAddressesRoutes=require('./api/routes/shopUnitServiceAddresses')
const shopUnitAppliesRoutes=require('./api/routes/shopUnitApplies')
const userAddressesRoutes=require('./api/routes/userAddresses')

//connection mongodb connectionsetting in nodemon.json
mongoose.connect(process.env.MONGOLAB_URI,{useNewUrlParser:true})


app.use(morgan('dev'))
app.use('/uploads/products',express.static('uploads/products'))
app.use('/uploads/shops_logo',express.static('uploads/shops_logo'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    if(req.method==='OPTIONS'){
        res.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET")
        return res.status(200).json({})
    }
    next()
})

//Routes which should handle requests


app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/orderDetails',orderDetailRoutes)
app.use('/brands',brandRoutes);
app.use('/categories',categoryRoutes);
app.use('/productGroupExps',productGroupExpRoutes);
app.use('/productGroups',productGroupsRoutes);
app.use("/user", userRoutes);
app.use("/userTypes", userTypeRoutes);
app.use("/cities",cityRoutes)
app.use("/shops",shopRoutes)
app.use("/shopUnits",shopUnitRoutes)
app.use("/shopUnitStocks",shopUnitStockRoutes)
app.use("/shopUnitStockMovements",shopUnitStockMovementRoutes)
app.use("/neighborhoods",neighborhoodsRoutes)
app.use("/districts",districtsRoutes)
app.use("/addresses",addressesRoutes)
app.use("/shopUnitServiceAddresses",shopUnitServiceAddressesRoutes)
app.use("/shopUnitApplies",shopUnitAppliesRoutes)
app.use("/userAddresses",userAddressesRoutes)


app.use((req,res,next)=>{
    const error=new Error("Not Found");
    error.status=404;
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})

app.disable('etag');
module.exports=app;