const jwt = require("jsonwebtoken");
const user = require("../model/user");


const jwtAuth = async (req,res,next)=>{

    try{
        //Check Auth if i am gettting a token
        let token = req.headers.authorization;
        if(!token){
            return res.status(403).json({
                status:"failed",
                message:"Access Denied"
            })
        }
        const verify = jwt.verify(token,process.env.MY_SECRET);
        // console.log(verify)
        if(verify){
            const newUser = verify.paylod
            res.user = newUser;
            next();
        }
    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
}
module.exports = jwtAuth;