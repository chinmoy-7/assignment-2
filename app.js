const express = require("express");
const mongoose = require("mongoose");
const register = require("./Routes/register")
const dotenv = require("dotenv");
const post = require("./Routes/post")
const app= express();
dotenv.config();

app.use(express.json());

const connectDB = ()=>{
    mongoose.set('strictQuery', false);
    return mongoose.connect("mongodb://127.0.0.1:27017/assignment").then(()=>{
        console.log("Database is connected");
    }).catch((e)=>{
        console.log(e.message);
    })
}

app.use("/",register);
app.use('/',post);

app.listen(3000,async ()=>{
    await connectDB();
    console.log("The server is up at 3000");
})