import { Router } from "express";

import  queryDb  from '../bloodbank_server/db.js'; 

export const donorRouter=Router();

donorRouter.get('/getDonorForBloodGroup',getDonorForBloodGroup)

async function getDonorForBloodGroup(req,res){
    const {bloodbank,blood_group,required_units}=req.query
    console.log(bloodbank,blood_group,required_units)
    const result=await queryDb('SELECT id,name FROM donor WHERE blood_bank=$1 AND blood_group=$2 AND available_units>=$3',[bloodbank,blood_group,required_units],res)
    res.status(200).end(JSON.stringify(result.rows))
}