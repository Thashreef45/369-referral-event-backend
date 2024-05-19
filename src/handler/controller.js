import generateRefferalId from '../helper/generate-referral-Id.js'
import generateToken from '../helper/generate-token.js'
import sendEmail from '../helper/send-email.js'
import repository from '../repository/repository.js'

const adminController = {

    //Admin Login
    login: async (req, res) => {
        const email = String(req.body.email).trim()
        const password = String(req.body.password).trim()


        if (!email || !password) {
            res.status(400).json({ message: "credentials missing" })
            return
        }

        const isExist = await repository.findAdmin(email, password)

        if (!isExist) {
            res.status(400).json({ message: "email or password not matching" })
            return
        }

        res.status(200).json({
            message: 'Login success',
            token: generateToken()
        })
    },

    
    //Search and fetch user data
    search: async (req, res) => {
        const email = String(req.body.email).trim()
        if (!email) {
            res.status(400).json({ message: "credentials missing" })
            return
        }

        const isExist = await repository.fetchUser(email)

        if(!isExist) {
            res.status(400).json({ message: "No user where registered on this email" })
            return
        }

        const referrals = await repository.fetchReferredUsers(isExist.referalId)
        res.status(200).json({user:isExist , referrals : referrals})
    },
}

const userController = {
    register: async(req, res) => {

        const name = String(req.body.name).trim()
        const email = String(req.body.email).trim()
        const phone =  String(req.body.phone).trim()
        const referral = String(req.body.referral)

        if(!email || name || phone ) {
            res.status(400).json({ message: "credentials missing" })
            return
        }

        const alreadyExist = await repository.fetchUser(email)

        //checking that user is already exist
        if(alreadyExist){
            res.status(400).json({ message: "User already exists" })
            return
        }

        //if user provided referral id, checking that it is a valid referral id
        if(referral){
            const validReferral = await repository.findUserByrefferalId(referral)
            if(!validReferral) {
                res.status(400).json({ message: "No user where registered on this email" })
                return
            }

            const data = {
                name : name,
                phone : phone,
                email : email,
                referralId : generateRefferalId(),
                referredBy : referral
            }

            const registered = await repository.createUser(data)
            if(registered) {
                res.status(201).json({"message":"User created successfully"})
            }

            //send email
            // sendEmail()

        }else{

            const data = {
                name : name,
                phone : phone,
                email : email,
                referralId : generateRefferalId(),
            }
            const registered = await repository.createUser(data)
            if(registered){
                res.status(201).json({"message":"User created successfully"})
            }

            //send email
            // sendEmail()

        }

    }
}


export {
    adminController,
    userController
}