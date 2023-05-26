const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const jwt = require("jsonwebtoken")



const { employeeModel } = require('./Model/Employeelist.js')
const { userModel } = require('./Model/usermodel.js')

const app = express()

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))


require('./db/connection.js')


app.listen(2000,()=>{
    console.log("Server Running at 2000")
})

//signup
app.post('/register',async(req,res)=>{
    let data = new userModel(req.body)
    data.save(
        res.json({status: 'Registered Successfully'})
    )
})



//login
app.post('/login',async(req,res)=>{

    let email = req.body.email
    let password = req.body.password

    let user = await userModel.findOne({email : email})
    console.log(user)
    if(!user){
        res.json({status: "User not Found"})
    }
    try {

        if( user.password == password){
            console.log("inside if")
            console.log(user._id)
            jwt.sign({email:email,id:user._id},"employeeapp",{expiresIn:"1d"},
            (error,token)=>{
                console.log("token generating")
                if (error) {
                    res.json({status:"Token not Generated"})
                } else {
                    res.json({status:"Login Successfull",token:token,data:user})
                    console.log(token)
                }
            })
        }
        else{
            res.json({status:"Login Failed"})
        }
    } catch (error) {
        
    }
    
})


//get full list
app.post('/getlist', async (req,res)=>{
    let data = await employeeModel.find()
    console.log("getlist")
    jwt.verify(req.body.token,"employeeapp",
    (error,decoded)=>{
        if (decoded && decoded.email) {
           
            res.json(data)
            
        } else {
            res.json({status:"Unauthorized User"})
        }
    })
})



//get single data
app.post('/getadata', async(req,res)=>{
    
    let data = await employeeModel.findOne(req.body)
    jwt.verify(req.body.token,"employeeapp",
    (error,decoded)=>{
        if (decoded && decoded.email) {
           
            res.json(data)
            
        } else {
            res.json({status:"Unauthorized User"})
        }
    })
})



//post employee data
app.post('/addlist', async(req,res)=>{
    let data = new employeeModel(req.body)
    jwt.verify(req.body.token,"employeeapp",
    (error,decoded)=>{
        if (decoded && decoded.email) {
           
            data.save()
            res.json({status : 'Data Saved'})
            
        } else {
            res.json({status:"Unauthorized User"})
        }
    })

    
})



//delete an employee
app.post('/deletelist', async (req,res)=>{

    const data = await employeeModel.findByIdAndDelete(req.body)
    console.log(req.body)
    jwt.verify(req.body.token,"employeeapp",
    (error,decoded)=>{
        if (decoded && decoded.email) {
           
            res.json({status:'Deleted Successfully'})
            
        } else {
            res.json({status:"Unauthorized User"})
        }
    })
})



//update data
app.post('/modify', async(req,res)=>{
    console.log(req.body._id)
    let data = await employeeModel.findOneAndUpdate({"_id": req.body._id},req.body)
    console.log(data)
    jwt.verify(req.body.token,"employeeapp",
    (error,decoded)=>{
        if (decoded && decoded.email) {
            
            res.json({status:'Data Updated'})
            
        } else {
            res.json({status:"Unauthorized User"})
        }
    })
})