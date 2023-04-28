import { Router } from "express";

import  queryDb  from '../bloodbank_server/db.js'; 

export const bloodBankRouter=Router();

bloodBankRouter.get('/getAllBloodBanks', getAllBloodBanks)

bloodBankRouter.post('/createBloodBank',createBloodBank)


async function createBloodBank(req,res){
    const {name,address,contact_number}=req.body
    const result=await queryDb('INSERT INTO blood_bank (name,address,contact_number) VALUES($1,$2,$3)',[name,address,contact_number],res)
    res.status(200).end(JSON.stringify(result.rows))
}


async function getAllBloodBanks(req,res){
    const result=await queryDb('SELECT name FROM blood_bank',null,res)
    res.status(200).end(JSON.stringify(result.rows))
}