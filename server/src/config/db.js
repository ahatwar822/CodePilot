
import mongoose from 'mongoose'

export const connectDb = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected");
        
    } catch (error) {
        console.log("error wite connecting DB", error);
        
    }
}