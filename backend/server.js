require('dotenv').config();
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');


//importing dbconnect
const connectdb=require('./database/db')

//importing routes

const authRoutes=require('./routes/authRoutes');
const statsRoutes=require('./routes/statsRoutes');


const app=express()

app.use(cors({origin: "http://localhost:5173",credentials:true}));
app.use(express.json());

//mongodb connection 

// connectdb();

app.use("/auth",authRoutes);
app.use("/stats",statsRoutes);


const PORT=process.env.PORT || 3000;
app.listen(PORT,()=> console.log(`Server Running on PORT ${PORT}`));