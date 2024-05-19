import pkg from 'jsonwebtoken';
import env from '../config/environment.js'
const { verify } = pkg;

const verifyToken = (req,res,next) => {

    if(!req.headers.token){
        res.status(401).json({"message":"unauthirized"})
        return
    }

    try {
        verify(req.headers.token,String(env.JWT_SIGNATURE))
        next()
    } catch (error) {
        res.status(401).json({"message":"Token verification failed"})
        return
    }
}

export default verifyToken