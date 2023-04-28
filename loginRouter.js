import { Router } from "express";

import  queryDb  from '../bloodbank_server/db.js'; 

export const loginRouter=Router();
loginRouter.post('/loginUser',loginUser)



async function loginUser(req,res){
    const {username,password}=req.body
    const result=await queryDb('SELECT * FROM USERS WHERE username=$1 AND password=$2',[username,password],res)
    console.log(result.rows)
    if(result.rows.length>0){
        res.status(200).end("Logged In Succesfully")
    }
    else{
        res.status(500).end("Incorrect Username or Password")
    }
    
}


