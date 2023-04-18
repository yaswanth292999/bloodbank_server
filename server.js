import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { patientRouter} from './patientRouter.js';
import { donorRouter } from './donorRouter.js';
import {bloodBankRouter} from './bloodbankRouter.js';
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.use('/v1/patient',patientRouter)
app.use('/v1/donor',donorRouter)
app.use('/v1/blood_bank',bloodBankRouter)


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

