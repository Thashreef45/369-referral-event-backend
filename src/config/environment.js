import { config } from "dotenv"
config()


const env = {
    DB_CONNECTION : process.env.DB_CONNECTION ,
    Port : process.env.PORT,
    JWT_SIGNATURE : process.env.JWT_SIGNATURE,
}

export default env