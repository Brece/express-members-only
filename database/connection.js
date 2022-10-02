const mongoose = require('mongoose');

/**
 * @params dev_db_url: set up your MongoDB database connection string
 */
// const dev_db_url = '';
// const mongoDB = process.env.MONGODB_URI || dev_db_url;

const mongoDB = process.env.MONGODB_URI;

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;
