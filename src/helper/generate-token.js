import pkg from 'jsonwebtoken';
import env from '../config/environment.js'
const { sign } = pkg;

const generateToken = () => {
    const payload = {
        "": "369-referalEvent",
        role: "Admin"
    }

    return sign(payload, String(env.JWT_SIGNATURE))
}

export default generateToken