const mongoose=require("mongoose");
require("dotenv").config()

module.exports=async()=>{
    try {
        await mongoose.connect(process.env.mongodb_url);
        console.log("Connected to Database !!")
    } catch (error) {
        console.log("Could not Connected to Database !")
    }
}