import { usersModel } from "../../models/users.model.js";

export class usersMongoose{
    async addUsers(object){
        const users = new usersModel(object);
        await users.save()
        return users.toObject({virtuals:true});
    }
    async getUserById(id){
        return await usersModel.findOne({_id: id}).lean({virtuals:true});
    }
    async getUserByEmail({email}){
        return await usersModel.findOne({email}).lean({virtuals: true});
    }
    async updateUserCart(userId, cartId) {
        try {
            const user = await usersModel.findOneAndUpdate(
                { _id: userId },
                { cartId: cartId },
                { new: true }
            );
            return user;
        } catch (error) {
            throw new Error('Error updating user cart');
        }
    }
    
}