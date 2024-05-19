import express from 'express'
import router from './handler/route.js'
import connectDB from './config/db-connection.js'
import morgan from 'morgan'

const app = express()


//logger
app.use(morgan('tiny'))

//body parsing
app.use(express.json())

//connect-db
connectDB()

//api
app.use('/api',router)
app.get('/health',(req,res)=>res.json({"":"health is ok."}))


app.listen(3000,()=>{
    console.log('Server is running on 3000')
})