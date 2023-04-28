import { Router } from "express";

import  queryDb  from '../bloodbank_server/db.js'; 

export const statsRouter=Router();

statsRouter.get('/getCount', getCount)



async function getCount(req,res){
    const stats={}
   
    const bloodBankResult=await queryDb('SELECT COUNT(name) FROM blood_bank')
    const patientResult=await queryDb('SELECT COUNT(id) FROM patient')
    const donorResult=await queryDb('SELECT COUNT(id) FROM donor')
    stats['blood_banks']=bloodBankResult.rows[0].count;
    stats['patients']=patientResult.rows[0].count;
    stats['donors']=donorResult.rows[0].count;
    res.status(200).end(JSON.stringify(stats))
}

