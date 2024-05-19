import { adminModel, userModel } from '../model/model.js'

const repository = {

    findAdmin: async (email, password) => {
        return await adminModel.findOne({
            email: email,
            password: password
        })
    },

    fetchReferredUsers: async (referal) => {
        return await userModel.find({
            referedBy: referal
        })
    },

    //By email
    fetchUser: async (email) => {
        return await userModel.findOne({
            email: email
        })
    },

    //By referalId
    findUserByrefferalId: async (referal) => {
        return await userModel.findOne({
            referalId : referal
        })
    },

    //creating a user
    createUser : async(data) => {
        const user = new userModel(data)
        user.save()
    },
}


export default repository
