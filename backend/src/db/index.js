import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';


// Database Connection with MongoDB
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGOOSE_URL}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MONGODB connection Failed ", error);
        process.exit(1)
    }
}

export default connectDB;