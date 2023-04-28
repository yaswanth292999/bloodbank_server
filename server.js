import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { patientRouter} from './patientRouter.js';
import { donorRouter } from './donorRouter.js';
import {bloodBankRouter} from './bloodbankRouter.js';
import { loginRouter } from './loginRouter.js';
import { statsRouter } from './statsRouter.js';
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.use('/v1/patient',patientRouter)
app.use('/v1/donor',donorRouter)
app.use('/v1/blood_bank',bloodBankRouter)
app.use('/v1/login',loginRouter)
app.use('/v1/stats',statsRouter)


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

