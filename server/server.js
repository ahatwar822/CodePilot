import app from './src/app.js';
import dotenv from 'dotenv'
import { connectDb } from './src/config/db.js';

dotenv.config({ quiet: true });

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server", error);
    }
};

startServer();