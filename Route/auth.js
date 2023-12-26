const router=require("express").Router();
const bcrypt=require("bcrypt");
const { User } = require("../Model/user");


router.post("/",async(req,res)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send({message:"Invalid email or password"});
    const validPassword=await bcrypt.compare(req.body.password,user.password);
    if(!validPassword)
    return res.status(400).send({message:"Invalid email or password"});
const token=user.generateAuthToken()
res.status(200).send({token:token,userId:user._id,message:"Signing In Please wait... "});
})
module.exports=router