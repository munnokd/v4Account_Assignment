import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongodb/connect.js'
import bodyParser from 'body-parser'
import roleRouter from './router/roleRouter.js'

dotenv.config()

const app = express()
app.use(bodyParser.json());
app.use(cors())

app.get('/',async (req,res) => {
    res.send("Hello From DALL-E")
})

app.use('/role',roleRouter)

try {
    connectDB(process.env.MONGODB_URL)
    app.listen(8000,()=> console.log('Server has started on http://localhost:8000'))
} catch (error) {
    console.log(error)
}

