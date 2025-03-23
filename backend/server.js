const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const recordRoutes = require('./routes/recordRoutes');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Database Connection Pehle Karein
connectDB();  

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/records', recordRoutes);

// ✅ Server Start
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});
