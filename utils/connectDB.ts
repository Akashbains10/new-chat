import mongoose from "mongoose";

async function connectDB() {
    const url = process.env.MONGO_URL ?? '';
    await mongoose.connect(url);
    console.log('connect with mongoDB')
}

const db = {connectDB};
export default db;