const { application } = require('express');
const spotifyWebApi=require('spotify-web-api-node');
require('dotenv').config();

const setAccessToken=(req,res,next)=>{
    const accessToken=req.query.accessToken;
    if(!accessToken){
        return res.status(400).json({
            error:"Access Token is required"
        })
    }

    //creating spotify api object  and then attachin it to the req
    req.spotifyApi=new spotifyWebApi();
    req.spotifyApi.setAccessToken(accessToken);
    
    next();

};

module.exports=setAccessToken;