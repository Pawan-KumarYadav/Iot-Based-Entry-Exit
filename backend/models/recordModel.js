const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    entryTime: {
        type: Date,
        default: null
    },
    exitTime: {
        type: Date,
        default: null
    }
});


module.exports = mongoose.model('Record', recordSchema);
