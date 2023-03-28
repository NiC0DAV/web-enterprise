const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI;

const dbConnect = async () => {
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected succesfully.');
    } catch (error) {
        console.log(`Error performing connection with DB ==> ${error}`);
    }
}

module.exports = dbConnect;