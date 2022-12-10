const router = require("express").Router();
const jwt = require("../middlewear/Auth");
const post = require("../model/post");
const user = require("../model/user");
// router.post("/test",jwt,(req,res)=>{
//     res.send("JWT working");
// })

router.get("/posts",jwt,async (req,res)=>{
    try{
        const posts = await post.find()
        res.status(200).json({
            posts:posts
        })
    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
})

router.post("/posts",jwt,async (req,res)=>{
    console.log(res.user)
    try{
        const {title,body,image} = req.body;
        const newPost = await post.create({
            title:title,
            body:body,
            image:image,
            user:res.user


        })
        res.status(200).json({
            status:"post created",
            message:newPost
        })
    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
})

router.put("/posts/:postId",jwt,async (req,res)=>{
    try{
        const postId=req.params
        const {title,body,image}=req.body;
        const prev = await post.find({_id:postId.postId})
        await post.updateOne({
            title:title?title:prev[0].title,
            body:body?body:prev[0].body,
            image:image?image:prev[0].image
        })
        res.status(200).json({
            status:"success"
        })
    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
})

router.delete("/posts/:postId",jwt,async (req,res)=>{
    try{
        const postId= req.params
        await post.deleteOne({_id:postId.postId});
        res.status(200).json({
            status:"sucessully deleted"
        })
    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
})

module.exports = router;