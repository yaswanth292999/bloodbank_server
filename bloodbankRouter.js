import { Router } from "express";

import  queryDb  from '../bloodbank_server/db.js'; 

export const bloodBankRouter=Router();

bloodBankRouter.get('/getAllBloodBanks', getAllBloodBanks)



async function getAllBloodBanks(req,res){
    const result=await queryDb('SELECT name FROM blood_bank',null,res)
    res.status(200).end(JSON.stringify(result.rows))
}