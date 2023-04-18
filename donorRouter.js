import { Router } from "express";

import  queryDb  from '../bloodbank_server/db.js'; 

export const donorRouter=Router();

donorRouter.get('/getDonorForBloodGroup',getDonorForBloodGroup)
donorRouter.post('/createDonor',createDonor)


async function createDonor(req,res){
    const {name,blood_group,medical_report,address,contact_number,blood_bank,available_units}=req.body
    const result=await queryDb('INSERT INTO donor (name, blood_group,medical_report,address,contact_number,blood_bank,available_units) VALUES($1,$2,$3,$4,$5,$6,$7)')
    res.status(200).end(JSON.stringify(result.rows))
}


async function getDonorForBloodGroup(req,res){
    const {bloodbank,blood_group,required_units}=req.query
    console.log(bloodbank,blood_group,required_units)
    const result=await queryDb('SELECT id,name FROM donor WHERE blood_bank=$1 AND blood_group=$2 AND available_units>=$3',[bloodbank,blood_group,required_units],res)
    res.status(200).end(JSON.stringify(result.rows))
}