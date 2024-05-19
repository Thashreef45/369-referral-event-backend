import {connect} from 'mongoose'
import env from "./environment.js"

const connectDB = () => {
    connect(env.DB_CONNECTION).then(()=>{
        console.log('DB Conncted succesfully')
    }).catch(()=>{
        console.log('DB Connection failed')
        process.exit(1)
    })
}

export default connectDB