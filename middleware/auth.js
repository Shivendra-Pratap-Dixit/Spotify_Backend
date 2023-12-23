const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{
const token =req.header("x-auth-token")
if(!token)
return res.status(400).send({message:"Access Denied ,No token "})
jwt.verify(token,process.env.JWTPRIVATEKEY,(error,validToken)=>{
    if(error){
        return res.status(400).send({message:"Invalid token Please Login Again"})
    }else{
        req.user=validToken
        next()
    }
})
}
module.exports=auth