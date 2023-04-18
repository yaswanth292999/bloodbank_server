import pkg from "pg"
import dotenv from 'dotenv'
dotenv.config()
 const {Client}=pkg;

const queryDb = async (queryString,values,response,) => {
      try {
          const client = new Client({
              user: process.env.PGUSER,
              host: process.env.PGHOST,
              database: process.env.PGDATABASE,
              password: process.env.PGPASSWORD,
              port: process.env.PGPORT
          })
   
          await client.connect()
          const res = await client.query(queryString,values)
  //         console.log(res)
          await client.end()
    return res
      } catch (error) {
          response.status(400).end(JSON.stringify(error))
          console.log(error)
      }
  }
   
  

export default queryDb