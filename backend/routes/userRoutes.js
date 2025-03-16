const express=require("express");
const SpotifyWebApi=require('spotify-web-api-node');
const router=require('router');


router.get('/user',async (req,res)=>{

    const accessToken=req.query.accessToken;
    if(!accessToken){
        return res.status(401).json({
            error:"Access token is required"
        });
    }

    try{
        const spotifyApi=new SpotifyWebApi();
        spotifyApi.setAccessToken(accessToken);

        const userData = await spotifyApi.getMe();
        res.json({
            name:userData.body.display_name,
            birthDate: userData.body.birthdate,
            email:userData.body.email,
            followers: userData.body.followers.total,
            profileImage: userData.body.images?.[0]?.url,
            country: userData.body.country,
            href:userData.body.href
    });
    }
    catch(e){
        console.log("Error fetching the user data",e);
        res.status(500).json({
            error:"Failed to fetch the user profile"
        })
    }
})