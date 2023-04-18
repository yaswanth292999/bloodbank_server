import { Router } from "express";

import  queryDb  from '../bloodbank_server/db.js'; 
import { executeTransction } from "./dbTransctions.js";
export const patientRouter=Router();

patientRouter.get('/getAllPatients',getAllPatients)
patientRouter.post('/createPatient',createPatient)
patientRouter.post('/registerDonorForPatient',registerDonorForPatient)



async function getAllPatients(req,res){
    const result=await queryDb('SELECT patient.*,donor.name as donor_name FROM patient LEFT OUTER JOIN donor ON patient.donor_id = donor.id',null,res)
    res.status(200).end(JSON.stringify(result.rows))

}

async function createPatient(req,res){
    const {name,blood_group,disease,required_units}=req.body
    const result=await queryDb('INSERT INTO patient(name,blood_group,disease,required_units) VALUES($1,$2,$3,$4) RETURNING *',[name,blood_group,disease,required_units],res)
    res.status(200).end(JSON.stringify(result.rows))
}



async function registerDonorForPatient(req,res){
    
    const {donor_id,patient_id,required_units,blood_bank}=req.body

    const parameterizedQueries=['UPDATE patient SET donor_id = $1,blood_bank=$3 WHERE id= $2','UPDATE donor SET available_units=((SELECT available_units FROM donor WHERE id= $1 FOR UPDATE)-$2)WHERE id = $1 RETURNING *']
    const parameterizedValues=[[donor_id,patient_id,blood_bank],[donor_id,required_units]]
    
    const response=await executeTransction(parameterizedQueries,parameterizedValues)
    const donorRegistered=response[1][0]    
    console.log(response)
    if(donorRegistered) res.status(200).end(JSON.stringify(donorRegistered))
    else res.status(500).end("donor not available")

}