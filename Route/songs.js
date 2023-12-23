const router=require("express").Router();
const auth=require("../middleware/auth");
const admin=require("../middleware/admin");
const validObjectId=require("../middleware/validObjectId");
const { validate,Song } = require("../Model/song");
const { User } = require("../Model/user");


//create song
router.post('/',admin,async(req,res)=>{
    const {error}=validate(req.body);
    if(error) return res.status(400).send({message:error.details[0].message})
    const song =await Song(req.body).save();
    res.status(200).send({message:"Sogn created Succesfully",data:song})
})
//get songs
router.get('/',async(req,res)=>{
    const songs =await Song.find();
    res.status(200).send({data:songs})
})
//update song by id
router.put('/:id',[validObjectId,admin],async(req,res)=>{
    const song =await Song.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).send({data:song,message:"Song Updated Succefully"})
})
//delete song by id
router.delete('/:id',[validObjectId,admin],async(req,res)=>{
    const song =await Song.findByIdAndDelete(req.params.id);
    res.status(200).send({data:song,message:"Song Deleted Succefully"})
})

//like song
router.post('/like/:id',[validObjectId,auth],async(req,res)=>{
    let resMes="";
    const song =await Song.findById(req.params.id);
    if(!song) return res.status(400).send({message:"Song does not Exist"});
    const user=await User.findById(req.user._id);
    const index=user.likedSongs.indexOf(song._id);
    if(index===-1){
        user.likedSongs.push(song._id);
        resMes="Song is Added To Your Liked Songs"
    }else{
        user.likedSongs.splice(index,1);
        resMes="Song is Removed From Your Liked Songs"
    }
    await user.save()
    res.status(200).send({message:resMes})
})

//get all liked songs

router.get("/like",auth,async(req,res)=>{
    const user=await User.findById(req.user._id)
    const songs=await Song.find({_id:user.likedSongs});
    res.status(200).send({data:songs})
})
module.exports=router