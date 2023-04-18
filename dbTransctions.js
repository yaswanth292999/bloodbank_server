import pkg from "pg"
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pkg
const pool = new Pool({
                user: process.env.PGUSER,
                host: process.env.PGHOST,
                database: process.env.PGDATABASE,
                password: process.env.PGPASSWORD,
                port: process.env.PGPORT
            })



export async function executeTransction(queries,values,response){
    const client = await pool.connect()
   const result=[]
    try{
        await client.query('BEGIN')
        queries.forEach(async (txn,txnNo)=>{
            const {rows}=await client.query(txn,values[txnNo])
            if(rows) result.push(rows)
        })
        await client.query('COMMIT')
    }catch (e) {
        await client.query('ROLLBACK')
        response.status(500).end("donor registration failed")
        throw e
      } finally {
        client.release()
      }
      return result
}
