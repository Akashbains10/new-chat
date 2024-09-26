import Friends from "@/models/friends.model";
import { ObjectId } from "mongoose"

export const createFriends = async (userId: ObjectId, friendId: ObjectId) => {
    try {
        await Friends.create({ userId, friendId });
    } catch (err) {
        console.log('Err', err)
    }
}