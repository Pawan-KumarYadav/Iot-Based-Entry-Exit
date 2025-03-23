const mongoose = require('mongoose');

// User Schema Design
const userSchema = new mongoose.Schema({
    userId: {
        type: String,        // User ID string format mein rahega
        required: true,      // Is field ko fill karna compulsory hai
        unique: true         // Har user ka unique ID hona chahiye
    },
    entryTime: {
        type: Date,          // Entry ka time Date format mein store hoga
        default: Date.now    // Default value current date-time rahegi
    },
    exitTime: {
        type: Date           // Exit ka time bhi Date format mein rahega
    }
});

// User Model Create Karna
const User = mongoose.model('User', userSchema);

// Model ko export karna taaki doosri files mein use ho sake
module.exports = User;
