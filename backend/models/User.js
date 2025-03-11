const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({

spotifyId:String,
displayName:String,
email:String,
profilePic:String,//pp url
accessToken:String,
refreshToken:String

});

module.exports=mongoose.model("User",UserSchema);

