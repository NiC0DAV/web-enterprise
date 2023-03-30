const { Connect, DB_URI, LOCAL_DB_URI } = require('./environment');

const dbConnect = async () => {
    try {
        await Connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected succesfully.');
    } catch (error) {
        console.log(`Error performing connection with DB ==> ${error}`);
    }
}

module.exports = dbConnect;