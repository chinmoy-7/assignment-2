const router = require("express").Router();
const user = require("../model/user")
const jwt = require("jsonwebtoken");
const {body,validationResult} = require("express-validator")

router.post("/register",
body("email").isEmail(),
body("password").isLength({min:5,max:16}),
async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                staus:"failed",
                messsage:errors.array()
            })
        }
        const {name,email,password}=req.body
        const checkUser = await user.find({email:email});
        
        if(checkUser.length){
            return res.status(400).json({
                status:"failed",
                messsage:"User already exists",
            })
        }
        const newUser = await user.create({
            name:name,
            email:email,
            password:password
        })
        res.status(200).json({
            status:"success",
            result:newUser
        })
    }catch(e){
        res.status(500).json({
            status:"failed",
            messsage:e.messsage
        })
    }
})

router.post("/login",
body("email").isEmail(),
body("password").isLength({min:5,max:16}),
async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                staus:"failed",
                messsage:errors.array()
            })
        }
        
        const {email,password}=req.body
        const checkUser = await user.find({email:email});
        if(!checkUser.length){
            return res.status(400).json({
                status:"failed",
                message:"user doesn't exist"
            })
        }
        const matchPassword = checkUser[0].password===password;
        if(!matchPassword){
            return res.status(400).json({
                status:"failed",
                message:"incorrect password"
            })
        }
        const paylod=checkUser[0]._id;
        const token = jwt.sign({paylod:paylod},process.env.MY_SECRET);
        res.status(200).json({
            status:"success",
            message:token
        })

    }catch(e){
        res.status(500).json({
            status:"failed",
            messsage:e.messsage
        })
    }
})

module.exports = router;