import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongodb/connect.js'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()
app.use(bodyParser.json());
app.use(cors())
app.use(express.json({limit: '50mb'}))

app.get('/',async (req,res) => {
    res.send("Hello From DALL-E")
})

try {
    connectDB(process.env.MONGODB_URL)
    app.listen(8000,()=> console.log('Server has started on http://localhost:8000'))
} catch (error) {
    console.log(error)
}

