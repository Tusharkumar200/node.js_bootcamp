const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = 'mongodb://localhost:27017/tusharDatabase';
// const mongoURL = 'mongodb+srv://tusharnwd2003:Tushar123@tusharcluster.e9byn.mongodb.net/';
// const mongoURL = process.env.MONGO_URL;

// setup MongoDB connection

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connected successfully');
});

db.on('error', () => {
    console.log('MongoDB connection failed');
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});


module.exports = db;