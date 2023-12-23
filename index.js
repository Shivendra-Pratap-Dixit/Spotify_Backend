require("dotenv").config();
require("express-async-errors");
const express=require("express");
const cors=require("cors");
const connection=require("./db");
const userRoutes=require("./Route/users");
const authRoutes=require("./Route/auth");
const songRoutes=require("./Route/songs");
const playlistRoutes=require("./Route/playlists");
const searchRoutes=require("./Route/search")
const app=express();
const port=process.env.PORT ||8080;

app.use(express.json())
app.use(cors())
app.use("/users",userRoutes);
app.use("/login",authRoutes);
app.use("/songs",songRoutes);
app.use("/playlist",playlistRoutes)
app.use("/search",searchRoutes)
app.get("/",(req,res)=>{
    res.send({message:"Welcome To the Spotify Backend"})
})
connection()
app.listen(port,()=>{
    console.log(`Server is Running at ${port}`)
})