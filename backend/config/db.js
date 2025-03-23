const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,  // 🟠 Server connection timeout (5 sec)
            socketTimeoutMS: 45000,           // 🟠 Socket timeout (45 sec)
        });
        console.log('✅ MongoDB Connected Successfully 🚀');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error.message);
        process.exit(1); // Process exit if connection fails
    }
};

module.exports = connectDB;
